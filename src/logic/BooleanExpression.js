import _ from 'lodash';

class BooleanExpression {
    constructor(items, type) {
        this.items = items;
        this.type = type;
    }

    static and(...items) {
        return new BooleanExpression(items, this.TYPES.AND);
    }

    static or(...items) {
        return new BooleanExpression(items, this.TYPES.OR);
    }

    isAnd() {
        return this.type === BooleanExpression.TYPES.AND;
    }

    isOr() {
        return this.type === BooleanExpression.TYPES.OR;
    }

    reduce({
        andInitialValue,
        andReducer,
        orInitialValue,
        orReducer,
    }) {
        const reducerArguments = ([accumulator, item, index, collection]) => {
            if (BooleanExpression.isExpression(item)) {
                const reducedItem = item.reduce({
                    andInitialValue,
                    andReducer,
                    orInitialValue,
                    orReducer,
                });

                return {
                    accumulator,
                    item: reducedItem,
                    isReduced: true,
                    index,
                    collection,
                };
            }
            return {
                accumulator,
                item,
                isReduced: false,
                index,
                collection,
            };
        };

        if (this.isAnd()) {
            return _.reduce(
                this.items,
                (...args) => andReducer(
                    reducerArguments(args),
                ),
                andInitialValue,
            );
        }

        if (this.isOr()) {
            return _.reduce(
                this.items,
                (...args) => orReducer(
                    reducerArguments(args),
                ),
                orInitialValue,
            );
        }
        throw Error(`Invalid type: ${this.type}`);
    }

    evaluate({ isItemTrue }) {
        return this.reduce({
            andInitialValue: true,
            andReducer: ({ accumulator, item, isReduced }) => accumulator && (isReduced ? item : isItemTrue(item)),
            orInitialValue: false,
            orReducer: ({ accumulator, item, isReduced }) => accumulator || (isReduced ? item : isItemTrue(item)),
        });
    }

    simplify({
        implies, iterations = 3,
    }) {
        let updatedExpression = this.flatten();

        for (let i = 0; i < iterations; i++) {
            updatedExpression = updatedExpression.removeDuplicateChildren(implies);
            updatedExpression = updatedExpression.removeDuplicateExpressions(implies);
        }

        return updatedExpression;
    }

    static TYPES = {
        AND: 'and',
        OR: 'or',
    };

    oppositeType() {
        if (this.isAnd()) {
            return BooleanExpression.TYPES.OR;
        }
        if (this.isOr()) {
            return BooleanExpression.TYPES.AND;
        }
        throw Error(`Invalid type for boolean expression: ${this.type}`);
    }

    static isExpression(item) {
        return item instanceof BooleanExpression;
    }

    isEqualTo(otherExpression, areItemsEqual) {
        if (!BooleanExpression.isExpression(otherExpression) || this.type !== otherExpression.type || this.items.length !== otherExpression.items.length) {
            return false;
        }

        const difference = _.xorWith(this.items, otherExpression.items, (item, otherItem) => {
            if (BooleanExpression.isExpression(item)) {
                return item.isEqualTo(otherItem, areItemsEqual);
            }
            // if one item is not an expression and the other is not then they cannot be equal
            if (BooleanExpression.isExpression(otherItem)) {
                return false;
            }
            return areItemsEqual(item, otherItem);
        });
        return _.isEmpty(difference);
    }

    flatten() {
        const newItems = this.items.flatMap((item) => {
            if (!BooleanExpression.isExpression(item)) {
                return item;
            }
            const flatItem = item.flatten();
            if (_.isEmpty(flatItem.items)) {
                return [];
            }
            if (flatItem.type === this.type || flatItem.items.length === 1) {
                return flatItem.items;
            }
            return flatItem;
        });

        if (newItems.length === 1) {
            const firstItem = _.first(newItems);
            if (BooleanExpression.isExpression(firstItem)) {
                return firstItem;
            }
        }

        if (newItems.length <= 1) {
            return BooleanExpression.and(...newItems);
        }

        return new BooleanExpression(newItems, this.type);
    }

    static createFlatExpression(items, type) {
        return new BooleanExpression(items, type).flatten();
    }

    // determines if a provided item is subsumed by a provided collection of items
    // calculation depends on the type of the containing expression
    // implies is the function for determing if requirements are subsumable (defines the relationship between items)
    static itemIsSubsumed(itemsCollection, item, expressionType, implies) {
        let itemIsSubsumed = false;
        itemsCollection.forEach((otherItem) => {
            if (this.isExpression(otherItem)) {
                return true;
            }

            // for and logic the subsuming item (the item from the collection) needs to imply the subsumed item
            // otherwise the logic would lose precision on counted items (i.e. Sword x2 could subsume Sword x3 depending on sequence)
            if (expressionType === this.TYPES.AND) {
                if (implies(otherItem, item)) {
                    itemIsSubsumed = true;
                    return false;
                }
            // for an or expression this precision doesn't matter - Sword x2 is just as good as Sword x3, therefore any implying
            // item can subsume the item in question
            } else if (expressionType === this.TYPES.OR) {
                if (implies(item, otherItem)) {
                    itemIsSubsumed = true;
                    return false;
                }
            } else {
                throw Error(`Attempted to reduce a boolean expression with an invalid type: ${this.type}`);
            }

            return true;
        });
        return itemIsSubsumed;
    }

    getUpdatedParentItems(parentItems) {
        return _.mergeWith({}, parentItems, { [this.type]: this.items }, (objectValue, sourceValue) => {
            if (_.isArray(objectValue)) {
                return _.concat(objectValue, _.filter(sourceValue, (value) => !BooleanExpression.isExpression(value)));
            }
            return undefined;
        });
    }

    removeDuplicateChildrenHelper(implies, parentItems) {
        const newItems = [];
        const updatedParentItems = this.getUpdatedParentItems(parentItems);
        const sameTypeItems = _.get(parentItems, this.type);
        const oppositeTypeItems = _.get(parentItems, this.oppositeType());
        let removeSelf = false;

        this.items.forEach((item) => {
            if (BooleanExpression.isExpression(item)) {
                const {
                    expression: childExpression,
                    removeParent: childRemoveParent,
                } = item.removeDuplicateChildrenHelper(implies, updatedParentItems);

                if (childRemoveParent) {
                    removeSelf = true;
                    return false;
                }
                newItems.push(childExpression);
            } else {
                if (BooleanExpression.itemIsSubsumed(oppositeTypeItems, item, this.oppositeType(), implies)) {
                    removeSelf = true;
                    return false;
                }

                if (!BooleanExpression.itemIsSubsumed(sameTypeItems, item, this.type, implies)) {
                    newItems.push(item);
                }
            }
            return true;
        });

        if (removeSelf) {
            return {
                expression: BooleanExpression.and(),
                removeParent: false,
            };
        }

        const expression = BooleanExpression.createFlatExpression(newItems, this.type);
        if (_.isEmpty(expression.items)) {
            return {
                expression: BooleanExpression.and(),
                removeParent: true,
            };
        }

        return {
            expression,
            removeParent: false,
        };
    }

    removeDuplicateChildren(implies) {
        const { expression } = this.removeDuplicateChildrenHelper(implies, {
            [BooleanExpression.TYPES.AND]: [],
            [BooleanExpression.TYPES.OR]: [],
        });
        return expression;
    }

    isSubsumedBy(otherExpression, implies, removeIfIdentical, expressionType) {
        if (this.isEqualTo(otherExpression, (item, otherItem) => implies(item, otherItem) && implies(otherItem, item))) {
            return removeIfIdentical;
        }
        return otherExpression.items.every((otherItem) => {
            if (BooleanExpression.isExpression(otherItem)) {
                return this.isSubsumedBy(otherItem, implies, true, expressionType);
            }
            return BooleanExpression.itemIsSubsumed(this.items, otherItem, expressionType, implies);
        });
    }

    expressionIsSubsumed(expression, index, implies) {
        let expressionIsSubsumed = false;
        this.items.forEach((otherItem, otherIndex) => {
            if (otherIndex === index) {
                return true;
            }

            let otherExpression;
            if (BooleanExpression.isExpression(otherItem)) {
                otherExpression = otherItem;
            } else {
                otherExpression = BooleanExpression.and(otherItem);
            }

            const isSubsumed = expression.isSubsumedBy(otherExpression, implies, otherIndex < index, this.oppositeType());
            if (isSubsumed) {
                expressionIsSubsumed = true;
                return false;
            }
            return true;
        });
        return expressionIsSubsumed;
    }

    removeDuplicateExpressionsInChildren(implies) {
        const newItems = this.items.map((item) => {
            if (BooleanExpression.isExpression(item)) {
                return item.removeDuplicateExpressions(implies);
            }
            return item;
        });
        return BooleanExpression.createFlatExpression(newItems, this.type);
    }

    removeDuplicateExpressions(implies) {
        const parentExpression = this.removeDuplicateExpressionsInChildren(implies);
        const newItems = parentExpression.items.filter((item, index) => {
            let expression;
            if (BooleanExpression.isExpression(item)) {
                expression = item;
            } else {
                expression = BooleanExpression.and(item);
            }

            return !parentExpression.expressionIsSubsumed(expression, index, implies);
        });
        if (this.type === BooleanExpression.TYPES.OR && newItems.length >= 2 && _.every(_.map(newItems, BooleanExpression.isExpression))) {
            const commonFactors = [];
            _.forEach(newItems[0].items, (item) => {
                if (_.every(_.map(newItems, (expr) => _.includes(expr.items, item)))) {
                    commonFactors.push(item);
                }
            });
            if (commonFactors.length) {
                return new BooleanExpression([...commonFactors, new BooleanExpression([...(newItems.filter((item) => !commonFactors.includes(item)))], this.type)], this.oppositeType());
            }
        }
        return BooleanExpression.createFlatExpression(newItems, this.type);
    }
}

export default BooleanExpression;

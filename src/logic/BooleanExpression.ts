import _ from 'lodash';

enum ExpressionType {
    AND = 'and',
    OR = 'or'
}

type ImpliesFunction = (firstRequirement: string, secondRequirement: string) => boolean;

type ReducerArgs = {
    accumulator: boolean,
    item: string,
    isReduced: boolean,
    index?: number,
    collection?: ExpressionItem[]
}

type ReducerInitialValue = {
    items: string[],
    type: ExpressionType,
    value: boolean
}

type ReducerArgumentGenerator = () => ReducerArgs;

type ReducerFunction = (args: ReducerArgs) => void;

type ItemEqualityFunction = (item1: string, item2: string) => boolean;

type ExpressionItem = string | BooleanExpression;

type ParentItems = {
    and: BooleanExpression[],
    or: BooleanExpression[]
}

class BooleanExpression {
    items: ExpressionItem[];
    type: ExpressionType;

    constructor(items: ExpressionItem[], type: ExpressionType) {
        this.items = items;
        this.type = type;
    }

    static and(...items: ExpressionItem[]) {
        return new BooleanExpression(items, ExpressionType.AND);
    }

    static or(...items: ExpressionItem[]) {
        return new BooleanExpression(items, ExpressionType.OR);
    }

    isAnd() {
        return this.type === ExpressionType.AND;
    }

    isOr() {
        return this.type === ExpressionType.OR;
    }

    reduce(
        andInitialValue: ReducerInitialValue,
        andReducer: ReducerFunction,
        orInitialValue: ReducerInitialValue,
        orReducer: ReducerFunction,
    ) {
        const reducerArguments: ReducerArgumentGenerator = (accumulator: boolean, item: ExpressionItem, index: number, collection: ExpressionItem[]) => {
            if (typeof item !== 'string') {
                const reducedItem = item.reduce(
                    andInitialValue,
                    andReducer,
                    orInitialValue,
                    orReducer,
                );

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

    evaluate(isItemTrue: (item: string) => boolean) {
        return this.reduce(
            true,
            ({ accumulator, item, isReduced }) => accumulator && (isReduced ? item : isItemTrue(item)),
            false,
            ({ accumulator, item, isReduced }) => accumulator || (isReduced ? item : isItemTrue(item)),
        );
    }

    simplify(implies: ImpliesFunction, iterations = 3): BooleanExpression {
        let updatedExpression = this.flatten();

        for (let i = 0; i < iterations; i++) {
            updatedExpression = updatedExpression.removeDuplicateChildren(implies);
            updatedExpression = updatedExpression.removeDuplicateExpressions(implies);
        }

        return updatedExpression;
    }

    oppositeType() {
        if (this.isAnd()) {
            return ExpressionType.OR;
        }
        if (this.isOr()) {
            return ExpressionType.AND;
        }
        throw Error(`Invalid type for boolean expression: ${this.type}`);
    }

    static isExpression(item: string | BooleanExpression) {
        return typeof item !== 'string';
    }

    isEqualTo(otherExpression: string | BooleanExpression, areItemsEqual: ItemEqualityFunction): boolean {
        if (typeof otherExpression === 'string' || this.type !== otherExpression.type || this.items.length !== otherExpression.items.length) {
            return false;
        }

        const difference = _.xorWith(this.items, otherExpression.items, (item, otherItem) => {
            if (typeof item !== 'string') {
                return item.isEqualTo(otherItem, areItemsEqual);
            }
            // if one item is not an expression and the other is not then they cannot be equal
            if (typeof otherItem !== 'string') {
                return false;
            }
            return areItemsEqual(item, otherItem);
        });
        return _.isEmpty(difference);
    }

    flatten(): BooleanExpression {
        const newItems = this.items.flatMap((item) => {
            if (typeof item === 'string') {
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
            const [firstItem] = newItems;
            if (typeof firstItem !== 'string') {
                return firstItem;
            }
        }

        if (newItems.length <= 1) {
            return BooleanExpression.and(...newItems);
        }

        return new BooleanExpression(newItems, this.type);
    }

    static createFlatExpression(items: ExpressionItem[], type: ExpressionType) {
        return new BooleanExpression(items, type).flatten();
    }

    // determines if a provided item is subsumed by a provided collection of items
    // calculation depends on the type of the containing expression
    // implies is the function for determing if requirements are subsumable (defines the relationship between items)
    static itemIsSubsumed(itemsCollection: ExpressionItem[], item: string, expressionType: ExpressionType, implies: ImpliesFunction) {
        let itemIsSubsumed = false;
        itemsCollection.forEach((otherItem) => {
            if (typeof otherItem !== 'string') {
                return true;
            }

            // for and logic the subsuming item (the item from the collection) needs to imply the subsumed item
            // otherwise the logic would lose precision on counted items (i.e. Sword x2 could subsume Sword x3 depending on sequence)
            if (expressionType === ExpressionType.AND) {
                if (implies(otherItem, item)) {
                    itemIsSubsumed = true;
                    return false;
                }
            // for an or expression this precision doesn't matter - Sword x2 is just as good as Sword x3, therefore any implying
            // item can subsume the item in question
            } else if (expressionType === ExpressionType.OR) {
                if (implies(item, otherItem)) {
                    itemIsSubsumed = true;
                    return false;
                }
            } else {
                throw Error(`Attempted to reduce a boolean expression with an invalid type: ${expressionType}`);
            }

            return true;
        });
        return itemIsSubsumed;
    }

    getUpdatedParentItems(parentItems: ParentItems): ParentItems {
        return _.mergeWith({}, parentItems, { [this.type]: this.items }, (objectValue, sourceValue) => {
            if (_.isArray(objectValue)) {
                return _.concat(objectValue, _.filter(sourceValue, (value) => typeof value === 'string'));
            }
            return undefined;
        });
    }

    removeDuplicateChildrenHelper(implies: ImpliesFunction, parentItems: ParentItems) {
        const newItems: ExpressionItem[] = [];
        const updatedParentItems = this.getUpdatedParentItems(parentItems);
        const sameTypeItems = _.get(parentItems, this.type);
        const oppositeTypeItems = _.get(parentItems, this.oppositeType());
        let removeSelf = false;

        this.items.forEach((item) => {
            if (typeof item !== 'string') {
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

    removeDuplicateChildren(implies: ImpliesFunction): BooleanExpression {
        const { expression } = this.removeDuplicateChildrenHelper(implies, {
            [ExpressionType.AND]: [],
            [ExpressionType.OR]: [],
        });
        return expression;
    }

    isSubsumedBy(otherExpression: BooleanExpression, implies: ImpliesFunction, removeIfIdentical: boolean, expressionType: ExpressionType): boolean {
        if (this.isEqualTo(otherExpression, (item, otherItem) => implies(item, otherItem) && implies(otherItem, item))) {
            return removeIfIdentical;
        }
        return otherExpression.items.every((otherItem) => {
            if (typeof otherItem !== 'string') {
                return this.isSubsumedBy(otherItem, implies, true, expressionType);
            }
            return BooleanExpression.itemIsSubsumed(this.items, otherItem, expressionType, implies);
        });
    }

    expressionIsSubsumed(expression: BooleanExpression, index: number, implies: ImpliesFunction) {
        let expressionIsSubsumed = false;
        this.items.forEach((otherItem, otherIndex) => {
            if (otherIndex === index) {
                return true;
            }

            let otherExpression: ExpressionItem;
            if (typeof otherItem !== 'string') {
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

    removeDuplicateExpressionsInChildren(implies: ImpliesFunction): BooleanExpression {
        const newItems = this.items.map((item) => {
            if (typeof item !== 'string') {
                return item.removeDuplicateExpressions(implies);
            }
            return item;
        });
        return BooleanExpression.createFlatExpression(newItems, this.type);
    }

    removeDuplicateExpressions(implies: ImpliesFunction) {
        const parentExpression = this.removeDuplicateExpressionsInChildren(implies);
        const newItems = parentExpression.items.filter((item, index) => {
            let expression: BooleanExpression;
            if (typeof item !== 'string') {
                expression = item;
            } else {
                expression = BooleanExpression.and(item);
            }

            return !parentExpression.expressionIsSubsumed(expression, index, implies);
        });
        if (this.type === ExpressionType.OR && newItems.length >= 2 && _.every(_.map(newItems, (i) => typeof i !== 'string'))) {
            const commonFactors: ExpressionItem[] = [];
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

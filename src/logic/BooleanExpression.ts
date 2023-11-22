import _ from 'lodash';

export enum Op {
    And = 'and',
    Or = 'or',
}

export type Item = BooleanExpression | string;
type BinOp<T> = (left: T, right: T) => boolean;
type ParentItems = {
    [op in Op]: Item[]
}

export type ReducerArg<T> = { isReduced: true, accumulator: T, item: T } | { isReduced: false, accumulator: T, item: string };
type Reducer<T> = (arg: ReducerArg<T>) => T;
type Reducers<T> = {
    andInitialValue: T,
    orInitialValue: T,
    andReducer: Reducer<T>,
    orReducer: Reducer<T>,
}

class BooleanExpression {
    type: Op;
    items: Item[];

    constructor(items: Item[], type: Op) {
        this.items = items;
        this.type = type;
    }

    static and(...items: Item[]) {
        return new BooleanExpression(items, Op.And);
    }

    static or(...items: Item[]) {
        return new BooleanExpression(items, Op.Or);
    }

    isAnd() {
        return this.type === Op.And;
    }

    isOr() {
        return this.type === Op.Or;
    }

    reduce<T>({
        andInitialValue,
        andReducer,
        orInitialValue,
        orReducer,
    }: Reducers<T>): T {
        const reducerArguments = (accumulator: T, item: Item): ReducerArg<T> => {
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
                };
            }
            return {
                accumulator,
                item,
                isReduced: false,
            };
        };

        if (this.isAnd()) {
            return _.reduce(
                this.items,
                (acc, item) => andReducer(
                    reducerArguments(acc, item),
                ),
                andInitialValue,
            );
        }

        if (this.isOr()) {
            return _.reduce(
                this.items,
                (acc, item) => orReducer(
                    reducerArguments(acc, item),
                ),
                orInitialValue,
            );
        }
        throw Error(`Invalid type: ${this.type}`);
    }

    evaluate(isItemTrue: (item: string) => boolean) {
        return this.reduce({
            andInitialValue: true,
            andReducer: ({ accumulator, item, isReduced }) => accumulator && (isReduced ? item : isItemTrue(item)),
            orInitialValue: false,
            orReducer: ({ accumulator, item, isReduced }) => accumulator || (isReduced ? item : isItemTrue(item)),
        });
    }

    simplify(implies: BinOp<string>, iterations = 3) {
        let updatedExpression = this.flatten();

        for (let i = 0; i < iterations; i++) {
            updatedExpression = updatedExpression.removeDuplicateChildren(implies);
            updatedExpression = updatedExpression.removeDuplicateExpressions(implies);
        }

        return updatedExpression;
    }

    oppositeType() {
        if (this.isAnd()) {
            return Op.Or;
        }
        if (this.isOr()) {
            return Op.And;
        }
        throw Error(`Invalid type for boolean expression: ${this.type}`);
    }

    static isExpression(item: unknown): item is BooleanExpression {
        return typeof item === 'object' && item instanceof BooleanExpression;
    }

    isEqualTo(otherExpression: Item, areItemsEqual: BinOp<string>): boolean {
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

    flatten(): BooleanExpression {
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

    static createFlatExpression(items: Item[], type: Op) {
        return new BooleanExpression(items, type).flatten();
    }

    // determines if a provided item is subsumed by a provided collection of items
    // calculation depends on the type of the containing expression
    // implies is the function for determing if requirements are subsumable (defines the relationship between items)
    static itemIsSubsumed(itemsCollection: Item[], item: string, expressionType: Op, implies: BinOp<string>) {
        let itemIsSubsumed = false;
        itemsCollection.forEach((otherItem) => {
            if (this.isExpression(otherItem)) {
                return true;
            }

            switch (expressionType) {
                case Op.And: {
                    // for and logic the subsuming item (the item from the collection) needs to imply the subsumed item
                    // otherwise the logic would lose precision on counted items (i.e. Sword x2 could subsume Sword x3 depending on sequence)
                    if (implies(otherItem, item)) {
                        itemIsSubsumed = true;
                        return false;
                    }
                    break;
                }
                case Op.Or: {
                    // for an or expression this precision doesn't matter - Sword x2 is just as good as Sword x3, therefore any implying
                    // item can subsume the item in question
                    if (implies(item, otherItem)) {
                        itemIsSubsumed = true;
                        return false;
                    }
                }
            }

            return true;
        });
        return itemIsSubsumed;
    }

    getUpdatedParentItems(parentItems: ParentItems) {
        return _.mergeWith({}, parentItems, { [this.type]: this.items }, (objectValue: Item[], sourceValue: Item[]) => {
            if (_.isArray(objectValue)) {
                return _.concat(objectValue, _.filter(sourceValue, (value) => !BooleanExpression.isExpression(value)));
            }
            return undefined;
        });
    }

    removeDuplicateChildrenHelper(implies: BinOp<string>, parentItems: ParentItems) {
        const newItems: Item[] = [];
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

    removeDuplicateChildren(implies: BinOp<string>) {
        const { expression } = this.removeDuplicateChildrenHelper(implies, {
            [Op.And]: [],
            [Op.Or]: [],
        });
        return expression;
    }

    isSubsumedBy(otherExpression: BooleanExpression, implies: BinOp<string>, removeIfIdentical: boolean, expressionType: Op): boolean {
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

    expressionIsSubsumed(expression: BooleanExpression, index: number, implies: BinOp<string>) {
        let expressionIsSubsumed = false;
        this.items.forEach((otherItem, otherIndex) => {
            if (otherIndex === index) {
                return true;
            }

            let otherExpression: BooleanExpression;
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

    removeDuplicateExpressionsInChildren(implies: BinOp<string>): BooleanExpression {
        const newItems = this.items.map((item) => {
            if (BooleanExpression.isExpression(item)) {
                return item.removeDuplicateExpressions(implies);
            }
            return item;
        });
        return BooleanExpression.createFlatExpression(newItems, this.type);
    }

    removeDuplicateExpressions(implies: BinOp<string>): BooleanExpression {
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
        if (this.type === Op.Or && newItems.length >= 2 && _.every(_.map(newItems, BooleanExpression.isExpression))) {
            const commonFactors: Item[] = [];
            const booleanItems = newItems as BooleanExpression[];
            _.forEach(booleanItems[0].items, (item) => {
                if (_.every(_.map(booleanItems, (expr) => _.includes(expr.items, item)))) {
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

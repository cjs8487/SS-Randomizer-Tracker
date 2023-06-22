import _ from 'lodash';
import BooleanExpression, {
    CompositeRequirement,
    ReducerArgs,
    Requirement,
} from './BooleanExpression';
import prettytemNames from '../data/prettyItemNames.json';
// eslint-disable-next-line import/no-cycle
import Logic from './Logic';

export type ReadableRequirement = {
    item: string;
    name: string;
};

export type ReadableRequirements = Array<
    ReadableRequirement | ReadableRequirements
>;

type GetAccumulatorFunction = (
    accumulatorValue: boolean,
    itemValue: boolean,
) => boolean;

class LogicHelper {
    static logic: Logic;

    static bindLogic(logic: Logic) {
        this.logic = logic;
    }

    static parseRequirement(
        requirement: string,
        visitedRequirements: Set<string>,
    ): BooleanExpression | string {
        const requirementValue = this.logic.requirements.get(requirement);
        if (requirementValue) {
            if (visitedRequirements.has(requirement)) {
                return 'Impossible';
            }
            return this.booleanExpressionForRequirements(
                requirementValue,
                new Set(visitedRequirements).add(requirement),
            );
        }

        const trickMatch = requirement.match(/^(.+) Trick$/);
        let expandedRequirement;

        if (trickMatch) {
            const trickName = trickMatch[1];
            expandedRequirement = `Option "enabled-tricks" Contains "${trickName}"`;
        } else {
            expandedRequirement = requirement;
        }

        const optionEnabledRequirementValue =
            this.checkOptionEnabledRequirement(expandedRequirement);
        if (!_.isNil(optionEnabledRequirementValue)) {
            return optionEnabledRequirementValue ? 'Nothing' : 'Impossible';
        }
        return expandedRequirement;
    }

    static booleanExpressionForTokens(
        expressionTokens: string[],
        visitedRequirements: Set<string>,
    ): BooleanExpression {
        const itemsForExpression = [];
        let expressionTypeToken;
        while (!_.isEmpty(expressionTokens)) {
            const currentToken = expressionTokens.shift() as string; // this cast is safe since we know the list is non-empty
            if (currentToken === '&' || currentToken === '|') {
                expressionTypeToken = currentToken;
            } else if (currentToken === '(') {
                const childExpression = this.booleanExpressionForTokens(
                    expressionTokens,
                    visitedRequirements,
                );
                itemsForExpression.push(childExpression);
            } else if (currentToken === ')') {
                break;
            } else {
                itemsForExpression.push(
                    this.parseRequirement(currentToken, visitedRequirements),
                );
            }
        }
        if (expressionTypeToken === '|') {
            return BooleanExpression.or(...itemsForExpression);
        }
        return BooleanExpression.and(...itemsForExpression);
    }

    static requirementImplies(
        firstRequirement: string,
        secondRequirement: string,
    ): boolean {
        if (firstRequirement === secondRequirement) {
            return true;
        }
        if (firstRequirement === 'Impossible') {
            return true;
        }

        if (secondRequirement === 'Nothing') {
            return true;
        }
        const firstItemCountRequirement =
            LogicHelper.parseItemCountRequirement(firstRequirement);
        const secondItemCountRequirement =
            LogicHelper.parseItemCountRequirement(secondRequirement);

        if (
            !_.isNil(firstItemCountRequirement) &&
            !_.isNil(secondItemCountRequirement)
        ) {
            if (
                firstItemCountRequirement.itemName ===
                secondItemCountRequirement.itemName
            ) {
                return (
                    firstItemCountRequirement.countRequired >
                    secondItemCountRequirement.countRequired
                );
            }
        }
        return false;
    }

    static splitExpression(expression: string): string[] {
        return _.compact(_.map(expression.split(/\s*([(&|)])\s*/g), _.trim));
    }

    static booleanExpressionForRequirements(
        requirements: string,
        visitedRequirements = new Set<string>(),
    ): BooleanExpression {
        const expressionTokens = this.splitExpression(requirements);
        const expression = this.booleanExpressionForTokens(
            expressionTokens,
            visitedRequirements,
        );
        return expression;
    }

    static createReadableRequirements(
        requirements: Requirement,
    ): ReadableRequirements {
        if (requirements.type === 'and') {
            return _.map(requirements.items, (item) =>
                _.flattenDeep(this.createReadableRequirementsHelper(item)),
            );
        }
        if (requirements.type === 'or') {
            return [
                _.flattenDeep(
                    this.createReadableRequirementsHelper(requirements),
                ),
            ];
        }
        throw Error(
            `Cannot create requirements for invalid type ${requirements.type}`,
        );
    }

    static createReadableRequirementsHelper(
        requirements: Requirement,
    ): ReadableRequirements {
        if (requirements.item) {
            const prettyItemName = LogicHelper.prettyNameForItemRequirement(
                requirements.item,
            );
            return [
                {
                    item: requirements.item,
                    name: prettyItemName,
                },
            ];
        }
        return _.map(requirements.items, (item, index) => {
            const currentResult = [];
            if (item.items) {
                // expression
                currentResult.push([
                    {
                        item: '(',
                        name: '(',
                    },
                    this.createReadableRequirementsHelper(item),
                    {
                        item: ')',
                        name: ')',
                    },
                ]);
            } else {
                currentResult.push(this.createReadableRequirementsHelper(item));
            }

            if (index < requirements.items.length - 1) {
                if (requirements.type === 'and') {
                    currentResult.push({
                        item: ' and ',
                        name: ' and ',
                    });
                } else {
                    currentResult.push({
                        item: ' or ',
                        name: ' or ',
                    });
                }
            }
            return currentResult;
        });
    }

    static evaluatedRequirements(requirements: BooleanExpression): Requirement {
        const generateReducerFunction =
            (getAccumulatorValue: GetAccumulatorFunction) =>
            ({
                accumulator,
                item,
                isReduced,
            }: {
                accumulator: Requirement;
                item: Requirement | string;
                isReduced: boolean;
            }) => {
                if (isReduced) {
                    return {
                        items: _.concat(accumulator.items, item),
                        type: accumulator.type,
                        value: getAccumulatorValue(
                            accumulator.value,
                            (item as Requirement).value, // safe because we know it's already been reduced
                        ),
                    };
                }

                const wrappedItem = {
                    item,
                    value: false,
                };

                return {
                    items: _.concat(accumulator.items, wrappedItem),
                    type: accumulator.type,
                    value: getAccumulatorValue(
                        accumulator.value,
                        wrappedItem.value,
                    ),
                };
            };

        const andReducer = generateReducerFunction(
            (accumulatorValue: boolean, itemValue: boolean) =>
                accumulatorValue && itemValue,
        );

        const orReducer = generateReducerFunction(
            (accumulatorValue: boolean, itemValue: boolean) =>
                accumulatorValue || itemValue,
        );

        const andInitialValue: Requirement = {
            items: [] as Requirement[],
            type: 'and',
            value: true,
        };

        return requirements.reduce(
            andInitialValue,
            (reducerArgs: ReducerArgs) => andReducer(reducerArgs),
            {
                items: [],
                type: 'or',
                value: false,
            },
            (reducerArgs: ReducerArgs) => orReducer(reducerArgs),
        );
    }

    static parseItemCountRequirement(requirement: string) {
        const itemCountRequirementMatch =
            requirement.match(/((?:\w|\s)+) x(\d+)/);
        if (itemCountRequirementMatch) {
            return {
                itemName: itemCountRequirementMatch[1],
                countRequired: _.toSafeInteger(itemCountRequirementMatch[2]),
            };
        }
        return null;
    }

    static prettyNameForItemRequirement(itemRequirement: string) {
        const itemCountRequirement =
            this.parseItemCountRequirement(itemRequirement);
        if (!_.isNil(itemCountRequirement)) {
            const { itemName, countRequired } = itemCountRequirement;

            return (
                this.prettyNameOverride(itemName, countRequired) ||
                itemRequirement
            );
        }
        return this.prettyNameOverride(itemRequirement) || itemRequirement;
    }

    static prettyNameForItem(itemName: string, itemCount: number): string {
        const prettyNameOverride = this.prettyNameOverride(itemName, itemCount);
        if (!_.isNil(prettyNameOverride)) {
            return prettyNameOverride;
        }
        return itemName;
    }

    static prettyNameOverride(itemName: string, itemCount = 1): string {
        return _.get(prettytemNames, [itemName, itemCount]);
    }

    static checkOptionEnabledRequirement(
        requirement: string,
    ): boolean | undefined {
        const matchers = [
            {
                regex: /^Option "([^"]+)" Enabled$/,
                value: (optionValue: string) => !!optionValue,
            },
            {
                regex: /^Option "([^"]+)" Disabled$/,
                value: (optionValue: string) => !optionValue,
            },
            {
                regex: /^Option "([^"]+)" Is "([^"]+)"$/,
                value: (optionValue: string, expectedValue: string) =>
                    optionValue === expectedValue,
            },
            {
                regex: /^Option "([^"]+)" Is Not "([^"]+)"$/,
                value: (optionValue: string, expectedValue: string) =>
                    optionValue !== expectedValue,
            },
            {
                regex: /^Option "([^"]+)" Contains "([^"]+)"$/,
                value: (optionValue: string, expectedValue: string) =>
                    optionValue.includes(expectedValue),
            },
            {
                regex: /^Option "([^"]+)" Does Not Contain "([^"]+)"$/,
                value: (optionValue: string, expectedValue: string) =>
                    !optionValue.includes(expectedValue),
            },
        ];

        let optionEnabledRequirementValue: boolean | undefined;

        _.forEach(matchers, (matcher) => {
            const requirementMatch = requirement.match(matcher.regex);
            if (requirementMatch) {
                const optionName = requirementMatch[1];
                const optionValue = this.logic.getOptionValue(optionName);
                const expectedValue = requirementMatch[2];
                optionEnabledRequirementValue = matcher.value(
                    optionValue,
                    expectedValue,
                );

                return false; // break loop
            }
            return true; // continue
        });

        return optionEnabledRequirementValue;
    }
}

export default LogicHelper;

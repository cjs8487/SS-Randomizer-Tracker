import _ from 'lodash';
import BooleanExpression, { ReducerArg } from './BooleanExpression';
import prettytemNames from '../data/prettyItemNames.json';
import type Logic from './Logic';

type NestedArray<T> = (T | NestedArray<T>)[];

interface EvaluatedBooleanExpression {
    // eslint-disable-next-line no-use-before-define
    items: EvaluatedRequirement[];
    type: 'and' | 'or';
    value: boolean;
}

type EvaluatedRequirement = EvaluatedBooleanExpression | {
    item: string,
    value: boolean;
}

export interface ReadableRequirement {
    item: string;
    name: string;
}

class LogicHelper {
    static logic: Logic;

    static bindLogic(logic: Logic) {
        this.logic = logic;
    }

    static parseRequirement(requirement: string, visitedRequirements: Set<string>) {
        const requirementValue = this.logic.getRequirement(requirement);
        if (requirementValue) {
            if (visitedRequirements.has(requirement)) {
                return 'Impossible';
            }
            return this.booleanExpressionForRequirements(requirementValue, new Set(visitedRequirements).add(requirement));
        }

        const trickMatch = requirement.match(/^(.+) Trick$/);
        let expandedRequirement;

        if (trickMatch) {
            const trickName = trickMatch[1];
            expandedRequirement = `Option "enabled-tricks" Contains "${trickName}"`;
        } else {
            expandedRequirement = requirement;
        }

        const optionEnabledRequirementValue = this.checkOptionEnabledRequirement(expandedRequirement);
        if (!_.isNil(optionEnabledRequirementValue)) {
            return optionEnabledRequirementValue ? 'Nothing' : 'Impossible';
        }
        if (expandedRequirement.includes('damage')) {
            // console.log(expandedRequirement);
        }
        return expandedRequirement;
    }

    static booleanExpressionForTokens(expressionTokens: string[], visitedRequirements: Set<string>): BooleanExpression {
        const itemsForExpression = [];
        let expressionTypeToken;
        while (!_.isEmpty(expressionTokens)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const currentToken = expressionTokens.shift()!;
            if (currentToken === '&' || currentToken === '|') {
                expressionTypeToken = currentToken;
            } else if (currentToken === '(') {
                const childExpression = this.booleanExpressionForTokens(expressionTokens, visitedRequirements);
                itemsForExpression.push(childExpression);
            } else if (currentToken === ')') {
                break;
            } else {
                itemsForExpression.push(this.parseRequirement(currentToken, visitedRequirements));
            }
        }
        if (expressionTypeToken === '|') {
            return BooleanExpression.or(...itemsForExpression);
        }
        return BooleanExpression.and(...itemsForExpression);
    }

    static requirementImplies(firstRequirement: string, secondRequirement: string) {
        if (firstRequirement === secondRequirement) {
            return true;
        }
        if (firstRequirement === 'Impossible') {
            return true;
        }

        if (secondRequirement === 'Nothing') {
            return true;
        }
        const firstItemCountRequirement = LogicHelper.parseItemCountRequirement(firstRequirement);
        const secondItemCountRequirement = LogicHelper.parseItemCountRequirement(secondRequirement);

        if (!_.isNil(firstItemCountRequirement) && !_.isNil(secondItemCountRequirement)) {
            if (firstItemCountRequirement.itemName === secondItemCountRequirement.itemName) {
                return firstItemCountRequirement.countRequired > secondItemCountRequirement.countRequired;
            }
        }
        return false;
    }

    static splitExpression(expression: string) {
        // console.log(expression);
        return _.compact(
            _.map(expression.split(/\s*([(&|)])\s*/g), _.trim),
        );
    }

    static booleanExpressionForRequirements(requirements: string, visitedRequirements = new Set<string>()) {
        // console.log(requirements);
        const expressionTokens = this.splitExpression(requirements);
        const expression = this.booleanExpressionForTokens(expressionTokens, visitedRequirements);
        return expression;
    }

    static createReadableRequirements(requirements: EvaluatedBooleanExpression) {
        if (requirements.type === 'and') {
            return _.map(requirements.items, (item) => _.flattenDeep(this.createReadableRequirementsHelper(item)));
        }
        if (requirements.type === 'or') {
            return [_.flattenDeep(this.createReadableRequirementsHelper(requirements))];
        }
        throw Error(`Cannot create requirements for invalid type ${requirements.type}`);
    }

    static createReadableRequirementsHelper(requirements: EvaluatedRequirement): NestedArray<ReadableRequirement> {
        if ('item' in requirements) {
            const prettyItemName = LogicHelper.prettyNameForItemRequirement(requirements.item);
            return [{
                item: requirements.item,
                name: prettyItemName,
            }];
        }
        return _.map(requirements.items, (item, index) => {
            const currentResult: NestedArray<ReadableRequirement> = [];
            if ('items' in item) { // expression
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

    static evaluatedRequirements(requirements: BooleanExpression) {
        const generateReducerFunction = (getAccumulatorValue: (acc: boolean, value: boolean) => boolean) => ({
            accumulator,
            item,
            isReduced,
        }: ReducerArg<EvaluatedBooleanExpression>) => {
            if (isReduced) {
                return {
                    items: _.concat(accumulator.items, item),
                    type: accumulator.type,
                    value: getAccumulatorValue(accumulator.value, item.value),
                };
            }

            const wrappedItem = {
                item,
                value: false,
            };

            return {
                items: _.concat(accumulator.items, wrappedItem),
                type: accumulator.type,
                value: getAccumulatorValue(accumulator.value, wrappedItem.value),
            };
        };

        return requirements.reduce<EvaluatedBooleanExpression>({
            andInitialValue: {
                items: [],
                type: 'and',
                value: true,
            },
            andReducer: (reducerArgs) => generateReducerFunction(
                (accumulatorValue, itemValue) => accumulatorValue && itemValue,
            )(reducerArgs),
            orInitialValue: {
                items: [],
                type: 'or',
                value: false,
            },
            orReducer: (reducerArgs) => generateReducerFunction(
                (accumulatorValue, itemValue) => accumulatorValue || itemValue,
            )(reducerArgs),
        });
    }

    static parseItemCountRequirement(requirement: string) {
        const itemCountRequirementMatch = requirement.match(/((?:\w|\s)+) x(\d+)/);
        if (itemCountRequirementMatch) {
            return {
                itemName: itemCountRequirementMatch[1],
                countRequired: _.toSafeInteger(itemCountRequirementMatch[2]),
            };
        }
        return null;
    }

    static prettyNameForItemRequirement(itemRequirement: string) {
        const itemCountRequirement = this.parseItemCountRequirement(itemRequirement);
        if (!_.isNil(itemCountRequirement)) {
            const {
                itemName,
                countRequired,
            } = itemCountRequirement;

            return this.prettyNameOverride(itemName, countRequired) || itemRequirement;
        }
        return this.prettyNameOverride(itemRequirement) || itemRequirement;
    }

    static prettyNameForItem(itemName: string, itemCount: number) {
        const prettyNameOverride = this.prettyNameOverride(itemName, itemCount);
        if (!_.isNil(prettyNameOverride)) {
            return prettyNameOverride;
        }
        return itemName;
    }

    static prettyNameOverride(itemName: string, itemCount = 1) {
        return _.get(prettytemNames, [itemName, itemCount]);
    }

    static checkOptionEnabledRequirement(requirement: string) {
        const matchers: {
            regex: RegExp,
            value: (optionValue: string, expectedValue: string) => boolean
        }[] = [
            {
                regex: /^Option "([^"]+)" Enabled$/,
                value: (optionValue) => Boolean(optionValue),
            },
            {
                regex: /^Option "([^"]+)" Disabled$/,
                value: (optionValue) => !optionValue,
            },
            {
                regex: /^Option "([^"]+)" Is "([^"]+)"$/,
                value: (optionValue, expectedValue) => optionValue === expectedValue,
            },
            // special case for integers after 'Is'
            {
                regex: /^Option "([^"]+)" Is ([^"]+)$/,
                value: (optionValue, expectedValue) => parseInt(optionValue, 10) === parseInt(expectedValue, 10),
            },
            {
                regex: /^Option "([^"]+)" Is Not "([^"]+)"$/,
                value: (optionValue, expectedValue) => optionValue !== expectedValue,
            },
            {
                regex: /^Option "([^"]+)" Contains "([^"]+)"$/,
                value: (optionValue, expectedValue) => optionValue.includes(expectedValue),
            },
            {
                regex: /^Option "([^"]+)" Does Not Contain "([^"]+)"$/,
                value: (optionValue, expectedValue) => !optionValue.includes(expectedValue),
            },
        ];

        let optionEnabledRequirementValue;

        _.forEach(matchers, (matcher) => {
            const requirementMatch = requirement.match(matcher.regex);
            if (requirementMatch) {
                const optionName = requirementMatch[1];
                const optionValue = this.logic.getOptionValue(optionName);
                const expectedValue = requirementMatch[2];
                optionEnabledRequirementValue = matcher.value(optionValue, expectedValue);

                return false; // break loop
            }
            return true; // continue
        });

        return optionEnabledRequirementValue;
    }
}

export default LogicHelper;

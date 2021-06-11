import _ from 'lodash';
import BooleanExpression from './BooleanExpression';
import prettytemNames from '../data/prettyItemNames.json';

class LogicHelper {
    static logic;

    static bindLogic(logic) {
        this.logic = logic;
    }

    static parseRequirement(requirement, visitedRequirements) {
        const requirementValue = this.logic.requirements.get(requirement);
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
        return expandedRequirement;
    }

    static booleanExpressionForTokens(expressionTokens, visitedRequirements) {
        const itemsForExpression = [];
        let expressionTypeToken;
        while (!_.isEmpty(expressionTokens)) {
            const currentToken = expressionTokens.shift();
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

    static requirementImplies(firstRequirement, secondRequirement) {
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

    static splitExpression(expression) {
        // console.log(expression)
        return _.compact(
            _.map(expression.split(/\s*([(&|)])\s*/g), _.trim),
        );
    }

    static booleanExpressionForRequirements(requirements, visitedRequirements = new Set()) {
        const expressionTokens = this.splitExpression(requirements);
        const expression = this.booleanExpressionForTokens(expressionTokens, visitedRequirements);
        return expression;
    }

    static createReadableRequirements(requirements) {
        if (requirements.type === 'and') {
            return _.map(requirements.items, (item) => _.flattenDeep(this.createReadableRequirementsHelper(item)));
        }
        if (requirements.type === 'or') {
            return [_.flattenDeep(this.createReadableRequirementsHelper(requirements))];
        }
        throw Error(`Cannot create requirements for invalid type ${requirements.type}`);
    }

    static createReadableRequirementsHelper(requirements) {
        if (requirements.item) {
            const prettyItemName = LogicHelper.prettyNameForItemRequirement(requirements.item);
            return [{
                item: requirements.item,
                name: prettyItemName,
            }];
        }
        return _.map(requirements.items, (item, index) => {
            const currentResult = [];
            if (item.items) { // expression
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

    static evaluatedRequirements(requirements) {
        const generateReducerFunction = (getAccumulatorValue) => ({
            accumulator,
            item,
            isReduced,
        }) => {
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

        return requirements.reduce({
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

    static parseItemCountRequirement(requirement) {
        const itemCountRequirementMatch = requirement.match(/((?:\w|\s)+) x(\d+)/);
        if (itemCountRequirementMatch) {
            return {
                itemName: itemCountRequirementMatch[1],
                countRequired: _.toSafeInteger(itemCountRequirementMatch[2]),
            };
        }
        return null;
    }

    static prettyNameForItemRequirement(itemRequirement) {
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

    static prettyNameForItem(itemName, itemCount) {
        const prettyNameOverride = this.prettyNameOverride(itemName, itemCount);
        if (!_.isNil(prettyNameOverride)) {
            return prettyNameOverride;
        }
        return itemName;
    }

    static prettyNameOverride(itemName, itemCount = 1) {
        return _.get(prettytemNames, [itemName, itemCount]);
    }

    static checkOptionEnabledRequirement(requirement) {
        const matchers = [
            {
                regex: /^Option "([^"]+)" Enabled$/,
                value: (optionValue) => optionValue,
            },
            {
                regex: /^Option "([^"]+)" Disabled$/,
                value: (optionValue) => !optionValue,
            },
            //   {
            //     regex: /^Option "([^"]+)" Is "([^"]+)"$/,
            //     value: (optionValue, expectedValue) => optionValue === expectedValue,
            //   },
            {
                regex: /^Option "([^"]+)" Is Not "([^"]+)"$/,
                value: (optionValue, expectedValue) => optionValue !== expectedValue,
            },
            {
                regex: /^Option "([^"]+)" Contains "([^"]+)"$/,
                value: (optionValue, expectedValue) => _.get(optionValue, expectedValue),
            },
            //   {
            //     regex: /^Option "([^"]+)" Does Not Contain "([^"]+)"$/,
            //     value: (optionValue, expectedValue) => !_.get(optionValue, expectedValue),
            //   },
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

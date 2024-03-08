import _ from 'lodash';
import BooleanExpression, { Op, ReducerArg } from './BooleanExpression';
import prettytemNames from '../data/prettyItemNames.json';
import {
    OptionValue,
    OptionsCommand,
    Settings,
} from '../permalink/SettingsTypes';
import { Requirements, parseItemCountRequirement } from './Requirements';

type NestedArray<T> = (T | NestedArray<T>)[];

interface EvaluatedBooleanExpression {
    items: EvaluatedRequirement[];
    type: Op;
    value: boolean;
}

type EvaluatedRequirement =
    | EvaluatedBooleanExpression
    | {
          item: string;
          value: boolean;
      };

export interface ReadableRequirement {
    item: string;
    name: string;
}

function expandRequirement(
    requirement: string,
    requirements: Requirements,
    settings: Settings,
    visitedRequirements: Set<string>,
) {
    const requirementValue = requirements[requirement];
    if (requirementValue) {
        if (visitedRequirements.has(requirement)) {
            return 'Impossible';
        }
        return booleanExpressionForRequirements(
            requirementValue,
            requirements,
            settings,
            new Set(visitedRequirements).add(requirement),
        );
    }

    const trickMatch = requirement.match(/^(.+) Trick$/);
    let expandedRequirement;

    if (trickMatch) {
        const trickName = trickMatch[1];
        // Hack: make up an "enabled tricks" setting
        expandedRequirement = `Option "enabled-tricks" Contains "${trickName}"`;
    } else {
        expandedRequirement = requirement;
    }

    const optionEnabledRequirementValue = checkOptionEnabledRequirement(
        expandedRequirement,
        settings,
    );
    if (!_.isNil(optionEnabledRequirementValue)) {
        return optionEnabledRequirementValue ? 'Nothing' : 'Impossible';
    }
    return expandedRequirement;
}

function booleanExpressionForTokens(
    expressionTokens: string[],
    requirements: Requirements,
    settings: Settings,
    visitedRequirements: Set<string>,
): BooleanExpression {
    const itemsForExpression = [];
    let expressionTypeToken;
    while (!_.isEmpty(expressionTokens)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const currentToken = expressionTokens.shift()!;
        if (currentToken === '&' || currentToken === '|') {
            expressionTypeToken = currentToken;
        } else if (currentToken === '(') {
            const childExpression = booleanExpressionForTokens(
                expressionTokens,
                requirements,
                settings,
                visitedRequirements,
            );
            itemsForExpression.push(childExpression);
        } else if (currentToken === ')') {
            break;
        } else {
            itemsForExpression.push(
                expandRequirement(
                    currentToken,
                    requirements,
                    settings,
                    visitedRequirements,
                ),
            );
        }
    }
    if (expressionTypeToken === '|') {
        return BooleanExpression.or(...itemsForExpression);
    }
    return BooleanExpression.and(...itemsForExpression);
}

function splitExpression(expression: string) {
    // console.log(expression);
    return _.compact(_.map(expression.split(/\s*([(&|)])\s*/g), _.trim));
}

export function requirementImplies(firstRequirement: string, secondRequirement: string) {
    if (firstRequirement === secondRequirement) {
        return true;
    }
    if (firstRequirement === 'Impossible') {
        return true;
    }

    if (secondRequirement === 'Nothing') {
        return true;
    }
    const firstItemCountRequirement = parseItemCountRequirement(firstRequirement);
    const secondItemCountRequirement = parseItemCountRequirement(secondRequirement);

    if (!_.isNil(firstItemCountRequirement) && !_.isNil(secondItemCountRequirement) &&
        firstItemCountRequirement.itemName === secondItemCountRequirement.itemName) {
        return firstItemCountRequirement.countRequired > secondItemCountRequirement.countRequired;
    }
    return false;
}

export function booleanExpressionForRequirements(
    requirement: string,
    requirements: Requirements,
    settings: Settings,
    visitedRequirements = new Set<string>(),
) {
    const expressionTokens = splitExpression(requirement);
    return booleanExpressionForTokens(
        expressionTokens,
        requirements,
        settings,
        visitedRequirements,
    );
}

function checkOptionEnabledRequirement(
    requirement: string,
    settings: Settings,
) {
    const matchers: {
        regex: RegExp;
        value: (optionValue: OptionValue, expectedValue: string) => boolean;
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
            value: (optionValue, expectedValue) =>
                optionValue === expectedValue,
        },
        // special case for integers after 'Is'
        {
            regex: /^Option "([^"]+)" Is ([^"]+)$/,
            value: (optionValue, expectedValue) =>
                optionValue === parseInt(expectedValue, 10),
        },
        {
            regex: /^Option "([^"]+)" Is Not "([^"]+)"$/,
            value: (optionValue, expectedValue) =>
                optionValue !== expectedValue,
        },
        {
            regex: /^Option "([^"]+)" Contains "([^"]+)"$/,
            value: (optionValue, expectedValue) =>
                (Array.isArray(optionValue) ||
                    typeof optionValue === 'string') &&
                optionValue.includes(expectedValue),
        },
        {
            regex: /^Option "([^"]+)" Does Not Contain "([^"]+)"$/,
            value: (optionValue, expectedValue) =>
                (Array.isArray(optionValue) ||
                    typeof optionValue === 'string') &&
                !optionValue.includes(expectedValue),
        },
    ];

    let optionEnabledRequirementValue;

    _.forEach(matchers, (matcher) => {
        const requirementMatch = requirement.match(matcher.regex);
        if (requirementMatch) {
            const option = requirementMatch[1] as OptionsCommand;

            let optionValue: OptionValue | undefined;
            if ((option as string) === 'enabled-tricks') {
                // Hack: if this is our made up 'enabled-tricks' setting, retrieve
                // the right setting
                optionValue = settings['enabled-tricks-bitless'].length
                    ? settings['enabled-tricks-bitless']
                    : settings['enabled-tricks-glitched'];
            } else {
                optionValue = settings[option];
            }
            const expectedValue = requirementMatch[2];
            optionEnabledRequirementValue =
                optionValue !== undefined &&
                matcher.value(optionValue, expectedValue);

            return false; // break loop
        }
        return true; // continue
    });

    return optionEnabledRequirementValue;
}

export function createReadableRequirements(requirements: EvaluatedBooleanExpression) {
    switch (requirements.type) {
        case Op.And:
            return _.map(requirements.items, (item) =>
                _.flattenDeep(createReadableRequirementsHelper(item)),
            );
        case Op.Or:
            return [
                _.flattenDeep(createReadableRequirementsHelper(requirements)),
            ];
    }
}

function createReadableRequirementsHelper(
    requirements: EvaluatedRequirement,
): NestedArray<ReadableRequirement> {
    if ('item' in requirements) {
        const prettyItemName = prettyNameForItemRequirement(requirements.item);
        return [
            {
                item: requirements.item,
                name: prettyItemName,
            },
        ];
    }
    return _.map(requirements.items, (item, index) => {
        const currentResult: NestedArray<ReadableRequirement> = [];
        if ('items' in item) {
            // expression
            currentResult.push([
                {
                    item: '(',
                    name: '(',
                },
                createReadableRequirementsHelper(item),
                {
                    item: ')',
                    name: ')',
                },
            ]);
        } else {
            currentResult.push(createReadableRequirementsHelper(item));
        }

        if (index < requirements.items.length - 1) {
            if (requirements.type === Op.And) {
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

export function evaluateRequirements(requirements: BooleanExpression) {
    const generateReducerFunction =
        (getAccumulatorValue: (acc: boolean, value: boolean) => boolean) =>
            ({
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
                    value: getAccumulatorValue(
                        accumulator.value,
                        wrappedItem.value,
                    ),
                };
            };

    return requirements.reduce<EvaluatedBooleanExpression>({
        andInitialValue: {
            items: [],
            type: Op.And,
            value: true,
        },
        andReducer: (reducerArgs) =>
            generateReducerFunction(
                (accumulatorValue, itemValue) => accumulatorValue && itemValue,
            )(reducerArgs),
        orInitialValue: {
            items: [],
            type: Op.Or,
            value: false,
        },
        orReducer: (reducerArgs) =>
            generateReducerFunction(
                (accumulatorValue, itemValue) => accumulatorValue || itemValue,
            )(reducerArgs),
    });
}

function prettyNameForItemRequirement(itemRequirement: string) {
    const itemCountRequirement = parseItemCountRequirement(itemRequirement);
    if (!_.isNil(itemCountRequirement)) {
        const { itemName, countRequired } = itemCountRequirement;

        return prettyNameOverride(itemName, countRequired) || itemRequirement;
    }
    return prettyNameOverride(itemRequirement) || itemRequirement;
}

function prettyNameOverride(itemName: string, itemCount = 1) {
    return _.get(prettytemNames, [itemName, itemCount]) as string;
}

import _ from 'lodash';
import {
    Settings,
    OptionValue,
    OptionsCommand,
} from '../permalink/SettingsTypes';
import BooleanExpression from './BooleanExpression';
import { Requirements } from './Requirements';

/**
 * Given a requirement name, a list of macros, and the current settings,
 * builds a boolean expression that only depends on tracker items
 * (settings are pre-evaluated).
 */
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

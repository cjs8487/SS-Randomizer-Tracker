import _ from 'lodash';
import BooleanExpression, { Op } from './BooleanExpression';
import prettytemNames from '../data/prettyItemNames.json';
import { parseItemCountRequirement } from './Requirements';

type NestedArray<T> = (T | NestedArray<T>)[];

export interface ReadableRequirement {
    item: string;
    name: string;
}

/**
 * Turn a boolean expression into a readable tooltip requirements list.
 * The top-level list is essentially a list of bullet points, while
 * the nested lists are the brackets, ` and `s, ` or `s, and actual items.
 */
export function createReadableRequirements(requirements: BooleanExpression) {
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
    requirements: BooleanExpression | string,
): NestedArray<ReadableRequirement> {
    if (!BooleanExpression.isExpression(requirements)) {
        const prettyItemName = prettyNameForItemRequirement(requirements);
        return [
            {
                item: requirements,
                name: prettyItemName,
            },
        ];
    }
    return _.map(requirements.items, (item, index) => {
        const currentResult: NestedArray<ReadableRequirement> = [];
        if (BooleanExpression.isExpression(item)) {
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

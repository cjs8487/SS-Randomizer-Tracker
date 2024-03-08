import _ from 'lodash';
import { InventoryItem, isItem } from './Inventory';
import BooleanExpression from './BooleanExpression';

export type Requirements = Record<string, string>;

export function parseItemCountRequirement(requirement: string) {
    const itemCountRequirementMatch = requirement.match(/((?:\w|\s)+) x(\d+)/);
    if (itemCountRequirementMatch) {
        return {
            itemName: itemCountRequirementMatch[1],
            countRequired: _.toSafeInteger(itemCountRequirementMatch[2]),
        };
    }
    return null;
}

export function evaluateRequirement(
    requirement: string,
    itemCounts: Record<InventoryItem, number>,
    additionalItems: Record<string, number>,
) {
    if (requirement === 'Nothing') {
        return true;
    } else if (requirement === 'Impossible') {
        return false;
    } else {
        const itemCountRequirement = parseItemCountRequirement(requirement);
        if (itemCountRequirement) {
            const { countRequired, itemName } = itemCountRequirement;

            const itemCount = isItem(itemName)
                ? itemCounts[itemName]
                : additionalItems[itemName];
            if (_.isNil(itemCount)) {
                throw new Error('failed to find item count ' + itemName);
            }
            return countRequired <= itemCount;
        } else {
            const itemValue = isItem(requirement)
                ? itemCounts[requirement]
                : additionalItems[requirement];
            if (_.isNil(itemValue)) {
                throw new Error('failed to find item ' + requirement);
            }
            return itemValue > 0;
        }
    }
}

export function areRequirementsMet(
    requirements: BooleanExpression,
    itemCounts: Record<InventoryItem, number>,
    additionalItems: Record<string, number>,
) {
    return requirements.evaluate((requirement) =>
        isRequirementMet(requirement, itemCounts, additionalItems),
    );
}

export function isRequirementMet(
    requirement: string,
    itemCounts: Record<InventoryItem, number>,
    additionalItems: Record<string, number>,
) {
    return evaluateRequirement(requirement, itemCounts, additionalItems);
}

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/Store';
import { currySelector } from '../utils/Redux';
import { logicSelector } from './LogicInput';
import {
    allDungeonNames,
    allSilentRealmNames,
    createIsCheckBannedPredicate,
} from '../logic/Locations';
import ItemLocation from '../logic/ItemLocation';
import LogicHelper, { ReadableRequirement } from '../logic/LogicHelper';
import _ from 'lodash';
import BooleanExpression from '../logic/BooleanExpression';
import { inventorySelector } from './Inventory';
import { checkedChecksSelector } from './Locations';
import { discoveredDungeonEntrancesSelector, requiredDungeonsSelector } from './Dungeons';
import LogicTweaks from '../logic/LogicTweaks';

export type LogicalState = 'checked' | 'inLogic' | 'semiLogic' | 'outLogic';

export interface LocationState {
    staticLocation: ItemLocation;
    nonProgress: boolean;
    logicalState: LogicalState;
    inLogic: boolean;
    needs: ReadableRequirement[][];
}

export interface AreaState {
    numLocations: number;
    numLocationsInLogic: number;
    numRemainingLocations: number;

    locations: LocationState[];
    extraLocations: LocationState[];
}


export const settingsSelector = (state: RootState) => state.tracker.settings!;

/** The requirements that are patched in to access the past. */
const pastRequirementsSelector = createSelector(
    [settingsSelector, requiredDungeonsSelector],
    LogicTweaks.getPastRequirementsExpression,
);

const flatLocationsSelector = createSelector([logicSelector], (logic) =>
    logic
        .areas()
        .flatMap((area) => [
            ...Object.values(logic.locationsForArea(area)),
            ...logic.getExtraChecksForArea(area),
        ]),
);

/** Fake items that are patched in to support goddess cubes, dungeon entrance tracking and so on. */
const additionalItemsSelector = createSelector(
    [flatLocationsSelector, checkedChecksSelector, inventorySelector, discoveredDungeonEntrancesSelector],
    (flatLocations, checkedChecks, inventory, discoveredDungeonEntrances) => {
        const additionalItems: Record<string, number> = {};

        additionalItems['Gratitude Crystal'] = inventory['Gratitude Crystal Pack'] * 5;

        for (const location of flatLocations) {
            if (location.giveItemOnCheck) {
                additionalItems[location.giveItemOnCheck] ??= 0;
                if (checkedChecks.includes(location.id)) {
                    additionalItems[location.giveItemOnCheck] += 1;
                }
            }
        }

        for (const dungeon of [...allDungeonNames, ...allSilentRealmNames]) {
            additionalItems[`Entered ${dungeon}`] =
                discoveredDungeonEntrances.includes(dungeon) ? 1 : 0;
        }

        additionalItems['Sky Keep Completed'] = inventory['Triforce'] === 3 ? 1 : 0;

        return additionalItems;
    },
);

export const totalGratitudeCrystalsSelector = createSelector(
    [additionalItemsSelector],
    (additionalItems) => additionalItems['Gratitude Crystal'],
);

/** The effective macros that are used to parse the logical expressions. */
const allRequirementsSelector = createSelector(
    [logicSelector, pastRequirementsSelector],
    (logic, pastRequirements) => {
        const requirements = logic.requirements.clone();
        requirements.set(
            'Can Complete Required Dungeons',
            pastRequirements,
        );
        return requirements;
    },
);

const isCheckBannedSelector = createSelector(
    [settingsSelector, requiredDungeonsSelector],
    createIsCheckBannedPredicate,
);

/**
 * The parsed expressions, reduced to inventory and additional items. Any changes in input selectors
 * will result in a complete re-parsing of the location expressions, as macros may have changed.
 * 
 * This is somewhat expensive, so we calculate these results separately from logical state.
 */
const expandedExpressionsSelector = createSelector(
    [flatLocationsSelector, allRequirementsSelector, settingsSelector],
    (locations, allRequirements, settings) => {
        const result: Record<
            string,
            {
                expression: BooleanExpression;
                needs: ReadableRequirement[][];
            }
        > = {};
        LogicHelper.bindRequirements(allRequirements, settings);
        for (const loc of locations) {
            const booleanExpression =
                LogicHelper.booleanExpressionForRequirements(loc.logicSentence);
            const simplifiedExpression = booleanExpression.simplify(
                (firstRequirement, secondRequirement) =>
                    LogicHelper.requirementImplies(
                        firstRequirement,
                        secondRequirement,
                    ),
            );
            const evaluatedRequirements =
                LogicHelper.evaluatedRequirements(simplifiedExpression);
            const needs = LogicHelper.createReadableRequirements(
                evaluatedRequirements,
            );

            result[loc.id] = {
                expression: simplifiedExpression,
                needs,
            };
        }

        return result;
    },
);

/** Calculates logical state for all locations (does not return the `checked` state). */
export const logicalStateSelector = createSelector(
    [
        logicSelector,
        flatLocationsSelector,
        expandedExpressionsSelector,
        checkedChecksSelector,
        inventorySelector,
        additionalItemsSelector,
    ],
    (
        logic,
        locations,
        expandedExpressions,
        checkedChecks,
        inventory,
        additionalItems,
    ) => {
        const result: Record<string, LogicalState> = {};
        for (const location of locations) {
            result[location.id] = logic.areRequirementsMet(
                expandedExpressions[location.id].expression,
                inventory,
                additionalItems,
            )
                ? 'inLogic'
                : 'outLogic';
        }

        // Semilogic is fundamentally about looking at what is in logic, and assuming
        // that certain things that are in logic have been acquired.
        const assumedAdditionalItems = { ...additionalItems };
        for (const location of locations) {
            // Give all additional items from locations that are now in logic but haven't been checked yet
            if (result[location.id] === 'inLogic' && location.giveItemOnCheck && !checkedChecks.includes(location.id)) {
                assumedAdditionalItems[location.giveItemOnCheck] ??= 0;
                assumedAdditionalItems[location.giveItemOnCheck] += 1;
            }
        }
        // Now run the algorithm again for things that were previously out of logic.
        // If they're now in logic, they are semilogic.
        for (const location of locations) {
            if (
                result[location.id] === 'outLogic' &&
                logic.areRequirementsMet(
                    expandedExpressions[location.id].expression,
                    inventory,
                    assumedAdditionalItems,
                )
            ) {
                result[location.id] = 'semiLogic';
            }
        }

        return result;
    },
);

export const areasSelector = createSelector(
    [
        logicSelector,
        expandedExpressionsSelector,
        logicalStateSelector,
        checkedChecksSelector,
        isCheckBannedSelector,
    ],
    (
        logic,
        expandedExpressions,
        logicalState,
        checkedChecks,
        isCheckBanned,
    ) => {
        const result: { [area: string]: AreaState } = {};
        for (const areaName of logic.areas()) {
            const deriveLocation = (location: ItemLocation): LocationState => {
                const {
                    needs,
                } = expandedExpressions[location.id];

                return {
                    staticLocation: location,
                    nonProgress: Boolean(isCheckBanned(location)),
                    needs,
                    inLogic: logicalState[location.id] === 'inLogic',
                    logicalState: checkedChecks.includes(location.id)
                        ? 'checked'
                        : logicalState[location.id]
                };
            };
            const locations = Object.values(
                logic.locationsForArea(areaName),
            ).map(deriveLocation);
            const extraLocations = logic
                .getExtraChecksForArea(areaName)
                .map(deriveLocation);

            const progressLocations = locations.filter((l) => !l.nonProgress);
            const remainingLocations = progressLocations.filter(
                (l) => l.logicalState !== 'checked',
            );
            const numLocationsInLogic = remainingLocations.filter(
                (l) => l.inLogic,
            ).length;

            const area: AreaState = {
                locations,
                extraLocations,
                numLocations: progressLocations.length,
                numRemainingLocations: remainingLocations.length,
                numLocationsInLogic,
            };

            result[areaName] = area;
        }
        return result;
    },
);

export const areaSelector = currySelector(
    (state: RootState, area: string | undefined) =>
        area ? areasSelector(state)[area] : undefined,
);

export const totalCountersSelector = createSelector(
    [areasSelector],
    (areas) => {
        const areasList = Object.values(areas);
        const numChecked = _.sumBy(
            areasList,
            (a) => a.numLocations - a.numRemainingLocations,
        );
        const numAccessible = _.sumBy(areasList, (a) => a.numLocationsInLogic);
        const numRemaining = _.sumBy(areasList, (a) => a.numRemainingLocations);
        return {
            numChecked,
            numAccessible,
            numRemaining,
        };
    },
);

export const isRequirementMetSelector = createSelector(
    [logicSelector, inventorySelector, additionalItemsSelector],
    (logic, inventory, additionalItems) => (item: string) =>
        logic.isRequirementMet(item, inventory, additionalItems),
);

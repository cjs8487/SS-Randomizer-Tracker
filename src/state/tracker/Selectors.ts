import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import {
    getPastRequirementsExpression,
} from './AdditionalRequirements';
import { currySelector } from '../Utils';
import { InventoryItem, itemMaxes } from './Inventory';
import { logicSelector } from '../logic/Selectors';
import {
    allDungeonNames,
    allSilentRealmNames,
    createIsCheckBannedPredicate,
    dungeonCompletionRequirements,
    getNumLooseGratitudeCrystals,
} from '../../logic/Locations';
import { AreaState, LocationState, LogicalState } from './Types';
import ItemLocation from '../../logic/ItemLocation';
import LogicHelper, { ReadableRequirement } from '../../logic/LogicHelper';
import _ from 'lodash';
import BooleanExpression from '../../logic/BooleanExpression';

export const settingsSelector = (state: RootState) => state.tracker.settings!;
const rawInventorySelector = (state: RootState) => state.tracker.inventory;
const checkedChecksSelector = (state: RootState) => state.tracker.checkedChecks;

/** A map of all actual items to their counts. Since redux only stores partial counts, this ensures all items are present. */
const inventorySelector = createSelector(
    [rawInventorySelector],
    (rawInventory) =>
        _.mapValues(
            itemMaxes,
            (_val, item) => rawInventory[item as InventoryItem] ?? 0,
        ),
);

export const itemCountSelector = currySelector(
    (state: RootState, item: InventoryItem) => inventorySelector(state)[item],
);

const itemHintsSelector = (state: RootState) => state.tracker.checkHints;

export const checkItemHintSelector = currySelector(
    createSelector(
        [
            itemHintsSelector,
            (_state: RootState, locationKey: string) => locationKey,
        ],
        (itemHints, locationKey: string) => itemHints[locationKey],
    ),
);

const requiredDungeonsSelector = (state: RootState) =>
    state.tracker.requiredDungeons;

export const dungeonRequiredSelector = currySelector(
    createSelector(
        [
            requiredDungeonsSelector,
            (_state: RootState, dungeon: string) => dungeon,
        ],
        (requiredDungeons, dungeon: string) =>
            requiredDungeons.includes(dungeon),
    ),
);

const discoveredDungeonEntrancesSelector = (state: RootState) =>
    state.tracker.discoveredDungeonEntrances;

export const dungeonEntranceDiscoveredSelector = currySelector(
    createSelector(
        [
            discoveredDungeonEntrancesSelector,
            (_state: RootState, dungeon: string) => dungeon,
        ],
        (discoveredDungeonEntrances, dungeon: string) =>
            discoveredDungeonEntrances.includes(dungeon),
    ),
);

export const dungeonCompletedSelector = currySelector(
    createSelector(
        [
            checkedChecksSelector,
            (_state: RootState, dungeon: string) => dungeon,
        ],
        (checkedChecks, dungeon: string) =>
            Boolean(
                checkedChecks.some(
                    (check) => check === dungeonCompletionRequirements[dungeon],
                ),
            ),
    ),
);

export const totalGratitudeCrystalsSelector = createSelector(
    [
        logicSelector,
        checkedChecksSelector,
        itemCountSelector('Gratitude Crystal Pack'),
    ],
    (logic, checkedChecks, packCount) => {
        const looseCrystalCount = getNumLooseGratitudeCrystals(
            logic,
            checkedChecks,
        );
        return packCount * 5 + looseCrystalCount;
    },
);

/** The requirements that are patched in to access the past. */
const pastRequirementsSelector = createSelector(
    [settingsSelector, requiredDungeonsSelector],
    getPastRequirementsExpression,
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
    [logicSelector, flatLocationsSelector, checkedChecksSelector, inventorySelector, totalGratitudeCrystalsSelector, discoveredDungeonEntrancesSelector],
    (logic, flatLocations, checkedChecks, inventory, totalGratitudeCrystals, discoveredDungeonEntrances) => {
        const additionalItems: Record<string, number> = {};

        for (const location of flatLocations) {
            if (location.giveItemOnCheck) {
                additionalItems[location.giveItemOnCheck] =
                    checkedChecks.includes(location.id) ? 1 : 0;
            }
        }

        for (const dungeon of [...allDungeonNames, ...allSilentRealmNames]) {
            additionalItems[`Entered ${dungeon}`] =
                discoveredDungeonEntrances.includes(dungeon) ? 1 : 0;
        }

        additionalItems['Sky Keep Completed'] = inventory['Triforce'] === 3 ? 1 : 0;

        for (const [cubeName, ] of Object.entries(logic.cubeList)) {
            additionalItems[cubeName] = checkedChecks.includes(cubeName) ? 1 : 0;
        }

        additionalItems['Gratitude Crystal'] = totalGratitudeCrystals;

        return additionalItems;
    },
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
        let looseCrystals = 0;
        for (const location of locations) {
            // A cube or dungeon completion is assumed acquired if it's in logic.
            if (result[location.id] === 'inLogic' && location.giveItemOnCheck) {
                assumedAdditionalItems[location.giveItemOnCheck] = 1;
            }

            // We also count the number of gratitude crystals that are checked or in logic for Batreaux semilogic.
            if (
                location.isLooseGratitudeCrystal &&
                (checkedChecks.includes(location.id) ||
                    result[location.id] === 'inLogic')
            ) {
                looseCrystals += 1;
            }
        }
        assumedAdditionalItems['Gratitude Crystal'] =
            inventory['Gratitude Crystal Pack'] * 5 + looseCrystals;

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

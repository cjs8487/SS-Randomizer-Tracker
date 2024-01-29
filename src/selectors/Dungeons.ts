import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/Store';
import { currySelector } from '../utils/Redux';
import { checkedChecksSelector } from './Locations';
import { dungeonCompletionRequirements } from '../logic/Locations';
import { settingsSelector } from './Settings';
import { inventorySelector } from './Inventory';

export const skyKeepShownSelector = (state: RootState) => {
    const settings = settingsSelector(state);
    if (!settings.getOption('Empty Unrequired Dungeons')) {
        return true;
    }

    return skyKeepRequiredSelector(state);
};

const skyKeepRequiredSelector = (state: RootState) => {
    const settings = settingsSelector(state);

    if (!settings.getOption('Triforce Required')) {
        return false;
    }
    return settings.getOption('Triforce Shuffle') !== 'Anywhere';
};

export const requiredDungeonsSelector = createSelector(
    [
        (state: RootState) => state.tracker.requiredDungeons,
        skyKeepRequiredSelector,
    ],
    (selectedRequiredDungeons, skyKeepRequired) => {
        return skyKeepRequired
            ? [...selectedRequiredDungeons, 'Sky Keep']
            : selectedRequiredDungeons;
    },
);


export const dungeonRequiredSelector = currySelector(
    (state: RootState, dungeon: string) =>
        requiredDungeonsSelector(state).includes(dungeon),
);

export const discoveredDungeonEntrancesSelector = (state: RootState) =>
    state.tracker.discoveredDungeonEntrances;

export const dungeonEntranceDiscoveredSelector = currySelector(
    (state: RootState, dungeon: string) =>
        discoveredDungeonEntrancesSelector(state).includes(dungeon),
);

export const dungeonCompletedSelector = currySelector(
    createSelector(
        [
            checkedChecksSelector,
            inventorySelector,
            settingsSelector,
            (_state: RootState, dungeon: string) => dungeon,
        ],
        (checkedChecks, inventory, settings, dungeon: string) =>
            dungeon !== 'Sky Keep'
                ? Boolean(
                    checkedChecks.some(
                        (check) =>
                            check === dungeonCompletionRequirements[dungeon],
                    ),
                )
                : settings.getOption('Triforce Shuffle') !== 'Anywhere' && inventory['Triforce'] === 3,
    ),
);

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/Store';
import { currySelector } from '../utils/Redux';
import { checkedChecksSelector } from './Locations';
import { dungeonCompletionRequirements } from '../logic/Locations';
import { settingsSelector } from './Settings';
import { inventorySelector } from './Inventory';

export const skyKeepShownSelector = (state: RootState) => {
    const settings = settingsSelector(state);
    if (!settings['empty-unrequired-dungeons']) {
        return true;
    }

    return skyKeepRequiredSelector(state);
};

const skyKeepRequiredSelector = (state: RootState) => {
    const settings = settingsSelector(state);

    if (!settings['triforce-required']) {
        return false;
    }
    return settings['triforce-shuffle'] !== 'Anywhere';
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
        (checkedChecks, inventory, settings, dungeon: string) => {
            if (dungeon === 'Sky Keep') {
                // Sky Keep is shown as "completed" if it contains the Triforces
                // and you found them all.
                return (
                    settings['triforce-shuffle'] !== 'Anywhere' &&
                    inventory['Triforce'] === 3
                );
            } else {
                // Otherwise you need to have the specific completion requirement,
                // e.g. "Strike Crest"
                const requirement = dungeonCompletionRequirements[dungeon];
                return Boolean(
                    requirement && checkedChecks.includes(requirement),
                );
            }
        }
    ),
);

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/Store';
import { currySelector } from '../utils/Redux';
import { checkedChecksSelector } from './Locations';
import { dungeonCompletionRequirements } from '../logic/Locations';

export const requiredDungeonsSelector = (state: RootState) =>
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

export const discoveredDungeonEntrancesSelector = (state: RootState) =>
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

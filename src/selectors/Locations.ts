import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/Store';
import { currySelector } from '../utils/Redux';

export const checkedChecksSelector = (state: RootState) =>
    state.tracker.checkedChecks;

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

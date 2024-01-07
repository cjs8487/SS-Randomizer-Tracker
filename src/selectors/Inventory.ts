import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/Store';
import { currySelector } from '../utils/Redux';
import _ from 'lodash';
import { InventoryItem, itemMaxes } from '../logic/Inventory';

const rawInventorySelector = (state: RootState) => state.tracker.inventory;

/** A map of all actual items to their counts. Since redux only stores partial counts, this ensures all items are present. */
export const inventorySelector = createSelector(
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
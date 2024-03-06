import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Settings from '../permalink/Settings';
import { InventoryItem, isItem, itemMaxes, getInitialItems } from '../logic/Inventory';

export interface TrackerState {
    /** Checks we've acquired. */
    checkedChecks: string[];
    /** Items we've marked as acquired. */
    inventory: Partial<Record<InventoryItem, number>>;
    /** Dungeons we've marked as required. */
    requiredDungeons: string[];
    /** Dungeons we've marked as "discovered". Will be replaced by entrance tracker. */
    discoveredDungeonEntrances: string[];
    /** Item hints by check name */
    checkHints: Record<string, string | undefined>;
    /** Fully decoded settings. */
    settings: Settings | undefined;
}

const initialState: TrackerState = {
    checkedChecks: [],
    inventory: {},
    requiredDungeons: [],
    discoveredDungeonEntrances: [],
    checkHints: {},
    settings: undefined,
};

const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        clickItem: (
            state,
            action: PayloadAction<{ item: InventoryItem; take: boolean }>,
        ) => {
            const { item, take } = action.payload;
            if (!isItem(item)) {
                throw new Error(`bad item ${item as string}`);
            }
            if (item === 'Sailcloth') {
                return;
            }

            const max = itemMaxes[item];
            const count = state.inventory[item] ?? 0;
            let newCount = take ? count - 1 : count + 1;
            if (newCount < 0) {
                newCount += max + 1;
            } else if (newCount > max) {
                newCount -= max + 1;
            }
            state.inventory[item] = newCount;
        },
        clickCheck: (
            state,
            action: PayloadAction<{ checkId: string; markChecked?: boolean }>,
        ) => {
            const { checkId, markChecked } = action.payload;
            const add = markChecked ?? !state.checkedChecks.includes(checkId);
            if (add) {
                state.checkedChecks.push(checkId);
            } else {
                state.checkedChecks = state.checkedChecks.filter(
                    (check) => check !== checkId,
                );
            }
        },
        clickDungeonName: (
            state,
            action: PayloadAction<{ dungeonName: string }>,
        ) => {
            const { dungeonName } = action.payload;
            if (state.requiredDungeons.includes(dungeonName)) {
                state.requiredDungeons = state.requiredDungeons.filter((c) => c !== dungeonName);
            } else {
                state.requiredDungeons.push(dungeonName);
            }
        },
        clickDungeonEntranceMarker: (
            state,
            action: PayloadAction<{ dungeonName: string }>,
        ) => {
            const { dungeonName } = action.payload;
            if (state.discoveredDungeonEntrances.includes(dungeonName)) {
                state.discoveredDungeonEntrances = state.discoveredDungeonEntrances.filter((c) => c !== dungeonName);
            } else {
                state.discoveredDungeonEntrances.push(dungeonName);
            }
        },
        bulkEditChecks: (
            state,
            action: PayloadAction<{ checkIds: string[]; markChecked: boolean }>,
        ) => {
            const { checkIds, markChecked } = action.payload;
            const oldChecks = new Set(state.checkedChecks);
            if (markChecked) {
                for (const check of checkIds) {
                    oldChecks.add(check);
                }
            } else {
                for (const check of checkIds) {
                    oldChecks.delete(check);
                }
            }
            state.checkedChecks = [...oldChecks];
        },
        setCheckHint: (
            state,
            action: PayloadAction<{
                checkId: string;
                hint: string | undefined;
            }>,
        ) => {
            const { checkId, hint } = action.payload;
            state.checkHints[checkId] = hint;
        },
        reset: (
            state,
            action: PayloadAction<{ settings: Settings | undefined }>,
        ) => {
            const { settings } = action.payload;
            const effectiveSettings = settings ?? state.settings;
            return {
                ...initialState,
                settings: effectiveSettings,
                inventory: effectiveSettings ? getInitialItems(effectiveSettings) : {},
            }
        },
        loadTracker: (
            _state,
            action: PayloadAction<TrackerState>,
        ) => {
            return action.payload;
        },
    },
});

export const { clickItem, clickCheck, clickDungeonName, clickDungeonEntranceMarker, bulkEditChecks, setCheckHint, reset, loadTracker } = trackerSlice.actions;

export default trackerSlice.reducer;

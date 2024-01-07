import Logic from '../logic/Logic';
import { Option } from '../permalink/SettingsTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * The tracker logic. Logic is static data that is immutable after we've updated it at startup with the options.
 * This contains either only an error that occured during the initial load, or the successfully
 * loaded and parsed logic.
 */
export interface LogicState {
    // TODO: This logic is modified at startup with loaded settings.
    // Instead, the requirements should be derived in a selector
    logic: Logic | undefined;
    /** The raw option definitions. */
    options: Option[] | undefined;
    /** The ssrando branch/tag we have loaded our files from. */
    source: string | undefined;
    /** The error that occured in loading, if any. */
    error: unknown | undefined;
}

const initialState: LogicState = {
    logic: undefined,
    options: undefined,
    source: undefined,
    error: undefined,
}

const logicSlice = createSlice({
    name: 'logic',
    initialState,
    reducers: {
        loadLogic: (state, action: PayloadAction<{ logic: Logic, options: Option[], source: string }>) => {
            const { logic, options, source } = action.payload;
            state.logic = logic;
            state.options = options;
            state.source = source;
            state.error = undefined;
        },
        setLoadingError: (state, action: PayloadAction<{ error: unknown }>) => {
            const { error } = action.payload;
            if (!state.logic) {
                state.error = error;
            }
        },
    },
});

export const { loadLogic, setLoadingError } = logicSlice.actions;

export default logicSlice.reducer;

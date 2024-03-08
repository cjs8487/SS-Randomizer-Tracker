import { RootState } from '../state/Store';

/** Whether logic has been loaded. */
export const isLogicLoadedSelector = (state: RootState) =>
    Boolean(state.logic.logic);

/** The loaded and parsed logic. Only use this if you know that logic has been loaded. */
export const logicSelector = (state: RootState) => state.logic.logic!;

/** The static option definitions. Only use this if you know that options have been loaded. */
export const optionsSelector = (state: RootState) => state.logic.options!;

/** The error that occurred during loading, if any. */
export const loadingErrorSelector = (state: RootState) => state.logic.error;

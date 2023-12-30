import { RootState } from '../Store';

export const isLogicLoadedSelector = (state: RootState) =>
    Boolean(state.logic.logic);

export const logicSelector = (state: RootState) => state.logic.logic!;

export const loadingErrorSelector = (state: RootState) => state.logic.error;

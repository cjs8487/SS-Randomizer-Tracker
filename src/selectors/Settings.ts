import { RootState } from '../state/Store';

// TODO: Selector for single setting, once settings are reactive
// TODO: Validate stored settings values by filling in missing values, once settings are reactive

export const settingsSelector = (state: RootState) => state.tracker.settings!;

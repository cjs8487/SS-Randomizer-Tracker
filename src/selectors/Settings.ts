import { createSelector } from '@reduxjs/toolkit';
import { validateSettings } from '../permalink/Settings';
import { RootState } from '../state/Store';
import { optionsSelector } from './LogicInput';
import { currySelector } from '../utils/Redux';
import { Settings } from '../permalink/SettingsTypes';

/** Selects all settings, even the ones not logically relevant. */
export const settingsSelector = createSelector(
    [optionsSelector, (state: RootState) => state.tracker.settings ?? {}],
    validateSettings,
);

/** Selects a particular settings value. */
export const settingSelector: <K extends keyof Settings>(
    setting: K,
) => (state: RootState) => Settings[K] = currySelector(
    <K extends keyof Settings>(
        state: RootState,
        setting: K,
    ): Settings[K] => settingsSelector(state)[setting],
);
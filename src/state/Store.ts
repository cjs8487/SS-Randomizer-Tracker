import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import tracker from './tracker/Slice';
import logic from './logic/Slice';

export const store = configureStore({
    reducer: {
        logic,
        tracker,
    },
    // FIXME: Make logic and settings dumb objects
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['tracker/acceptSettings', 'logic/loadLogic'],
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                ignoredPaths: ['logic.logic', 'tracker.settings'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkResult<R = void> = ThunkAction<
    Promise<R>,
    RootState,
    undefined,
    Parameters<AppDispatch>[0]
>;

import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLogic, setLoadingError } from './state/Logic';
import { acceptSettings } from './state/Tracker';
import {
    isLogicLoadedSelector,
    loadingErrorSelector,
} from './selectors/LogicInput';
import Settings from './permalink/Settings';
import Logic from './logic/Logic';
import Tracker from './Tracker';

export default function TrackerContainer() {
    const dispatch = useDispatch();
    const [loadingSource, setLoadingSource] = useState<string | undefined>();

    const load = useCallback(
        async (source: string) => {
            setLoadingSource(source);
            try {
                const settings = new Settings();
                await settings.init(source);
                const path = new URLSearchParams(window.location.search);
                const permalink = decodeURIComponent(path.get('options')!);
                settings.updateFromPermalink(permalink);
                const logic = new Logic();
                await logic.initialize(settings, source);
                dispatch(acceptSettings({ settings, initialLoad: true }));
                dispatch(
                    loadLogic({ logic, options: settings.allOptions, source }),
                );
            } catch (e) {
                dispatch(setLoadingError({ error: e && typeof e === 'object' && 'message' in e ? e.message as string : JSON.stringify(e) }));
            } finally {
                setLoadingSource(undefined);
            }
        },
        [dispatch],
    );

    useEffect(() => {
        const path = new URLSearchParams(window.location.search);
        const source = path.get('source')!;
        load(source);
    }, [load]);

    const isLogicLoaded = useSelector(isLogicLoadedSelector);
    const loadingError = useSelector(loadingErrorSelector);

    if (!isLogicLoaded) {
        return (
            <>
                {loadingError ? (
                    loadingError
                ) : (
                    <>Loading {loadingSource ?? ''}...</>
                )}
            </>
        );
    }

    return <Tracker />;
}

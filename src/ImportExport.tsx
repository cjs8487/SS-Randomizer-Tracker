import { ChangeEvent } from 'react';
import { TrackerState, loadTracker } from './state/Tracker';
import { defaultSettings } from './permalink/Settings';
import Logic from './logic/Logic';
import { AppDispatch, RootState } from './state/Store';
import { loadLogic } from './state/Logic';
import { useDispatch, useSelector } from 'react-redux';
import LogicLoader from './logic/LogicLoader';

export interface ExportState {
    state: TrackerState;
    source: string;
}


async function importState(importedState: ExportState, dispatch: AppDispatch) {
    const source = importedState.source
    if (!source) {
        alert('invalid source');
        return;
    }
    const { rawLogic, options } = await LogicLoader.loadLogicFiles(source);

    importedState.state.settings ??= defaultSettings(options);

    const logic = new Logic(rawLogic, importedState.state.settings);
    const state = importedState.state;

    dispatch(loadTracker(state));
    dispatch(loadLogic({ logic, options, source }));
}

export default function ImportExport() {
    const state = useSelector((state: RootState) => state.tracker);
    const source = useSelector((state: RootState) => state.logic.source!);
    const exportState = {
        state,
        source,
    };
    const dispatch = useDispatch();

    const doImport = (text: string) => importState(JSON.parse(text) as ExportState, dispatch);
    const doExport = () => {
        const filename = `SS-Rando-Tracker${Date()}`;
        const exportstring = JSON.stringify(exportState, undefined, '\t');
        const blob = new Blob([exportstring], { type: 'json' });
        const e = document.createEvent('MouseEvents'); const
            a = document.createElement('a');
        a.download = `${filename}.json`;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['json', a.download, a.href].join(':');
        e.initEvent('click');
        a.dispatchEvent(e);
    };


    const readFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            if (!e.target?.result) {
                return;
            }
            doImport(e.target.result.toString())
        };
    }

    return (
        <div id="ImportExport">
            <button type="button" onClick={doExport}>Export Tracker</button>
            <input id="fileInput" type="file" accept=".json" onChange={readFile} />
        </div>
    );
}

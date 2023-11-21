import { ChangeEvent } from 'react';
import Logic from './logic/Logic';
import ColorScheme from './customization/ColorScheme';
import Settings from './permalink/Settings';
import { Layout } from './customization/CustomizationModal';

export interface ExportState {
    logic: Logic;
    settings: Settings;
    colorScheme: ColorScheme;
    layout: Layout;
    source: string;
}

export default function ImportExport({ state, importFunc }: {
    state: ExportState,
    importFunc: (newState: ExportState) => void
}) {

    if (!state.settings || !state.logic) {
        return null;
    }

    const doImport = (text: string) => importFunc(JSON.parse(text));
    const doExport = () => {
        const filename = `SS-Rando-Tracker${Date()}`;
        const exportstring = JSON.stringify(state, undefined, '\t');
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

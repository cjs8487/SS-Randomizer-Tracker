import React from 'react';
import Button from 'react-bootstrap/cjs/Button';
import Modal from 'react-bootstrap/cjs/Modal';

export default class ImportExport extends React.Component {
    constructor(props) {
        super(props);
        this.export = this.export.bind(this);
        this.readFile = this.readFile.bind(this);
    }

    render() {
        return (
            <div id="ImportExport">
                <button variant="primary" onClick={this.export}>Export Tracker</button>
                <input id="fileInput" ref="fileInput" type="file" accept=".json" onChange={this.readFile} />
            </div>
        );
    }

    /*
    Initiates a download with the exported state, don't ask how it works, it simply does (hopefully)
     */
    export() {
        const filename = `SS-Rando-Tracker${Date()}`;
        const exportstring = JSON.stringify(this.props.state, undefined, '\t');
        const blob = new Blob([exportstring], { type: 'json' });
        const e = document.createEvent('MouseEvents'); const
            a = document.createElement('a');
        a.download = `${filename}.json`;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['json', a.download, a.href].join(':');
        e.initEvent('click');
        a.dispatchEvent(e);
    }

    import(text) {
        const state = JSON.parse(text);
        this.props.importFunction(state);
    }

    readFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            if (!e.target) {
                return;
            }
            this.import(e.target.result.toString());
        };
    }
}

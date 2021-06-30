import React from 'react';
import PropTypes from 'prop-types';
import Logic from './logic/Logic';
import ColorScheme from './customization/ColorScheme';

class ImportExport extends React.Component {
    constructor(props) {
        super(props);
        this.export = this.export.bind(this);
        this.readFile = this.readFile.bind(this);
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

    render() {
        return (
            <div id="ImportExport">
                <button type="button" onClick={this.export}>Export Tracker</button>
                <input id="fileInput" type="file" accept=".json" onChange={this.readFile} />
            </div>
        );
    }
}

ImportExport.propTypes = {
    importFunction: PropTypes.func.isRequired,
    state: PropTypes.shape({
        options: PropTypes.shape({
            bannedLocations: PropTypes.arrayOf(PropTypes.string),
            entrancesRandomized: PropTypes.string,
            swordless: PropTypes.bool,
            'closed-thunderhead': PropTypes.bool,
            startingTablets: PropTypes.number,
            raceMode: PropTypes.bool,
            skipSkykeep: PropTypes.bool,
            'hero-mode': PropTypes.bool,
            startPouch: PropTypes.bool,
        }),
        width: PropTypes.number,
        height: PropTypes.number,
        showCustomizationDialog: PropTypes.bool,
        colorScheme: PropTypes.instanceOf(ColorScheme),
        logic: PropTypes.instanceOf(Logic),
    }).isRequired,
};

export default ImportExport;

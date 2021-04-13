import _ from 'lodash';
import yaml from 'js-yaml';
import PackedBitsWriter from './PackedBitsWriter';
import PackedBitsReader from './PackedBitsReader';

class Settings {
    async init() {
        this.options = {};
        this.allOptions = {};
        await this.loadSettingsFromRepo();
    }

    updateFromPermaLink(permalink) {
        console.log(this.allOptions);
        console.log('updating settings from permalink');
        const reader = PackedBitsReader.fromBase64(permalink);
        _.forEach(this.allOptions, (option) => {
            if (option.permalink !== false) {
                if (option.type === 'boolean') {
                    this.setOption(option.name, reader.read(1));
                } else if (option.type === 'int') {
                    this.setOption(option.name, reader.read(option.bits));
                } else if (option.type === 'multichoice') {
                    const values = [];
                    _.forEach(option.choices, (choice) => {
                        // console.log(`reading one bit for ${choice}`);
                        if (reader.read(1)) {
                            values.push(choice);
                        }
                    });
                    this.setOption(option.name, values);
                } else if (option.type === 'singlechoice') {
                    this.setOption(option.name, option.choices[reader.read(option.bits)]);
                }
            }
        });
    }

    generatePermalink() {
        const writer = new PackedBitsWriter();
        _.forEach(this.allOptions, (option) => {
            if (option.permalink !== false) {
                if (option.type === 'boolean') {
                    writer.write(this.getOption(option.name), 1);
                } else if (option.type === 'int') {
                    writer.write(this.getOption(option.name), option.bits);
                } else if (option.type === 'multichoice') {
                    const values = this.getOption(option.name);
                    _.forEach(option.choices, (choice) => {
                        writer.write(values.includes(choice), 1);
                    });
                } else if (option.type === 'singlechoice') {
                    writer.write(option.choices.indexOf(this.getOption(option.name)), option.bits);
                } else {
                    throw Error(`invalid type ${option.type}`);
                }
            }
        });
        writer.flush();
        return writer.toBase64();
    }

    setOption(option, value) {
        console.log(`Setting option ${option} to ${value}`);
        _.set(this.options, Settings.convertOptionKey(option), value);
    }

    getOption(option) {
        return _.get(this.options, Settings.convertOptionKey(option));
    }

    static convertOptionKey(option) {
        return _.camelCase(option);
    }

    async loadSettingsFromRepo() {
        const response = await fetch('https://raw.githubusercontent.com/lepelog/sslib/master/options.yaml');
        const text = await response.text();
        this.allOptions = yaml.safeLoad(text);
        console.log('settings loaded from repo');
    }
}

export default Settings;

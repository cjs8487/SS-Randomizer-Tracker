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

    updateFromPermalink(permalink) {
        const reader = PackedBitsReader.fromBase64(permalink);
        _.forEach(this.allOptions, (option) => {
            if (option.permalink !== false) {
                if (option.type === 'boolean') {
                    this.setOption(option.name, reader.read(1) === 1);
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
                    writer.write(this.getOption(option.name) ? 1 : 0, 1);
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
        _.set(this.options, Settings.convertOptionKey(option), value);
    }

    getOption(option) {
        return _.get(this.options, Settings.convertOptionKey(option));
    }

    toggleOption(option) {
        this.setOption(option, !this.getOption(option));
    }

    toggleBannedType(type) {
        if (this.options.bannedTypes.includes(type)) {
            // unban the type
            this.options.bannedTypes.splice(this.options.bannedTypes.indexOf(type), 1);
        } else {
            // ban the type
            this.options.bannedTypes.push(type);
        }
    }

    static convertOptionKey(option) {
        return _.camelCase(option);
    }

    async loadSettingsFromRepo() {
        const response = await fetch('https://raw.githubusercontent.com/lepelog/sslib/master/options.yaml');
        const text = await response.text();
        this.allOptions = yaml.safeLoad(text);
    }
}

export default Settings;

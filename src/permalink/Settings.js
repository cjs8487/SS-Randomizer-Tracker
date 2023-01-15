import _ from 'lodash';
import yaml from 'js-yaml';
import PackedBitsWriter from './PackedBitsWriter';
import PackedBitsReader from './PackedBitsReader';
import LogicLoader from '../logic/LogicLoader';

class Settings {
    async init() {
        this.options = {};
        this.allOptions = {};
        await this.loadSettingsFromRepo();
        this.allLocations = await LogicLoader.loadNewLogicChecks();
    }

    loadFrom(settings) {
        this.options = settings.options;
        this.allOptions = settings.allOptions;
    }

    updateFromPermalink(permalink) {
        const PERMA_WITH_SEED_RE = /^[0-9a-zA-Z=]+[#][0-9]+/g;
        const PERMA_NO_SEED_RE = /^[0-9a-zA-Z=]+/g;
        let permaNoSeed = permalink;
        if (PERMA_WITH_SEED_RE.test(permalink)) {
            const match = PERMA_NO_SEED_RE.exec(permalink);
            // eslint-disable-next-line prefer-destructuring
            permaNoSeed = match[0];
        }
        const reader = PackedBitsReader.fromBase64(permaNoSeed);
        _.forEach(this.allOptions, (option) => {
            if (option.permalink !== false) {
                if (option.type === 'boolean') {
                    this.setOption(option.name, reader.read(1) === 1);
                } else if (option.type === 'int') {
                    this.setOption(option.name, reader.read(option.bits));
                } else if (option.name === 'Excluded Locations') {
                    const values = [];
                    _.forEach(this.allLocations, (data, name) => {
                        // console.log(`reading one bit for ${name}`);
                        if (reader.read(1)) {
                            values.push(name);
                        }
                    });
                    this.setOption(option.name, values);
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
                } else if (option.name === 'Excluded Locations') {
                    const values = this.getOption(option.name);
                    _.forEach(this.allLocations, (data, name) => {
                        writer.write(values.includes(name), 1);
                    });
                } else if (option.type === 'multichoice') {
                    const values = [...this.getOption(option.name)];
                    // console.log(values);
                    // console.log(option.name);
                    _.forEach(option.choices, (choice) => {
                        writer.write(values.includes(choice), 1);
                        // ensure the items are included the correct number of times
                        if (values.includes(choice) & option.name === 'Starting Items') {
                            values.splice(values.indexOf(choice), 1);
                        }
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
        // return 'EV1oGQkpAAAAAAAAAEgCGIA+KAXuIQDs/6/AfQAAAAIAAAAAAAAAAgAAAAAAAAAAAAAAABogAGAAAAEAAAAAEAA=';
    }

    setOption(option, value) {
        _.set(this.options, Settings.convertOptionKey(option), value);
    }

    getOption(option) {
        const optionKey = Settings.convertOptionKey(option);
        if (optionKey === 'enabledTricks') {
            const bitlessTricks = this.getOption('Enabled Tricks BiTless');
            if (bitlessTricks.length > 0) {
                return bitlessTricks;
            }
            const glitchedTricks = this.getOption('Enabled Tricks Glitched');
            if (glitchedTricks.length > 0) {
                return glitchedTricks;
            }
            // there are no enabled tricks so we can just return an empty array
            return [];
        }
        return _.get(this.options, Settings.convertOptionKey(option));
    }

    loadDefaults() {
        _.forEach(this.allOptions, (option) => {
            this.setOption(option.name, option.default);
        });
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
        const response = await fetch('https://raw.githubusercontent.com/ssrando/ssrando/master/options.yaml');
        const text = await response.text();
        this.allOptions = yaml.load(text);
    }
}

export default Settings;

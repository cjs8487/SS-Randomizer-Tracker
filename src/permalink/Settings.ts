import _ from 'lodash';
import yaml from 'js-yaml';
import PackedBitsWriter from './PackedBitsWriter';
import PackedBitsReader from './PackedBitsReader';
import LogicLoader from '../logic/LogicLoader';
import { RawLocations } from '../logic/UpstreamTypes';
import { OptionValue, MultiChoiceOption, Option, RawOptions } from './SettingsTypes';

class Settings {
    options: Record<string, OptionValue> = {};
    allOptions: Option[] = [];

    async init(source: string) {
        this.options = {};
        this.allOptions = [];
        await this.loadSettingsFromRepo(source);
    }

    loadFrom(settings: Settings) {
        this.options = settings.options;
        this.allOptions = settings.allOptions;
    }

    updateFromPermalink(permalink: string) {
        const permaNoSeed = permalink.split('#')[0];
        const reader = PackedBitsReader.fromBase64(permaNoSeed);
        _.forEach(this.allOptions, (option) => {
            if (option.permalink !== false) {
                if (option.type === 'boolean') {
                    this.setOption(option.name, reader.read(1) === 1);
                } else if (option.type === 'int') {
                    this.setOption(option.name, reader.read(option.bits));
                } else if (option.type === 'multichoice') {
                    const values: string[] = [];
                    _.forEach(option.choices, (choice) => {
                        // console.log(`reading one bit for ${choice}`);
                        if (reader.read(1)) {
                            values.push(choice);
                        }
                    });
                    this.setOption(option.name, values);
                } else if (option.type === 'singlechoice') {
                    this.setOption(
                        option.name,
                        option.choices[reader.read(option.bits)],
                    );
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
                    writer.write(
                        this.getOption(option.name) as number,
                        option.bits,
                    );
                } else if (option.type === 'multichoice') {
                    const values = [
                        ...(this.getOption(option.name) as string[]),
                    ];
                    _.forEach(option.choices, (choice) => {
                        writer.write(values.includes(choice) ? 1 : 0, 1);
                        // ensure the items are included the correct number of times
                        if (
                            values.includes(choice) &&
                            option.name === 'Starting Items'
                        ) {
                            values.splice(values.indexOf(choice), 1);
                        }
                    });
                } else if (option.type === 'singlechoice') {
                    writer.write(
                        option.choices.indexOf(
                            this.getOption(option.name) as string,
                        ),
                        option.bits,
                    );
                }
            }
        });
        writer.flush();
        return writer.toBase64();
    }

    setOption<K extends keyof RawOptions>(option: K, value: RawOptions[K]) {
        _.set(this.options, Settings.convertOptionKey(option), value);
    }

    getOption<K extends keyof RawOptions>(option: K): RawOptions[K] {
        const optionKey = Settings.convertOptionKey(option);
        if (optionKey === 'enabledTricks') {
            const bitlessTricks = this.getOption(
                'Enabled Tricks BiTless',
            );
            if (bitlessTricks.length > 0) {
                return bitlessTricks as RawOptions[K];
            }
            const glitchedTricks = this.getOption(
                'Enabled Tricks Glitched',
            );
            if (glitchedTricks.length > 0) {
                return glitchedTricks as RawOptions[K];
            }
            // there are no enabled tricks so we can just return an empty array
            return [] as string[] as RawOptions[K];
        }
        return _.get(this.options, Settings.convertOptionKey(option)) as RawOptions[K];
    }

    loadDefaults() {
        _.forEach(this.allOptions, (option) => {
            this.setOption(option.name, option.default);
        });
    }

    toggleOption(option: keyof RawOptions) {
        this.setOption(option, !this.getOption(option));
    }

    static convertOptionKey(option: string) {
        return _.camelCase(option);
    }

    async loadSettingsFromRepo(branch: string) {
        const response = await fetch(
            `https://raw.githubusercontent.com/ssrando/ssrando/${branch}/options.yaml`,
        );
        const text = await response.text();
        this.allOptions = (await yaml.load(text)) as Option[];
        // correctly load the choices for excluded locations
        const excludedLocsIndex = this.allOptions.findIndex(
            (x) => x.name === 'Excluded Locations',
        );
        const checks = (await LogicLoader.loadLogicFile<RawLocations>(
            'checks.yaml',
            branch,
        ));
        (this.allOptions[excludedLocsIndex] as MultiChoiceOption).choices = [];
        _.forEach(checks, (_data, location) => {
            (
                this.allOptions[excludedLocsIndex] as MultiChoiceOption
            ).choices.push(location);
        });
    }
}

export default Settings;

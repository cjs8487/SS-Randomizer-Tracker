import { GeneratedSettings } from "./GeneratedSettings";

export type OptionsCommand = keyof Settings;

export type BaseOption = {
    permalink: boolean;
    name: string;
    command: OptionsCommand;
};

export type BooleanOption = BaseOption & {
    type: 'boolean';
    default: boolean;
};

export type SingleChoiceOption = BaseOption & {
    type: 'singlechoice';
    choices: string[];
    bits: number;
    default: string;
};

export type MultiChoiceOption = BaseOption & {
    type: 'multichoice';
    choices: string[];
    default: string[];
};

export type IntOption = BaseOption & {
    type: 'int';
    bits: number;
    default: number;
    min: number;
    max: number;
};

export type Option =
    | BooleanOption
    | SingleChoiceOption
    | MultiChoiceOption
    | IntOption;

export type OptionValue = string | string[] | number | boolean;
export type OptionType = Option['type'];

export interface Settings
    extends Omit<GeneratedSettings, 'shopsanity' | 'randomize-entrances'> {
    // Bizzare Bazaar splits Shopsanity into three settings
    // https://github.com/ssrando/ssrando/pull/442
    shopsanity: GeneratedSettings['shopsanity'] | undefined;
    'beedle-shopsanity': boolean | undefined;
    'rupin-shopsanity': boolean | undefined;
    'luv-shopsanity': boolean | undefined;

    // ER renames randomize-entrances -> randomize-dungeon-entrances
    // https://github.com/ssrando/ssrando/pull/497
    'randomize-entrances': GeneratedSettings['randomize-entrances'] | 'All' | 'Vanilla',
    'randomize-dungeon-entrances': GeneratedSettings['randomize-entrances'] | undefined,
}

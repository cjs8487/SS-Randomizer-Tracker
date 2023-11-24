export type RawLocation = {
    'original item': string,
    type: string,
};

export type RawLocations = Record<string, RawLocation>;
export type RawHints = Record<string, unknown>;
export type RawRequirements = Record<string, string>;
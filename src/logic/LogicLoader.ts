import yaml from 'js-yaml';

export type RequirementsList = {
    [name: string]: string
}

type FileLocation = {
    Paths: string[];
    'original item': string;
    type: string;
}

export type LocationList = {
    [name: string]: FileLocation
};

type HintStoneList = string[]

export type LogicFiles = {
    requirements: RequirementsList;
    locations: LocationList;
    hints: HintStoneList;
}

const logicFileUrl = (file: string) => `https://raw.githubusercontent.com/ssrando/ssrando/master/${file}`;

const loadFileFromUrl = async (url: string) => {
    const response = await fetch(url);
    return response.text();
};

const loadLogicFile = async (file: string): Promise<RequirementsList> => {
    const fileUrl = logicFileUrl(file);
    const data = await loadFileFromUrl(fileUrl);
    return yaml.load(data) as RequirementsList;
};

export const loadLocationsFile = async (): Promise<LocationList> => {
    const fileUrl = logicFileUrl('checks.yaml');
    const data = await loadFileFromUrl(fileUrl);
    return yaml.load(data) as LocationList;
};

const loadHintsFile = async (): Promise<HintStoneList> => {
    const fileUrl = logicFileUrl('hints.yaml');
    const data = await loadFileFromUrl(fileUrl);
    return yaml.load(data) as string[];
};

export const loadLogicFiles = async (logicFile: string): Promise<LogicFiles> => {
    const requirements = await loadLogicFile(logicFile);
    const locations = await loadLocationsFile();
    const hints = await loadHintsFile();
    return { requirements, locations, hints };
};

import { load } from 'js-yaml';

const logicFiles = [
    'Ancient Cistern',
    'Earth Temple',
    'Eldin',
    'Faron',
    'Fire Sanctuary',
    'Lanayru Mining Facility',
    'Lanayru',
    'Sandship',
    'Sky Keep',
    'Sky',
    'Skyloft',
    'Skyview',
] as const;

type LocationFile = typeof logicFiles[number];

type BaseFile = 'checks' | 'hints'

type UnparsedRequirement = string;

type RawArea = {
    [name: string]: RawArea;
} & {
    locations?: Record<string, UnparsedRequirement>;
    macros?: Record<string, UnparsedRequirement>;
    exits?: Record<string, UnparsedRequirement>;
    entrance?: UnparsedRequirement;
};

enum AllowedTimeOfDay {
    DayOnly = 'DayOnly',
    NightOnly = 'NightOnly',
    Both = 'Both'
}

type UnparsedLogicFile = {
    [name: string]: RawArea;
} & {
    'allowed-time-of-day'?: AllowedTimeOfDay;
    'hint-region'?: string;
    // locations on file level
    macros: Record<string, UnparsedRequirement>;
};

interface LateResolvedReq {
    name: string,
    requirement: string,
    path?: string[]
}

const loadFileFromUrl = async (url: string) => {
    const response = await fetch(url);
    return response.text();
};

const logicFileUrl = (file: LocationFile) => `https://raw.githubusercontent.com/ssrando/ssrando/master/logic/requirements/${file}.yaml`;

const baseFleUrl = (file: BaseFile) => `https://raw.githubusercontent.com/ssrando/ssrando/master/${file}.yaml`;

const loadLogicFile = async (file: LocationFile) => {
    const fileUrl = logicFileUrl(file);
    const data = await loadFileFromUrl(fileUrl);
    return load(data);
};

const loadFile = async (file: BaseFile) => {
    const fileUrl = baseFleUrl(file);
    const data = await loadFileFromUrl(fileUrl);
    return load(data);
};

const loadLogicFiles = async () => Object.fromEntries(
    await Promise.all(
        logicFiles.map(async (name) => [name, await loadLogicFile(name)]),
    ),
);

function processAreasRec(
    requirements: Record<string, string>,
    laterResolvedReqs: LateResolvedReq[],
    areaPath: string[],
    area: RawArea,
) {
    const {
        locations, entrance, exits, macros, ...subAreas
    } = area;
    Object.entries(locations ?? {}).concat(Object.entries(macros ?? {})).forEach(([locName, req]) => {
        if (locName.includes(' - ')) {
            // attaches a requirement to another requirement
            laterResolvedReqs.push({
                name: locName,
                path: areaPath,
                requirement: req,
            });
            console.log(`skipping ${locName} at ${areaPath.join('\\')} for now`);
        } else {
            const newAreaPath = [...areaPath, locName].join('\\');
            // TODO: parse
            // eslint-disable-next-line no-param-reassign
            requirements[newAreaPath] = req;
        }
    });
    // Object.entries(exits ?? {}).forEach(([exitName, req]) => {
    //   const newAreaPath = [...areaPath, exitName].join('\\');
    //   requirements[newAreaPath] = req;
    // });
    // if (entrance !== undefined) {
    //   const parentPath = areaPath.slice(0, areaPath.length - 1);
    // }
    // for (const exitName in exits) {
    //   const exit = exits[exitName];
    // }
    Object.entries(subAreas).forEach(([subAreaName, subArea]) => {
        if (typeof subArea === 'object') {
            processAreasRec(requirements, laterResolvedReqs, [...areaPath, subAreaName], subArea);
        } else {
            console.log('unknown', subAreaName, subArea);
        }
    });
}

// search query is supposed to be ` - ` separated
// returns the full path
// function search(unparsedLogicFiles: Record<string,
// UnparsedLogicFile>, currentPath: string[], searchQuery: string)

// eslint-disable-next-line @typescript-eslint/no-shadow
function processRawLogic(logicFiles: Record<string, UnparsedLogicFile>) {
    const requirements = {};
    const laterResolvedReqs: LateResolvedReq[] = [];
    Object.entries(logicFiles).forEach(([logicFileName, logicFile]) => {
        processAreasRec(requirements, laterResolvedReqs, [logicFileName], logicFile);
    });
    return [requirements, laterResolvedReqs];
}

export const loadFiles = async () => {
    const logic = await loadLogicFiles();
    console.log(logic);
    console.log(processRawLogic(logic));
    const locations = await loadFile('checks');
    const hints = await loadFile('hints');
    return { requirements: logic, locations, hints };
};

export const loadNewLogicChecks = async () => {
    const data = await loadFileFromUrl('https://raw.githubusercontent.com/ssrando/ssrando/master/checks.yaml');
    return load(data);
};

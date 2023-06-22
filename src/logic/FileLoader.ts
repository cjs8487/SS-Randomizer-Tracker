import _, { filter, isEmpty } from 'lodash';
import { load } from 'js-yaml';

const logicFilesAvailable = [
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
];

type LocationFile = (typeof logicFilesAvailable)[number];

type BaseFile = 'checks' | 'hints' | 'entrances';

type UnparsedRequirement = string;

type RawArea = {
    locations?: Record<string, UnparsedRequirement>;
    macros?: Record<string, UnparsedRequirement>;
    exits?: Record<string, UnparsedRequirement>;
    entrance?: UnparsedRequirement;
} & {
    [name: string]: RawArea;
};

enum AllowedTimeOfDay {
    DayOnly = 'DayOnly',
    NightOnly = 'NightOnly',
    Both = 'Both',
}

type UnparsedLogicFile = {
    [name: string]: RawArea;
} & {
    'allowed-time-of-day'?: AllowedTimeOfDay;
    'hint-region'?: string;
    // locations on file level
    macros: Record<string, UnparsedRequirement>;
};

type TrimmedLogicFile = { [name: string]: RawArea };
type TrimmedArea = { [name: string]: RawArea };

type UnparsedLogic = Record<string, UnparsedLogicFile>;

type Entrance = {
    type: 'entrance';
};

type Exit = {
    type: 'exit';
    subtype?: string;
    vanilla: string;
};

type Exits = Record<string, Exit>;

type EntranceFileEntry = Entrance | Exit;

interface LateResolvedReq {
    name: string;
    requirement: string;
    path?: string[];
}

type Area = {
    locations?: Record<string, UnparsedRequirement>;
    macros?: Record<string, UnparsedRequirement>;
    exits?: Record<string, UnparsedRequirement>;
    areas?: Record<string, Area>;
};

type LogicFile = {
    macros: Record<string, UnparsedRequirement>;
    areas: Record<string, Area>;
};

type LogicFiles = Record<string, LogicFile>;

const loadFileFromUrl = async (url: string) => {
    const response = await fetch(url);
    return response.text();
};

const logicFileUrl = (file: LocationFile) =>
    `https://raw.githubusercontent.com/ssrando/ssrando/master/logic/requirements/${file}.yaml`;

const baseFleUrl = (file: BaseFile) =>
    `https://raw.githubusercontent.com/ssrando/ssrando/master/${file}.yaml`;

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

const loadLogicFiles = async () =>
    Object.fromEntries(
        await Promise.all(
            logicFilesAvailable.map(async (name) => [
                name,
                await loadLogicFile(name),
            ]),
        ),
    );

function processAreasRec(
    requirements: Record<string, string>,
    laterResolvedReqs: LateResolvedReq[],
    areaPath: string[],
    area: RawArea,
) {
    const { locations, entrance, exits, macros, ...subAreas } = area;
    Object.entries(locations ?? {})
        .concat(Object.entries(macros ?? {}))
        .forEach(([locName, req]) => {
            if (locName.includes(' - ')) {
                // attaches a requirement to another requirement
                laterResolvedReqs.push({
                    name: locName,
                    path: areaPath,
                    requirement: req,
                });
                console.log(
                    `skipping ${locName} at ${areaPath.join('\\')} for now`,
                );
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
            processAreasRec(
                requirements,
                laterResolvedReqs,
                [...areaPath, subAreaName],
                subArea,
            );
        } else {
            console.log('unknown', subAreaName, subArea);
        }
    });
}

// search query is supposed to be ` - ` separated
// returns the full path
// function search(unparsedLogicFiles: Record<string,
// UnparsedLogicFile>, currentPath: string[], searchQuery: string)

const findExitsRecursively = (area: Area, path: string[], exits: Exits) => {
    _.forEach(area.areas, (subArea, key) => {
        findExitsRecursively(subArea, [...path, key], exits);
    });
    _.forEach(area.exits, (req, exit) => {
        // console.log(`finding exit ${exit} at ${path}`);
        // findMatchingEntrance(exit, path, exits);
    });
};

const searchExitsRecursively = (
    area: Area,
    currIndex: number,
    target: string[],
    path: string[],
) => {
    _.forEach(area.areas, (subArea, subAreaName) => {
        if (subAreaName === target[currIndex]) {
            searchExitsRecursively(subArea, currIndex + 1, target, [
                ...path,
                subAreaName,
            ]);
        } else {
            searchExitsRecursively(subArea, currIndex, target, [
                ...path,
                subAreaName,
            ]);
        }
    });

    if (currIndex === target.length - 1) {
        _.forEach(area.exits, (req, exit) => {
            if (exit === target[currIndex]) {
                console.log(`found a match for ${target} at ${path}`);
            }
        });
    }
};

const findMatchingEntrance = (
    targetEntrance: string,
    path: string[],
    exits: Exits,
) => {
    // _.forEach(exits, (exit) => {});
    // if (isEmpty(matchPath)) {
    //     console.log(`failed to find a matching entrance for ${targetEntrance}`);
    // }
    // console.log(`matched ${targetEntrance} at path ${matchPath}`);
};

function processRawLogic(logicFiles: LogicFiles, exits: Exits) {
    // for each exit in the graph
    //  find a matching graph node
    //  set exit.target = the path to the node
    _.forEach(exits, (exit) => {
        console.log(`searching for ${exit.vanilla}`);
        const parts = exit.vanilla.split(' - ');
        _.forEach(logicFiles, (file, fileName) => {
            let fileOffset = 0;
            if (parts[0] === fileName) {
                fileOffset += 1;
            }
            _.forEach(file.areas, (area, name) => {
                let topOffset = 0;
                if (name === parts[fileOffset]) {
                    topOffset += 1;
                }
                searchExitsRecursively(area, fileOffset + topOffset, parts, [
                    fileName,
                    name,
                ]);
            });
        });
    });

    //
    //
    // start with the starting entrance, find the corresponding region
    const startEntrance = exits.Start.vanilla;
    console.log(startEntrance);
    // then parse that regions locations
    // then progress forward to a new node via an exit
    // repeat
    //
    //
    //
    // const requirements = {};
    // const laterResolvedReqs: LateResolvedReq[] = [];
    // Object.entries(logicFiles).forEach(([logicFileName, logicFile]) => {
    //     processAreasRec(
    //         requirements,
    //         laterResolvedReqs,
    //         [logicFileName],
    //         logicFile,
    //     );
    // });
    // return [requirements, laterResolvedReqs];
}

const invalidAreaKeys = [
    'locations',
    'exits',
    'macros',
    'entrance',
    'toplevel-alias',
    'hint-region',
    'allowed-time-of-day',
    'can-sleep',
    'can-save',
    'exit', // TODO: find out if this will stay
];

const formatArea = (area: RawArea): Area => {
    const filtered = Object.fromEntries(
        Object.entries(area).filter(([key]) => !invalidAreaKeys.includes(key)),
    ) as TrimmedArea;
    const areas: Record<string, Area> = {};

    _.forEach(filtered, (subArea, name) => {
        areas[name] = formatArea(subArea);
    });

    const formattedArea: Area = {};
    if (area.locations) {
        formattedArea.locations = area.locations;
    }
    if (area.exits) {
        formattedArea.exits = area.exits;
    }
    if (area.macros) {
        formattedArea.macros = area.macros;
    }
    if (!_.isEmpty(areas)) {
        formattedArea.areas = areas;
    }
    return formattedArea;
};

const formatFiles = (files: UnparsedLogic): Record<string, LogicFile> => {
    const formattedFiles: Record<string, LogicFile> = {};
    _.forEach(files, (file, name) => {
        const filtered = Object.fromEntries(
            Object.entries(file).filter(
                ([key]) => !invalidAreaKeys.includes(key),
            ),
        ) as TrimmedLogicFile;
        const areas: Record<string, Area> = {};

        _.forEach(filtered, (area, areaName) => {
            areas[areaName] = formatArea(area);
        });
        formattedFiles[name] = {
            macros: file.macros,
            areas,
        };
    });

    return formattedFiles;
};

export const loadFiles = async () => {
    const logic = await loadLogicFiles();
    const entranceFile = (await loadFile('entrances')) as Record<
        string,
        EntranceFileEntry
    >;
    const exits = Object.fromEntries(
        Object.entries(entranceFile).filter(
            ([name, entry]) => entry.type === 'exit',
        ),
    ) as Record<string, Exit>;
    // console.log(exits);
    const formattedFiles = formatFiles(logic);
    console.log(processRawLogic(formattedFiles, exits));
    const locations = await loadFile('checks');
    const hints = await loadFile('hints');
    return { requirements: logic, locations, hints };
};

export const loadNewLogicChecks = async () => {
    const data = await loadFileFromUrl(
        'https://raw.githubusercontent.com/ssrando/ssrando/master/checks.yaml',
    );
    return load(data);
};

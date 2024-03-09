import _ from 'lodash';
import goddessCubes from '../data/goddessCubes.json';
import ItemLocation from './ItemLocation';
import crystalLocations from '../data/crystals.json';
import { completionRequirementToDungeon, splitLocationName } from './Locations';
import { RawLogic } from './LogicLoader';
import { applyTweaks } from './LogicTweaks';
import { Requirements } from './Requirements';

export interface Area {
    locations: Record<string, ItemLocation>;
    additionalLocations: Record<string, ItemLocation>;
}

export interface Logic {
    requirements: Requirements,
    areas: Record<string, Area>;
}

export function parseLogic({ hints, locations: rawLocations, requirements: rawRequirements }: RawLogic): Logic {
    const areas: Logic['areas'] = {};

    const getArea = (name: string) => (areas[name] ??= { additionalLocations: {}, locations: {} });

    _.forEach(rawLocations, (data, id) => {
        const {
            area,
            location,
        } = splitLocationName(id);
        const itemLocation: ItemLocation = {
            id,
            area,
            name: location,
            logicSentence: id,
            rawType: data.type,
        };

        const dungeonName = completionRequirementToDungeon[id];
        if (dungeonName) {
            itemLocation.giveItemOnCheck = `${dungeonName} Completed`;
        }
        getArea(area).locations[location] = itemLocation;
    });

    _.forEach(goddessCubes, (cube, cubeRequirementName) => {
        const extraLocation: ItemLocation = {
            id: cubeRequirementName,
            area: cube.area,
            name: cube.displayName,
            logicSentence: `Can Reach ${cubeRequirementName}`,
            giveItemOnCheck: cubeRequirementName,
            rawType: cube.type,
        }
        getArea(cube.area).additionalLocations[cubeRequirementName] = extraLocation;
    });

    _.forEach(crystalLocations, (crystal, crystalRequirementName) => {
        const crystalRequirementFullName = `${crystal.area} - ${crystalRequirementName}`;
        const extraLocation: ItemLocation = {
            id: crystalRequirementFullName,
            area: crystal.area,
            name: crystal.displayName,
            logicSentence: crystalRequirementFullName,
            rawType: 'loose gratitude crystals',
            giveItemOnCheck: 'Gratitude Crystal',
        }
        delete areas[crystal.area]?.locations[crystalRequirementName];
        getArea(crystal.area).additionalLocations[crystalRequirementName] = extraLocation;
    });
    _.forEach(hints, (_hint, hintName) => {
        const { area, location } = splitLocationName(hintName);
        const extraLocation: ItemLocation = {
            id: hintName,
            area,
            name: location,
            logicSentence: hintName,
            rawType: 'gossip stones',
        }
        getArea(area).additionalLocations[location] = extraLocation;
    });

    const requirements = { ...rawRequirements };
    applyTweaks(requirements);

    return {
        requirements,
        areas,
    }
}

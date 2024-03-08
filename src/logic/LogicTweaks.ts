import _ from 'lodash';
import goddessCubes from '../data/goddessCubes.json';
import crystalMacros from '../data/gratitudeCrystalMacros.json';
import type { Settings } from '../permalink/SettingsTypes';
import { Requirements } from './Logic';

export function applyTweaks(requirements: Requirements) {
    tweakTMSAndRequiredDungeons(requirements);
    tweakGoddessChestRequirements(requirements);
    tweakGratitudeCrystalRequirements(requirements);
}

export function getSettingsRequirements(settings: Settings): Requirements {
    const requirements = {};
    createDungeonMacros(requirements, settings['randomize-entrances']);
    createTrialMacros(requirements, settings['randomize-trials']);
    tweakSoTH(requirements);

    return requirements;
}

function createDungeonMacros(requirements: Requirements, entrancesRandomized: Settings['randomize-entrances']) {
    if (entrancesRandomized === 'None') {
        // no entrance randomizer, sub default requirements in
        requirements['Can Access Skyview'] = 'Can Access Dungeon Entrance in Deep Woods';
        requirements['Can Access Earth Temple'] = 'Can Access Dungeon Entrance in Eldin Volcano';
        requirements['Can Access Lanayru Mining Facility'] = 'Can Access Dungeon Entrance in Lanayru Desert';
        requirements['Can Access Ancient Cistern'] = 'Can Access Dungeon Entrance in Lake Floria';
        requirements['Can Access Sandship'] = 'Can Access Dungeon Entrance in Lanayru Sand Sea';
        requirements['Can Access Fire Sanctuary'] = 'Can Access Dungeon Entrance in Volcano Summit';
        requirements['Can Access Sky Keep'] = 'Can Access Dungeon Entrance on Skyloft';
        requirements['Can Beat Dungeon Entrance in Lanayru Desert'] = 'Can Beat Lanayru Mining Facility';
    } else {
        requirements['Can Access Skyview'] = 'Entered Skyview';
        requirements['Can Access Earth Temple'] = 'Entered Earth Temple';
        requirements['Can Access Lanayru Mining Facility'] = 'Entered Lanayru Mining Facility';
        requirements['Can Access Ancient Cistern'] = 'Entered Ancient Cistern';
        requirements['Can Access Sandship'] = 'Entered Sandship';
        requirements['Can Access Fire Sanctuary'] = 'Entered Fire Sanctuary';
        if (entrancesRandomized !== 'All Surface Dungeons + Sky Keep') {
            requirements['Can Access Sky Keep'] = 'Can Access Dungeon Entrance on Skyloft';
        } else {
            requirements['Can Access Sky Keep'] = 'Entered Sky Keep';
        }
    }
}

function createTrialMacros(requirements: Requirements, entrancesRandomized: Settings['randomize-trials']) {
    if (entrancesRandomized) {
        // entrances are shuffled, create fake items for the tracker
        requirements['Can Access Skyloft Silent Realm'] = 'Entered Skyloft Silent Realm';
        requirements['Can Access Faron Silent Realm'] = 'Entered Faron Silent Realm';
        requirements['Can Access Eldin Silent Realm'] = 'Entered Eldin Silent Realm';
        requirements['Can Access Lanayru Silent Realm'] = 'Entered Lanayru Silent Realm';
    } else {
        // no entrance randomizer, sub default requirements in
        requirements['Can Access Skyloft Silent Realm'] = 'Can Open Trial Gate on Skyloft';
        requirements['Can Access Faron Silent Realm'] = 'Can Open Trial Gate in Faron Woods';
        requirements['Can Access Eldin Silent Realm'] = 'Can Open Trial Gate in Eldin Volcano';
        requirements['Can Access Lanayru Silent Realm'] = 'Can Open Trial Gate in Lanayru Desert';
    }
}

function tweakTMSAndRequiredDungeons(requirements: Requirements) {
    requirements['Can Access Past'] = 'Goddess\'s Harp & Master Sword & Can Complete Required Dungeons';
    requirements['Can Complete Required Dungeons'] = 'Nothing';
}

function tweakGoddessChestRequirements(requirements: Requirements) {
    _.forEach(goddessCubes, (__, macro) => {
        // console.log(macro);
        // rename the macro so that the logic can differentiate from the fake cube items used in the tracker and the actual logic
        requirements[`Can Reach ${macro}`] = requirements[macro];
        delete requirements[macro];
    });
}

function tweakGratitudeCrystalRequirements(requirements: Requirements) {
    _.forEach(crystalMacros, (macro) => {
        const macroSplit = macro.split(/\s+/);
        // ${n} Gratitude Crystals
        const newMacro = `${macroSplit[1]} ${macroSplit[2].slice(0, -1)} x${macroSplit[0]}`;
        // Gratitude Crystal x${n}
        requirements[macro] = newMacro;
    });
}

function tweakSoTH(requirements: Requirements) {
    requirements['Can Open Trial Gate on Skyloft'] = 'Song of the Hero x3 & Goddess\'s Harp';
}

export function getPastRequirementsExpression(
    settings: Settings,
    requiredDungeons: string[],
): string {
    let newReqs = `Can Access Sealed Temple & Goddess's Harp & ${settings['got-sword-requirement']} & `;
    _.forEach(requiredDungeons, (dungeon) => {
        if (dungeon !== 'Sky Keep') {
            newReqs += `${dungeon} Completed & `;
        }
    });
    return newReqs.slice(0, -3);
}

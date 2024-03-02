import _ from 'lodash';
import ItemLocation from './ItemLocation';
import potentialBannedLocations_ from '../data/potentialBannedLocations.json';
import { Settings } from '../permalink/SettingsTypes';

const potentialBannedLocations: {
    [area: string]: { [locationName: string]: { requiredDungeon: string } };
} = potentialBannedLocations_;

export const dungeonCompletionRequirements: Record<string, string> = {
    Skyview: 'Skyview - Strike Crest',
    'Earth Temple': 'Earth Temple - Strike Crest',
    'Lanayru Mining Facility':
        'Lanayru Mining Facility - Exit Hall of Ancient Robots',
    'Ancient Cistern': "Ancient Cistern - Farore's Flame",
    Sandship: "Sandship - Nayru's Flame",
    'Fire Sanctuary': "Fire Sanctuary - Din's Flame",
};

export const completionRequirementToDungeon = _.invert(
    dungeonCompletionRequirements,
);

export const allDungeonNames = [
    ...Object.keys(dungeonCompletionRequirements),
    'Sky Keep',
];

export const allSilentRealmNames = [
    'Skyloft Silent Realm',
    'Faron Silent Realm',
    'Eldin Silent Realm',
    'Lanayru Silent Realm',
]

export function isDungeon(area: string) {
    return allDungeonNames.includes(area);
}

/** Returns, based on settings, a function (ItemLocation) => boolean that indicates whether a location is excluded. */
export function createIsCheckBannedPredicate(
    settings: Settings,
    requiredDungeons: string[],
) {
    return ({ id, area, name, rawType: loctype }: ItemLocation) => {
        const bannedLocations = settings['excluded-locations'];
        if (bannedLocations.includes(id)) {
            return true;
        }


        if (settings['empty-unrequired-dungeons']) {
            const potentialBanReason = potentialBannedLocations[area]?.[name];

            if (potentialBanReason && !requiredDungeons.includes(potentialBanReason.requiredDungeon)) {
                return true;
            }
        }

        let maxRelics = settings['trial-treasure-amount'];
        if (!settings['treasuresanity-in-silent-realms']) {
            maxRelics = 0;
        }
        if (
            area.includes('Silent Realm') &&
            parseInt(name.replace(/^\D+/g, ''), 10) > maxRelics
        ) {
            return true;
        }

        const emptyUnrequiredDungeons = settings['empty-unrequired-dungeons'];
        if (
            emptyUnrequiredDungeons &&
            (isDungeon(area)) &&
            !requiredDungeons.includes(area)
        ) {
            return true;
        }

        if (loctype !== null) {
            // have to specifically check Shopsanity being false, otherwise it being null on new versions disables Beedle
            if (
                (settings['shopsanity'] === false &&
                    loctype.includes("Beedle's Shop Purchases")) ||
                (!settings['rupeesanity'] &&
                    loctype.includes('Rupees')) ||
                (!settings['tadtonesanity'] &&
                    loctype.includes('Tadtones') &&
                    name !== "Water Dragon's Reward")
            ) {
                return true;
            }
            // Post-shop split compatibility
            // have to specifically check Beedle Shopsanity being false, otherwise it being null on old versions disables Beedle
            if (
                (settings['beedle-shopsanity'] === false &&
                    loctype.includes("Beedle's Shop")) ||
                (!settings['rupin-shopsanity'] &&
                    loctype.includes('Gear Shop')) ||
                (!settings['luv-shopsanity']) &&
                    loctype.includes('Potion Shop')
            ) {
                return true;
            }
        }
    };
}

export function splitLocationName(name: string) {
    const locationElements = name.split(' - ');
    return {
        area: locationElements[0].trim(),
        location: locationElements.splice(1).join(' - ').trim(),
    };
}

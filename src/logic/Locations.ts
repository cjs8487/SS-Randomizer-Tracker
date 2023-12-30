import _ from 'lodash';
import Settings from '../permalink/Settings';
import { TrackerState } from '../state/tracker/Slice';
import ItemLocation from './ItemLocation';
import Logic from './Logic';

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

export function isDungeon(area: string) {
    return allDungeonNames.includes(area);
}

/** Returns, based on settings, a function (ItemLocation) => boolean that indicates whether a location is excluded. */
export function createIsCheckBannedPredicate(
    settings: Settings,
    requiredDungeons: string[],
) {
    return ({ id, area, name, rawType: loctype }: ItemLocation) => {
        const bannedLocations = settings.getOption('Excluded Locations');
        if (bannedLocations.includes(id)) {
            return true;
        }

        let maxRelics = settings.getOption('Trial Treasure Amount');
        if (!settings.getOption('Treasuresanity in Silent Realms')) {
            maxRelics = 0;
        }
        if (
            area.includes('Silent Realm') &&
            parseInt(name.replace(/^\D+/g, ''), 10) > maxRelics
        ) {
            return true;
        }

        const emptyUnrequiredDungeons = settings.getOption(
            'Empty Unrequired Dungeons',
        );
        if (
            emptyUnrequiredDungeons &&
            (isDungeon(area)) &&
            !requiredDungeons.includes(area)
        ) {
            return true;
        }

        // old 1.4.1 options
        const shopMode = settings.getOption('Shop Mode');
        const batMode = settings.getOption('Max Batreaux Reward');
        if (loctype !== null) {
            // have to specifically check Shopsanity being false, otherwise it being null on new versions disables Beedle
            if (
                (settings.getOption('Shopsanity') === false &&
                    loctype.includes("Beedle's Shop Purchases")) ||
                (!settings.getOption('Rupeesanity') &&
                    loctype.includes('Rupees')) ||
                (!settings.getOption('Tadtonesanity') &&
                    loctype.includes('Tadtones') &&
                    name !== "Water Dragon's Reward")
            ) {
                return true;
            }
            // 1.4.1 rupeesanity & shopsanity compatibility
            if (
                settings.getOption('Rupeesanity') === 'Vanilla' &&
                loctype.includes('Rupees')
            ) {
                return true;
            }
            if (
                shopMode !== undefined &&
                loctype.includes("Beedle's Shop Purchases")
            ) {
                if (shopMode === 'Vanilla') {
                    return true;
                }
                if (
                    shopMode.includes('Cheap') &&
                    parseInt(name.replace(/^\D+/g, ''), 10) > 300
                ) {
                    return true;
                }
                if (
                    shopMode.includes('Medium') &&
                    parseInt(name.replace(/^\D+/g, ''), 10) > 1000
                ) {
                    return true;
                }
            }
            // Post-shop split compatibility
            // have to specifically check Beedle Shopsanity being false, otherwise it being null on old versions disables Beedle
            if (
                (settings.getOption('Beedle Shopsanity') === false &&
                    loctype.includes("Beedle's Shop")) ||
                (!settings.getOption('Gear Shopsanity') &&
                    loctype.includes('Gear Shop')) ||
                (!settings.getOption('Potion Shopsanity') &&
                    loctype.includes('Potion Shop'))
            ) {
                return true;
            }
        }
        // Must check this outside the loctype block because Batreaux checks have no type. 1.4.1 batreaux compatibility
        if (
            batMode !== undefined &&
            area.includes('Batreaux') &&
            parseInt(name.replace(/^\D+/g, ''), 10) > batMode
        ) {
            return true;
        }
    };
}

export function getNumLooseGratitudeCrystals(
    logic: Logic,
    checkedChecks: TrackerState['checkedChecks'],
) {
    return checkedChecks.filter((check) => {
        const { area } = splitLocationName(check);
        return logic.getExtraChecksForArea(area).find((loc) => loc.id === check)
            ?.isLooseGratitudeCrystal;
    }).length;
}

export function splitLocationName(name: string) {
    const locationElements = name.split(' - ');
    return {
        area: locationElements[0].trim(),
        location: locationElements.splice(1).join(' - ').trim(),
    };
}

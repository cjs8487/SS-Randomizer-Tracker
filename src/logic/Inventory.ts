import _ from 'lodash';
import Settings from '../permalink/Settings';
import { TrackerState } from '../state/Tracker';

export const itemMaxes = {
    'Progressive Sword': 6,
    'Progressive Wallet': 4,
    'Extra Wallet': 3,
    'Progressive Mitts': 2,
    "Water Dragon's Scale": 1,
    'Fireshield Earrings': 1,
    "Goddess's Harp": 1,
    "Farore's Courage": 1,
    "Nayru's Wisdom": 1,
    "Din's Power": 1,
    'Ballad of the Goddess': 1,
    'Song of the Hero': 3,
    Sailcloth: 1,
    'Stone of Trials': 1,
    'Emerald Tablet': 1,
    'Ruby Tablet': 1,
    'Amber Tablet': 1,
    "Cawlin's Letter": 1,
    'Horned Colossus Beetle': 1,
    'Baby Rattle': 1,
    'Gratitude Crystal Pack': 13,
    'Progressive Slingshot': 2,
    'Progressive Beetle': 4,
    'Bomb Bag': 1,
    'Gust Bellows': 1,
    Whip: 1,
    Clawshots: 1,
    'Progressive Bow': 3,
    'Progressive Bug Net': 2,
    'Sea Chart': 1,
    'Lanayru Caves Small Key': 1,
    'Empty Bottle': 5,
    'Progressive Pouch': 1,
    'Spiral Charge': 1,
    'Life Tree Fruit': 1,
    'Group of Tadtones': 17,
    Scrapper: 1,
    'Skyview Boss Key': 1,
    'Earth Temple Boss Key': 1,
    'Lanayru Mining Facility Boss Key': 1,
    'Ancient Cistern Boss Key': 1,
    'Sandship Boss Key': 1,
    'Fire Sanctuary Boss Key': 1,
    Triforce: 3,
    'Skyview Small Key': 2,
    'Key Piece': 5,
    'Lanayru Mining Facility Small Key': 1,
    'Ancient Cistern Small Key': 2,
    'Sandship Small Key': 2,
    'Fire Sanctuary Small Key': 3,
    'Sky Keep Small Key': 1,
};

export type InventoryItem = keyof typeof itemMaxes;

export function isItem(id: string): id is InventoryItem {
    return id in itemMaxes;
}

export function getInitialItems(settings: Settings): TrackerState['inventory'] {
    const startingItems: TrackerState['inventory'] = {};
    const addItem = (item: InventoryItem) => {
        startingItems[item] ??= 0;
        startingItems[item]! += 1;
    };
    addItem('Sailcloth');
    if (settings.getOption('Starting Tablet Count') === 3) {
        addItem('Emerald Tablet');
        addItem('Ruby Tablet');
        addItem('Amber Tablet');
    }
    for (
        let crystalPacksAdded = 0;
        crystalPacksAdded <
        settings.getOption('Starting Gratitude Crystal Packs');
        crystalPacksAdded++
    ) {
        addItem('Gratitude Crystal Pack');
    }
    for (
        let tadtonesAdded = 0;
        tadtonesAdded < settings.getOption('Starting Tadtone Count');
        tadtonesAdded++
    ) {
        addItem('Group of Tadtones');
    }
    for (
        let bottlesAdded = 0;
        bottlesAdded < settings.getOption('Starting Empty Bottles');
        bottlesAdded++
    ) {
        addItem('Empty Bottle');
    }
    const startingSword = settings.getOption('Starting Sword');
    if (!(startingSword === 'Swordless')) {
        const swordsToAdd: Record<string, number> = {
            'Practice Sword': 1,
            'Goddess Sword': 2,
            'Goddess Longsword': 3,
            'Goddess White Sword': 4,
            'Master Sword': 5,
            'True Master Sword': 6,
        };

        for (
            let swordsAdded = 0;
            swordsAdded < swordsToAdd[startingSword];
            swordsAdded++
        ) {
            addItem('Progressive Sword');
        }
    }
    _.forEach(settings.getOption('Starting Items'), (item) => {
        if (item.includes('Song of the Hero')) {
            addItem('Song of the Hero');
        } else if (item.includes('Triforce')) {
            addItem('Triforce');
        } else if (
            isItem(item) &&
            (!item.includes('Pouch') || !startingItems['Progressive Pouch'])
        ) {
            addItem(item);
        }
    });

    return startingItems;
}

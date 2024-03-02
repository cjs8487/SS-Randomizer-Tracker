/**
 * DO NOT MANUALLY EDIT!
 * Automatically generated option types based on ssrando options.yaml
 * Run `npm run generate:options` to regenerate.
 */
export interface GeneratedSettings {
    /** Starting Tablet Count */
    'starting-tablet-count': number;
    /** Open Thunderhead */
    'open-thunderhead': 'Ballad' | 'Open';
    /** Starting Sword */
    'starting-sword': 'Swordless' | 'Practice Sword' | 'Goddess Sword' | 'Goddess Longsword' | 'Goddess White Sword' | 'Master Sword' | 'True Master Sword';
    /** Required Dungeon Count */
    'required-dungeon-count': number;
    /** Imp 2 */
    'imp2-skip': boolean;
    /** Empty unrequired Dungeons */
    'empty-unrequired-dungeons': boolean;
    /** Triforce Required */
    'triforce-required': boolean;
    /** Triforce Shuffle */
    'triforce-shuffle': 'Vanilla' | 'Sky Keep' | 'Anywhere';
    /** Randomize Entrances */
    'randomize-entrances': 'None' | 'Required Dungeons Separately' | 'All Surface Dungeons' | 'All Surface Dungeons + Sky Keep';
    /** Randomize Silent Realms */
    'randomize-trials': boolean;
    /** No Spoiler Log */
    'no-spoiler-log': boolean;
    /** Shopsanity */
    'shopsanity': boolean;
    /** Rupoor Mode */
    'rupoor-mode': 'Off' | 'Added' | 'Rupoor Mayhem' | 'Rupoor Insanity';
    /** Rupeesanity */
    'rupeesanity': boolean;
    /** Place Scrap Shop Upgrades */
    'gondo-upgrades': boolean;
    /** Gate of Time Starting State */
    'got-start': 'Lowered' | 'Raised';
    /** Gate of Time Sword Requirement */
    'got-sword-requirement': 'Goddess Sword' | 'Goddess Longsword' | 'Goddess White Sword' | 'Master Sword' | 'True Master Sword';
    /** Gate of Time Dungeon Requirements */
    'got-dungeon-requirement': 'Required' | 'Unrequired';
    /** Open Lanayru Mining Facility */
    'open-lmf': 'Nodes' | 'Main Node' | 'Open';
    /** Skip Horde */
    'skip-horde': boolean;
    /** Skip Ghirahim 3 */
    'skip-g3': boolean;
    /** Skip Demise */
    'skip-demise': boolean;
    /** Map Mode */
    'map-mode': 'Removed' | 'Vanilla' | 'Own Dungeon - Restricted' | 'Own Dungeon - Unrestricted' | 'Anywhere';
    /** Small Key Mode */
    'small-key-mode': 'Vanilla' | 'Own Dungeon - Restricted' | 'Lanayru Caves Key Only' | 'Anywhere';
    /** Boss Key Mode */
    'boss-key-mode': 'Vanilla' | 'Own Dungeon' | 'Anywhere';
    /** Logic Mode */
    'logic-mode': 'BiTless' | 'No Logic';
    /** Enabled Tricks BiTless */
    'enabled-tricks-bitless': string[];
    /** Enabled Tricks Glitched */
    'enabled-tricks-glitched': string[];
    /** Song Hints */
    'song-hints': 'None' | 'Basic' | 'Advanced' | 'Direct';
    /** BiT Changes */
    'bit-patches': 'Disable BiT' | 'Vanilla' | 'Fix BiT Crashes';
    /** Past Impa Stone of Trials Hint */
    'impa-sot-hint': boolean;
    /** Force Sword Dungeon Reward */
    'sword-dungeon-reward': 'None' | 'Heart Container' | 'Final Check';
    /** Open Earth Temple */
    'open-et': boolean;
    /** Demise Count */
    'demise-count': number;
    /** Separate Cube SotS */
    'cube-sots': boolean;
    /** Precise Item Hints */
    'precise-item': boolean;
    /** Shuffle Trial Objects */
    'shuffle-trial-objects': 'None' | 'Simple' | 'Advanced' | 'Full';
    /** Fill Dowsing on White Sword */
    'dowsing-after-whitesword': boolean;
    /** Chest Dowsing */
    'chest-dowsing': 'Vanilla' | 'All Chests' | 'Progress Items';
    /** Allow Dowsing in Dungeons */
    'dungeon-dowsing': boolean;
    /** Excluded Locations */
    'excluded-locations': string[];
    /** Open Lake Floria */
    'open-lake-floria': 'Vanilla' | 'Talk to Yerbal' | 'Open';
    /** Upgraded Skyward Strike */
    'upgraded-skyward-strike': boolean;
    /** Faster Air Meter Drain */
    'fast-air-meter': boolean;
    /** Heart Drops */
    'enable-heart-drops': boolean;
    /** Damage Multiplier */
    'damage-multiplier': number;
    /** Hint Distribution */
    'hint-distribution': 'Weak' | 'Balanced' | 'Junk' | 'Co-op S1' | 'S2 - 2D' | 'S2 - 3D' | 'S2 - 3D EUD Off' | 'CDMC' | 'Dowsing & Fi Hints' | '2D Dowsing & Fi Hints' | 'Boss Keysanity Fi Hints' | 'Strong Dowsing All Dungeons' | 'Remlits Tournament' | 'Custom';
    /** Starting Items */
    'starting-items': string[];
    /** Starting Gratitude Crystal Packs */
    'starting-crystal-packs': number;
    /** Random Starting Item */
    'random-starting-item': boolean;
    /** Starting Empty Bottles */
    'starting-bottles': number;
    /** Start with Hylian Shield */
    'start-with-hylian-shield': boolean;
    /** Starting Heart Containers */
    'starting-heart-containers': number;
    /** Starting Heart Pieces */
    'starting-heart-pieces': number;
    /** Start with Full Wallet */
    'full-starting-wallet': boolean;
    /** Full Wallet Upgrades */
    'full-wallet-upgrades': boolean;
    /** Start with Max Bugs */
    'max-starting-bugs': boolean;
    /** Start with Max Treasures */
    'max-starting-treasures': boolean;
    /** Randomize Boss Key Puzzles */
    'randomize-boss-key-puzzles': boolean;
    /** Tadtonesanity */
    'tadtonesanity': boolean;
    /** Starting Tadtone Count */
    'starting-tadtones': number;
    /** FS Last Room Lava Flow */
    'fs-lava-flow': boolean;
    /** Peatrice Conversations */
    'peatrice-conversations': number;
    /** Random Starting Spawn */
    'random-start-entrance': 'Vanilla' | 'Bird Statues' | 'Any Surface Region' | 'Any';
    /** Limit Starting Location */
    'limit-start-entrance': boolean;
    /** Treasuresanity in Silent Realms */
    'treasuresanity-in-silent-realms': boolean;
    /** Trial Treasure Amount */
    'trial-treasure-amount': number;
    /** Random Starting Statues */
    'random-start-statues': boolean;
}

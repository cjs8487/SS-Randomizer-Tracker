// these regions are irrelevant now with the removal of banned types, will keep in until full new logic unfreeze
export const regions = [
    {
        display: 'Skyloft',
        internal: 'skyloft',
    },
    {
        display: 'The Sky',
        internal: 'sky',
    },
    {
        display: 'Thunderhead',
        internal: 'thunderhead',
    },
    {
        display: 'Faron',
        internal: 'faron',
    },
    {
        display: 'Eldin',
        internal: 'eldin',
    },
    {
        display: 'Lanayru',
        internal: 'lanayru',
    },
] as const;

export const types = [
    {
        display: 'Dungeons',
        internal: 'dungeon',
    },
    {
        display: 'Mini Dungeons',
        internal: 'mini dungeon',
    },
    {
        display: 'Free Gifts',
        internal: 'free gift',
    },
    {
        display: 'Freestanding Items',
        internal: 'freestanding',
    },
    {
        display: 'Miscellaneous',
        internal: 'miscellaneous',
    },
    {
        display: 'Silent Realms',
        internal: 'silent realm',
    },
    {
        display: 'Digging Spots',
        internal: 'digging',
    },
    {
        display: 'Bombable Walls',
        internal: 'bombable',
    },
    {
        display: 'Combat Rewards',
        internal: 'combat',
    },
    {
        display: 'Songs',
        internal: 'song',
    },
    {
        display: 'Spiral Charge Chests',
        internal: 'spiral charge',
    },
    {
        display: 'Minigames',
        internal: 'minigame',
    },
    {
        display: 'Max Batreaux Reward',
        internal: 'max-batreaux-reward',
        choice: true,
        choices: [
            0,
            5,
            10,
            30,
            40,
            50,
            70,
            80,
        ],
    },
    {
        display: 'Loose Crystals',
        internal: 'crystal',
    },
    {
        display: 'Peatrice',
        internal: 'peatrice',
    },
    {
        display: 'Short Quests',
        internal: 'short',
    },
    {
        display: 'Long Quests',
        internal: 'long',
    },
    {
        display: 'Fetch Quests',
        internal: 'fetch',
    },
    {
        display: 'Crystal Quests',
        internal: 'crystal quest',
    },
    {
        display: 'Scrapper Quest',
        internal: 'scrapper',
    },
    {
        display: 'Shop Mode',
        internal: 'shop-mode',
    },
    {
        display: 'Beedle\'s Shop Ship',
        internal: 'beedle',
    },
    {
        display: 'Cheap Purchases',
        internal: 'cheap',
    },
    {
        display: 'Medium Cost Purchases',
        internal: 'medium',
    },
    {
        display: 'Expensive Purchases',
        internal: 'expensive',
    },
] as const;

export const cubes = [
    {
        display: 'Faron Woods',
        internal: 'faron goddess',
    },
    {
        display: 'Eldin Volcano',
        internal: 'eldin goddess',
    },
    {
        display: 'Lanayru Desert',
        internal: 'lanayru goddess',
    },
    {
        display: 'Lake Floria',
        internal: 'floria goddess',
    },
    {
        display: 'Volcano Summit',
        internal: 'summit goddess',
    },
    {
        display: 'Lanayru Sand Sea',
        internal: 'sand sea goddess',
    },
] as const;
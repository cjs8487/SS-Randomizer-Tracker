import _ from 'lodash';
import Locations from './Locations';
import LogicLoader from './LogicLoader';
import LogicHelper from './LogicHelper';
import Requirements from './Requirements';
import LogicTweaks from './LogicTweaks';
import goddessCubes from '../data/goddessCubes.json';
import ItemLocation from './ItemLocation';
import crystalLocations from '../data/crystals.json';
import potentialBannedLocations from '../data/potentialBannedLocations.json';
import logicFileNames from '../data/logicModeFiles.json';

class Logic {
    async initialize(settings, startingItems, source) {
        this.settings = settings;
        const { requirements, locations, hints } = await LogicLoader.loadLogicFiles(_.get(logicFileNames, settings.getOption('Logic Mode')), source);
        LogicHelper.bindLogic(this);
        this.rawLocations = locations;
        this.requirements = new Requirements(requirements);
        this.locations = new Locations(locations, this.requirements, settings);
        this.items = {};
        this.max = {
            progressiveSword: 6,
            progressiveWallet: 4,
            extraWallet: 3,
            progressiveMitts: 2,
            waterScale: 1,
            fireshieldEarrings: 1,
            goddessHarp: 1,
            faroresCourage: 1,
            nayrusWisdom: 1,
            dinsPower: 1,
            balladOfTheGoddess: 1,
            songOfTheHero: 3,
            sailcloth: 1,
            stoneOfTrials: 1,
            emeraldTablet: 1,
            rubyTablet: 1,
            amberTablet: 1,
            cawlinsLetter: 1,
            hornedColossusBeetle: 1,
            babyRattle: 1,
            gratitudeCrystal: 80,
            progressiveSlingshot: 2,
            progressiveBeetle: 4,
            bombBag: 1,
            gustBellows: 1,
            whip: 1,
            clawshots: 1,
            progressiveBow: 3,
            progressiveBugNet: 2,
            seaChart: 1,
            lanayruCavesSmallKey: 1,
            emptyBottle: 5,
            progressivePouch: 1,
            spiralCharge: 1,
            lifeTreeFruit: 1,
            groupOfTadtones: 17,
            scrapper: 1,
            enteredSkyview: 1,
            enteredEarthTemple: 1,
            enteredLanayruMiningFacility: 1,
            enteredAncientCistern: 1,
            enteredSandship: 1,
            enteredFireSanctuary: 1,
            enteredSkyKeep: 1,
            enteredSkyloftSilentRealm: 1,
            enteredFaronSilentRealm: 1,
            enteredEldinSilentRealm: 1,
            enteredLanayruSilentRealm: 1,
            svName: 1,
            etName: 1,
            lmfName: 1,
            acName: 1,
            sshName: 1,
            fsName: 1,
            skName: 1,
            skyviewBossKey: 1,
            earthTempleBossKey: 1,
            lanayruMiningFacilityBossKey: 1,
            ancientCisternBossKey: 1,
            sandshipBossKey: 1,
            fireSanctuaryBossKey: 1,
            triforce: 3,
            skyviewSmallKey: 2,
            keyPiece: 5,
            lanayruMiningFacilitySmallKey: 1,
            ancientCisternSmallKey: 2,
            sandshipSmallKey: 2,
            fireSanctuarySmallKey: 3,
            skyKeepSmallKey: 1,
            skyviewCompleted: 1,
            earthTempleCompleted: 1,
            lanayruMiningFacilityCompleted: 1,
            ancientCisternCompleted: 1,
            sandshipCompleted: 1,
            fireSanctuaryCompleted: 1,
            skyKeepCompleted: 1,
        };
        this.fivePacks = 0;
        this.maxFivePacks = 13;
        LogicTweaks.applyTweaks(this, settings);
        _.forEach(startingItems, (item) => {
            this.giveItem(item);
        });

        this.areaCounters = {};
        this.areaInLogicCounters = {};
        this.totalLocations = 0;
        this.locationsChecked = 0;
        this.availableLocations = 0;
        this.requiredDungeons = {
            Skyview: false,
            'Earth Temple': false,
            'Lanayru Mining Facility': false,
            'Ancient Cistern': false,
            Sandship: false,
            'Fire Sanctuary': false,
            'Sky Keep': false,
        };
        this.completedDungeons = {};
        this.additionalLocations = {};
        this.cubeList = {};
        this.crystalList = {};

        _.forEach(goddessCubes, (cube, cubeRequirementName) => {
            const nonprogress = false;
            const extraLocation = ItemLocation.emptyLocation();
            extraLocation.name = cube.displayName;
            extraLocation.logicSentence = this.getRequirement(`Can Reach ${cubeRequirementName}`);
            extraLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(extraLocation.logicSentence);
            const simplifiedExpression = extraLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            extraLocation.needs = readablerequirements;
            extraLocation.requirementName = cubeRequirementName;
            extraLocation.nonprogress = nonprogress;
            extraLocation.settingsNonprogress = nonprogress;
            _.set(this.additionalLocations, [cube.area, cubeRequirementName], extraLocation);
            _.set(this.max, _.camelCase(cubeRequirementName), 1);
            _.set(this.cubeList, cubeRequirementName, extraLocation);
        });
        this.crystalClicked = this.crystalClicked.bind(this);
        _.forEach(crystalLocations, (crystal, crystalRequirementName) => {
            // console.log(crystal);
            const crystalRequirementFullName = `${crystal.area} - ${crystalRequirementName}`;
            const extraLocation = ItemLocation.emptyLocation();
            extraLocation.name = crystal.displayName;
            extraLocation.logicSentence = this.getRequirement(crystalRequirementFullName);
            extraLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(this.getRequirement(crystalRequirementFullName));
            const simplifiedExpression = extraLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            extraLocation.needs = readablerequirements;
            extraLocation.additionalAction = this.crystalClicked;
            _.set(this.additionalLocations, [crystal.area, crystalRequirementName], extraLocation);
            _.set(this.max, _.camelCase(crystalRequirementName), 1);
            _.set(this.crystalList, crystalRequirementName, extraLocation);
        });
        _.forEach(hints, (hint, hintName) => {
            // console.log(hint);
            // console.log(hintName);
            const extraLocation = ItemLocation.emptyLocation();
            const { area, location } = Locations.splitLocationName(hintName);
            extraLocation.name = location;
            extraLocation.logicSentence = this.getRequirement(hintName);
            extraLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(this.getRequirement(hintName));
            const simplifiedExpression = extraLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            extraLocation.needs = readablerequirements;
            _.set(this.additionalLocations, [area, location], extraLocation);
            _.set(this.max, _.camelCase(location), 1);
        });
        this.locations.updateLocationLogic();
        // do an initial requirements check to ensure nothing requirements and starting items are properly considered
        this.checkAllRequirements();
        this.updateAllCounters();
        this.updateShuffleBannedLocations();
        this.updatePastRequirement();
        if (this.settings.getOption('Empty Unrequired Dungeons')) {
            this.updateRaceModeBannedLocations();
        }
        this.hasItem = this.hasItem.bind(this);
        this.isRequirementMet = this.isRequirementMet.bind(this);
        this.itemsRemainingForRequirement = this.itemsRemainingForRequirement.bind(this);
    }

    loadFrom(logic) {
        this.requirements = new Requirements();
        this.requirements.initialize(logic.requirements.requirements);
        this.locations = new Locations();
        this.locations.initialize(logic.locations.locations);
        this.areaCounters = logic.areaCounters;
        this.areaInLogicCounters = logic.areaInLogicCounters;
        this.totalLocations = logic.totalLocations;
        this.locationsChecked = logic.locationsChecked;
        this.availableLocations = logic.availableLocations;
        this.requiredDungeons = logic.requiredDungeons;
        this.completedDungeons = logic.completedDungeons;
        this.additionalLocations = logic.additionalLocations;
        this.fivePacks = logic.fivePacks;
        this.maxFivePacks = logic.maxFivePacks;
        this.cubeList = logic.cubeList;
        _.forEach(this.cubeList, (cube) => {
            cube.booleanExpression = LogicHelper.booleanExpressionForRequirements(cube.logicSentence);
            const simplifiedExpression = cube.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            cube.needs = readablerequirements;
        });
        _.forEach(this.additionalLocations, (area) => {
            _.forEach(area, (additionalLocation) => {
                additionalLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(additionalLocation.logicSentence);
                const simplifiedExpression = additionalLocation.booleanExpression.simplify({
                    implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
                });
                const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
                const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
                additionalLocation.needs = readablerequirements;
            });
        });
        this.items = logic.items;
    }

    requirements() {
        return this.requirements.all();
    }

    getRequirement(requirement) {
        return this.requirements.get(requirement);
    }

    allLocations() {
        return this.locations.all();
    }

    areas() {
        return this.locations.allAreas();
    }

    locationsForArea(area) {
        return this.locations.locationsForArea(area);
    }

    getLocation(area, location) {
        return this.locations.getLocation(area, location);
    }

    locationNeeds(area, location) {
        const itemLocation = this.locations.getLocation(area, location);
        return itemLocation.needs;
    }

    giveItem(item) {
        if (item === '5 Gratitude Crystal') {
            this.fivePacks += 1;
            this.incrementItem('Gratitude Crystal', 5);
        } else {
            this.incrementItem(item);
        }
    }

    takeItem(item) {
        if (item === '5 Gratitude Crystal') {
            if (this.fivePacks <= 0) {
                return;
            }
            this.fivePacks -= 1;
            const current = this.getItem('Gratitude Crystal');
            _.set(this.items, _.camelCase('Gratitude Crystal'), current - 5);
        }
        const current = this.getItem(item);
        if (current <= 0) {
            return;
        }
        _.set(this.items, _.camelCase(item), current - 1);
    }

    resetItem(item) {
        _.set(this.items, _.camelCase(item), 0);
    }

    getItem(item) {
        return _.get(this.items, _.camelCase(item), 0);
    }

    incrementItem(item, amount = 1) {
        const current = this.getItem(item);
        let newCount;
        if (item === 'Gratitude Crystal' && this.fivePacks > this.maxFivePacks) {
            newCount = current - 65;
            this.fivePacks = 0;
        } else if (current < _.get(this.max, _.camelCase(item))) {
            newCount = current + amount;
        } else {
            newCount = 0;
        }
        _.set(this.items, _.camelCase(item), newCount);
    }

    hasItem(item) {
        return this.getItem(item) > 0;
    }

    checkAllRequirements() {
        _.forEach(this.areas(), (area) => {
            _.forEach(this.locationsForArea(area), (location) => {
                location.inLogic = this.areRequirementsMet(location.booleanExpression);
                // TMS requires special handling for semi logic for dungeon completion as the completion is not the requirement
                if (location.name === 'Zelda\'s Blessing' && location.inLogic) {
                    // In this case, we know all the requirements to complete all dungeons and raise and open GoT are met, so check if all dungeons are complete
                    if (location.checked) {
                        location.logicalState = 'checked';
                        return;
                    }
                    let allDungeonsComplete = true;
                    _.forEach(this.requiredDungeons, (required, dungeon) => {
                        if (required && !_.get(this.completedDungeons, dungeon)) {
                            allDungeonsComplete = false;
                        }
                    });
                    // if they are,the location is fully in logic
                    if (allDungeonsComplete) {
                        location.logicalState = 'inLogic';
                    } else {
                        // otherwise it is in semi-logic
                        location.logicalState = 'semiLogic';
                    }
                } else {
                    location.logicalState = this.getLogicalState(location.needs, location.inLogic, location.checked);
                }
            });
            _.forEach(this.getExtraChecksForArea(area), (location) => {
                location.inLogic = this.areRequirementsMet(location.booleanExpression);
                location.logicalState = this.getLogicalState(location.needs, location.inLogic, location.checked);
            });
        });
        this.updateCountersForItem();
    }

    /*
    Determines the logic state of a location, based on tracker restrictions. Used for deeper logical rendering and information display.
    The following logical sttes exist, and are used for determing text color in the location tracker
    - in-logic: when the location is completelyin logic
    - out-logic: location is strictly out of logic
    - semi-logic: location is not accessible logically, but the missing items are in a restricted subset of locations (i.e. dungeons without keysanity)
        Also used for cube tracking to show a chest that is accesible but the cube has not been struck or is unmarked, and Batreaux rewards when crystal
        sanity is disbled
    - glitched-logic: obtainable with glitches (and would be expected in glitched logic) but only when glitched logic is not required
    */
    getLogicalState(requirements, inLogic, complete) {
        // evaluate for special handling of logical state for locations that have more then 2 logical states
        // the following types of conditions cause multiple logical states
        //  - cubes: can be semi-logic when the cube is obtainable but not marked
        //  - glitched logic tracking: locations that are accessible outside of logic using glitches, only applicable when glitched logic is not active (unimplemented)
        //  - dungeons: locations that are only missing keys (unimplemented)
        //  - batreaux rewards: takes accessible loose crystals into account (even before obtained) (unimplemented)
        if (complete) {
            return 'checked';
        }
        if (inLogic) {
            return 'inLogic';
        }
        let logicState = 'outLogic';
        requirements.forEach((requirement) => {
            _.forEach(requirement, (item) => {
                if (item.item.includes('Goddess Cube')) {
                    if (_.get(this.cubeList, item.item).logicalState === 'inLogic') {
                        logicState = 'semiLogic';
                    }
                }
                if (item.item.includes('Crystal')) {
                    let crystalsInLogic = 0;
                    _.forEach(this.crystalList, (crystal) => {
                        if (crystal.logicalState === 'inLogic') {
                            crystalsInLogic++;
                        }
                    });
                    if (this.itemCountRequirementRemaining(item.item) <= crystalsInLogic) {
                        logicState = 'semiLogic';
                    }
                }
            });
        });
        return logicState;
    }

    areRequirementsMet(requirements) {
        return requirements.evaluate({
            isItemTrue: (requirement) => this.isRequirementMet(requirement),
        });
    }

    isRequirementMet(requirement) {
        const itemsRemaining = this.itemsRemainingForRequirement(requirement);
        return itemsRemaining === 0;
    }

    itemsRemainingForRequirement(requirement) {
        const remainingItemsForRequirements = [
            Logic.impossibleRequirementRemaining(requirement),
            Logic.nothingRequirementRemaining(requirement),
            this.itemCountRequirementRemaining(requirement),
            this.itemRequirementRemaining(requirement),
            // this.hasAccessedOtherLocationRequirementRemaining(requirement),
        ];

        const remainingItems = _.find(remainingItemsForRequirements, (result) => !_.isNil(result));

        if (!_.isNil(remainingItems)) {
            return remainingItems;
        }
        throw Error(`Could not parse requirement: ${requirement}`);
    }

    static impossibleRequirementRemaining(requirement) {
        if (requirement === 'Impossible') {
            return 1;
        }
        return null;
    }

    static nothingRequirementRemaining(requirement) {
        if (requirement === 'Nothing') {
            return 0;
        }
        return null;
    }

    itemCountRequirementRemaining(requirement) {
        const itemCountRequirement = LogicHelper.parseItemCountRequirement(requirement);
        if (!_.isNil(itemCountRequirement)) {
            const {
                countRequired,
                itemName,
            } = itemCountRequirement;

            const itemCount = this.getItem(itemName);
            return Math.max(countRequired - itemCount, 0);
        }
        return null;
    }

    itemRequirementRemaining(requirement) {
        const itemValue = this.getItem(requirement);
        if (!_.isNil(itemValue)) {
            if (itemValue > 0) {
                return 0;
            }
            return 1;
        }
        return null;
    }

    updateAllCounters() {
        this.totalLocations = 0;
        this.availableLocations = 0;
        this.locationsChecked = 0;
        _.forEach(this.allLocations(), (group, key) => {
            const progressLocations = _.filter(group, (loc) => !loc.nonprogress);
            const filteredLocations = _.filter(group, (loc) => !loc.checked && !loc.nonprogress);
            _.set(this.areaCounters, key, _.size(filteredLocations));
            let inLogic = 0;
            _.forEach(group, (location) => {
                if (location.inLogic && !location.checked && !location.nonprogress) {
                    inLogic++;
                }
                if (location.checked && !location.nonprogress) {
                    this.locationsChecked++;
                }
            });
            _.set(this.areaInLogicCounters, key, inLogic);
            this.totalLocations += _.size(progressLocations);
            this.availableLocations += inLogic;
        });
    }

    updateCounters(group, checked, inLogic) {
        const current = _.get(this.areaCounters, group);
        const currentInLogic = _.get(this.areaInLogicCounters, group);
        if (checked) {
            _.set(this.areaCounters, group, current - 1);
            this.locationsChecked++;
            if (inLogic) {
                _.set(this.areaInLogicCounters, group, currentInLogic - 1);
                this.availableLocations--;
            }
        } else {
            _.set(this.areaCounters, group, current + 1);
            this.locationsChecked--;
            if (inLogic) {
                _.set(this.areaInLogicCounters, group, currentInLogic + 1);
                this.availableLocations++;
            }
        }
    }

    getTotalCountForArea(group) {
        return _.get(this.areaCounters, group);
    }

    updateCountersForItem() {
        this.availableLocations = 0;
        _.forEach(this.allLocations(), (group, key) => {
            let inLogic = 0;
            _.forEach(group, (location) => {
                if (!location.nonprogress && location.inLogic && !location.checked) {
                    inLogic++;
                }
            });
            _.set(this.areaInLogicCounters, key, inLogic);
            this.availableLocations += inLogic;
        });
    }

    getInLogicCountForArea(group) {
        return _.get(this.areaInLogicCounters, group, 0);
    }

    getTotalLocationsChecked() {
        return this.locationsChecked;
    }

    getTotalLocationsInLogic() {
        return this.availableLocations;
    }

    getTotalLocations() {
        return this.totalLocations;
    }

    getTotalRemainingChecks() {
        return this.totalLocations - this.locationsChecked;
    }

    toggleDungeonRequired(dungeon) {
        _.set(this.requiredDungeons, dungeon, !_.get(this.requiredDungeons, dungeon));
        this.updatePastRequirement();
        if (this.settings.getOption('Empty Unrequired Dungeons')) {
            this.updateRaceModeBannedLocations();
            this.updateShuffleBannedLocations();
        }
        this.checkAllRequirements();
    }

    updatePastRequirement() {
        let newRequirementName = '';
        const tmsLocation = this.locations.getLocation('Sealed Grounds', 'Zelda\'s Blessing');
        let newReqs = `Can Access Sealed Temple & Goddess Harp & ${this.settings.getOption('Gate of Time Sword Requirement')} & `;
        _.forEach(this.requiredDungeons, (required, dungeon) => {
            if (!required) {
                return;
            }
            newRequirementName += `(Can Beat ${dungeon} | ${dungeon} Completed) & `;
            newReqs += `${dungeon} Completed & `;
        });
        newRequirementName = newRequirementName.slice(0, -3);
        newReqs = newReqs.slice(0, -3);
        this.requirements.set('Can Complete Required Dungeons', newRequirementName);
        tmsLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(newReqs);
        const simplifiedExpression = tmsLocation.booleanExpression.simplify({
            implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
        });
        const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
        const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
        tmsLocation.needs = readablerequirements;
    }

    updateRaceModeBannedLocations() {
        _.forEach(potentialBannedLocations, (locations, area) => {
            _.forEach(locations, (location, check) => {
                const itemLocation = this.getLocation(area, check);
                if (itemLocation.settingsNonprogress) {
                    return;
                }
                if (this.isDungeonRequired(location.requiredDungeon)) {
                    itemLocation.nonprogress = false;
                } else {
                    // dungeon is not required
                    itemLocation.nonprogress = true;
                }
            });
        });
        _.forEach(this.requiredDungeons, (required, dungeon) => {
            _.forEach(this.locationsForArea(dungeon), (location) => {
                if (required) {
                    location.nonprogress = false;
                } else {
                    location.nonprogress = true;
                }
            });
        });
        this.updateAllCounters();
    }

    updateShuffleBannedLocations() {
        // old 1.4.1 options
        const shopMode = this.settings.getOption('Shop Mode');
        const batMode = this.settings.getOption('Max Batreaux Reward');
        _.forEach(this.rawLocations, (data, name) => {
            const loctype = data.type;
            const { area, location } = Locations.splitLocationName(name);
            if (loctype !== null) {
                // have to specifically check Shopsanity being false, otherwise it being null on new versions disables Beedle
                if ((this.settings.getOption('Shopsanity') === false && loctype.includes('Beedle\'s Shop Purchases')) ||
                (!this.settings.getOption('Rupeesanity') && loctype.includes('Rupees')) ||
                (!this.settings.getOption('Tadtonesanity') && loctype.includes('Tadtones')) && location !== 'Water Dragon\'s Reward') {
                    this.getLocation(area, location).nonprogress = true;
                }
                // 1.4.1 rupeesanity & shopsanity compatibility
                if (this.settings.getOption('Rupeesanity') === 'Vanilla' && loctype.includes('Rupees')) {
                    this.getLocation(area, location).nonprogress = true;
                }
                if (shopMode !== undefined && loctype.includes('Beedle\'s Shop Purchases')) {
                    this.getLocation(area, location).nonprogress |= (shopMode === 'Vanilla');
                    if (shopMode.includes('Cheap')) {
                        this.getLocation(area, location).nonprogress |= (parseInt(location.replace(/^\D+/g, ''), 10) > 300);
                    }
                    if (shopMode.includes('Medium')) {
                        this.getLocation(area, location).nonprogress |= (parseInt(location.replace(/^\D+/g, ''), 10) > 1000);
                    }
                }
                // Post-shop split compatibility
                // have to specifically check Beedle Shopsanity being false, otherwise it being null on old versions disables Beedle
                if ((this.settings.getOption('Beedle Shopsanity') === false && loctype.includes('Beedle\'s Shop')) ||
                (!this.settings.getOption('Gear Shopsanity') && loctype.includes('Gear Shop')) ||
                (!this.settings.getOption('Potion Shopsanity') && loctype.includes('Potion Shop'))) {
                    this.getLocation(area, location).nonprogress = true;
                }
            }
            // Must check this outside the loctype block because Batreaux checks have no type. 1.4.1 batreaux compatibility
            if (batMode !== undefined && area.includes('Batreaux')) {
                this.getLocation(area, location).nonprogress |= (parseInt(location.replace(/^\D+/g, ''), 10) > batMode);
            }
        });
        this.updateAllCounters();
    }

    isDungeonRequired(dungeon) {
        const value = _.get(this.requiredDungeons, dungeon);
        return value;
    }

    toggleDungeonCompleted(dungeon) {
        const isCompleted = !_.get(this.completedDungeons, dungeon);
        _.set(this.completedDungeons, dungeon, isCompleted);
        if (isCompleted) {
            this.giveItem(`${dungeon} Completed`);
        } else {
            this.takeItem(`${dungeon} Completed`);
        }
    }

    isDungeonCompleted(dungeon) {
        return _.get(this.completedDungeons, dungeon);
    }

    getExtraChecksForArea(area) {
        const areaInfo = _.get(this.additionalLocations, area);
        return _.values(areaInfo);
    }

    toggleExtraLocationChecked(location) {
        location.checked = !location.checked;
        if (location.requirementName) {
            if (location.checked) {
                this.giveItem(location.requirementName);
            } else {
                this.takeItem(location.requirementName);
            }
        }
        if (location.additionalAction) {
            location.additionalAction(location);
        }
        this.updateCountersForItem();
    }

    getOptionValue(option) {
        return this.settings.getOption(option);
    }

    crystalClicked(crystal) {
        if (crystal.checked) {
            this.giveItem('Gratitude Crystal');
        } else {
            this.takeItem('Gratitude Crystal');
        }
    }

    getCrystalCount() {
        return this.getItem('Gratitude Crystal');
    }

    checkAllLocationsForArea(region, checked) {
        _.forEach(this.locationsForArea(region), (location) => {
            location.checked = checked;
        });
        this.updateAllCounters();
    }
}

export default Logic;

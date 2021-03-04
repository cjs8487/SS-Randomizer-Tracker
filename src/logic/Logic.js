import _, { add } from 'lodash';
import Locations from './Locations';
import LogicLoader from './LogicLoader';
import LogicHelper from './LogicHelper'
import Macros from './Macros';
import LogicTweaks from './LogicTweaks';
import goddessCubes from '../data/goddessCubes.json'
import ItemLocation from './ItemLocation';
import crystalLocations from '../data/crystals.json';

class Logic {

    async initialize(options, startingItems) {
        this.options = options;
        const logicLoader = new LogicLoader();
        const { macros, locations } = await logicLoader.loadLogicFiles();
        LogicHelper.bindLogic(this);
        this.macros = new Macros(macros);
        this.locations = new Locations(locations, options);
        this.items = {};
        this.max = {
            progressiveSword: 6,
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
            slingshot: 1,
            progressiveBeetle: 2,
            bombBag: 1,
            gustBellows: 1,
            whip: 1,
            clawshots: 1,
            bow: 1,
            bugNet: 1,
            seaChart: 1,
            lanayruCavesSmallKey: 1,
            emptyBottle: 5,
            progressivePouch: 1,
            spiralCharge: 1,
            enteredSkyview: 1,
            enteredEarthTemple: 1,
            enteredLanayruMiningFacility: 1,
            enteredAncientCistern: 1,
            enteredSandship: 1,
            enteredFireSanctuary: 1,
            enteredSkykeep: 1,
            svName: 1,
            etName: 1,
            lmfName: 1,
            acName: 1,
            sshName: 1,
            fsName: 1,
            skName: 1,
            swBossKey: 1,
            etBossKey: 1,
            lmfBossKey: 1,
            acBossKey: 1,
            ssBossKey: 1,
            fsBossKey: 1,
            triforce: 3,
            swSmallKey: 2,
            keyPiece: 5,
            lmfSmallKey: 1,
            acSmallKey: 2,
            ssSmallKey: 2,
            fsSmallKey: 3,
            skSmallKey: 1,
            skyviewCompleted: 1,
            earthTempleCompleted: 1,
            lanayruMiningFacilityCompleted: 1,
            ancientCisternCompleted: 1,
            sandshipCompleted: 1,
            fireSanctuaryCompleted: 1,
            skyKeepCompleted: 1,
        }

        LogicTweaks.applyTweaks(this, options);
        _.forEach(startingItems, (item) => {
            this.giveItem(item);
        })

        this.areaCounters = {};
        this.areaInLogicCounters = {};
        this.totalLocations = 0;
        this.locationsChecked = 0;
        this.availableLocations = 0;
        this.requiredDungeons = {};
        this.completedDungeons = {};
        this.additionalLocations = {};
        this.fivePacks = 0;
        this.maxFivePacks = 13;
        this.cubeList = {};

        _.forEach(goddessCubes, (cube, cubeMacro) => {
            let nonprogress = false;
            if (cube.type.split(',').some(type => options.bannedLocations.includes(type.trim()))) {
                nonprogress = true;
            }
            const extraLocation = ItemLocation.emptyLocation();
            extraLocation.name = cube.displayName;
            extraLocation.logicSentence = cube.needs;
            extraLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(cube.needs)
            const simplifiedExpression = extraLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            extraLocation.needs = readablerequirements;
            extraLocation.macroName = cubeMacro;
            extraLocation.nonprogress = nonprogress
            _.set(this.additionalLocations, [cube.area, cubeMacro], extraLocation);
            _.set(this.max, _.camelCase(cubeMacro), 1)
            _.set(this.cubeList, cubeMacro, extraLocation); 
        });
        this.crystalClicked = this.crystalClicked.bind(this);
        _.forEach(crystalLocations, (crystal, crystalMacro) => {
            const extraLocation = ItemLocation.emptyLocation();
            extraLocation.name = crystal.displayName;
            extraLocation.logicSentence = crystal.needs;
            extraLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(crystal.needs);
            const simplifiedExpression = extraLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            extraLocation.needs = readablerequirements;
            extraLocation.additionalAction = this.crystalClicked;
            _.set(this.additionalLocations, [crystal.area, crystalMacro], extraLocation);
            _.set(this.max, _.camelCase(crystalMacro), 1)
        });
        this.locations.updateLocationLogic();
        // do an initial requirements check to ensure nothing requirements and starting items are properly considered
        this.checkAllRequirements();
        _.forEach(this.allLocations(), (group, key) => {
            const filteredLocations = _.filter(group, (loc) => !loc.nonprogress)
            _.set(this.areaCounters, key, _.size(filteredLocations));
            let inLogic = 0;
            _.forEach(filteredLocations, (location) => {
                if (location.inLogic) {
                    inLogic++;
                }
            });
            _.set(this.areaInLogicCounters, key, inLogic);
            this.totalLocations += _.size(filteredLocations);
            this.availableLocations += inLogic;
        });
        this.hasItem = this.hasItem.bind(this);
        this.isRequirementMet = this.isRequirementMet.bind(this)
        this.itemsRemainingForRequirement = this.itemsRemainingForRequirement.bind(this);
    }

    loadFrom(logic) {
        this.macros = new Macros();
        this.macros.initialize(logic.macros.macros)
        this.locations = new Locations();
        this.locations.initialize(logic.locations.locations)
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
            cube.booleanExpression = LogicHelper.booleanExpressionForRequirements(cube.logicSentence)
            const simplifiedExpression = cube.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            cube.needs = readablerequirements;
        });
        _.forEach(this.additionalLocations, (area) => {
            _.forEach(area, (additionalLocation) => {
                additionalLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(additionalLocation.logicSentence)
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

    macros() {
        return this.macros.all();
    }

    getMacro(macro) {
        return this.macros.getMacro(macro)
    }

    allLocations() {
        return this.locations.all();
    }

    areas() {
        return this.locations.allAreas();
    }

    locationsForArea(area) {
        return this.locations.locationsForArea(area)
    }

    getLocation(area, location) {
        return this.locations.getLocation(area, location);
    }

    locationNeeds(area, location) {
        const itemLocation = this.locations.getLocation(area, location);
        return itemLocation.needs;
    }

    giveItem(item) {
        if (item === "5 Gratitude Crystal") {
            this.fivePacks = this.fivePacks + 1;
            this.incrementItem("Gratitude Crystal", 5);
        } else {
            this.incrementItem(item);
        }
    }

    takeItem(item) {
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
                if (location.name === "True Master Sword" && location.inLogic) {
                    // In this case, we know all the requirements to complete all dungeons and raise and open GoT are met, so check if all dungeons are complete
                    if(location.checked) {
                        location.logicalState = "checked";
                        return;
                    }
                    let allDungeonsComplete = true;
                    _.forEach(this.requiredDungeons, (required, dungeon) => {
                        if (required && !_.get(this.completedDungeons, dungeon)) {
                            allDungeonsComplete = false;
                        }
                    })
                    // if they are,the location is fully in logic
                    if (allDungeonsComplete) {
                        location.logicalState = "inLogic"
                    } else {
                        // otherwise it is in semi-logic
                        location.logicalState = "semiLogic"
                    }
                } else {
                    location.logicalState = this.getLogicalState(location.needs, location.inLogic, location.checked)
                }
            });
            _.forEach(this.getExtraChecksForArea(area), location => {
                location.inLogic = this.areRequirementsMet(location.booleanExpression)
                location.logicalState = this.getLogicalState(location.needs, location.inLogic, location.checked)
            });
        });
    }

    /*
    Determines the logic state of a location, based on tracker restrictions. Used for deeper logical rendering and information display.
    The following logical sttes exist, and are used for determing text color in the location tracker
    - in-logic: when the location is completelyin logic
    - out-logic: location is strictly out of logic
    - semi-logic: location is not accessible logically, but the missing items are in a restricted subset of locations (i.e. dungeons wihtout keysanity)
        Also used for cube tracking to show a chest that is accesible but the cube has not been struck or is unmarked, and Batreaux rewards when crystal
        sanity is disbled
    - glitched-logic: obtainable with glitches (and would be expected in gltiched logic) but only when glitched logic is not required
    */
    getLogicalState(requirements, inLogic, complete) {
        // evaluate for special handling of logical state for locations that have more then 2 logical states
        // the following types of conditions cause multiple logical states
        //  - cubes: can be semi-logic when the cube is obtainable but not marked
        //  - glitched logic tracking: locations that are accessible outside of logic using glitches, only applicable when glitched logic is not active (unimplemented)
        //  - dungeons: locations that are only missing keys (unimplemented)
        //  - batreaux rewards: takes accessible loose crystals into account (even before obtained) (unimplemented)
        if (complete) {
            return "checked"
        }
        if (inLogic) {
            return "inLogic"
        }
        let logicState = "outLogic"
        requirements.forEach(requirement => {
            _.forEach(requirement, (item) => {
                if (item.item.includes("Goddess Cube")) {
                    if (_.get(this.cubeList, item.item).logicalState === "inLogic") {
                        logicState = "semiLogic"
                    }
                }
            });
        })
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
            this.impossibleRequirementRemaining(requirement),
            this.nothingRequirementRemaining(requirement),
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

    impossibleRequirementRemaining(requirement) {
        if (requirement === "Impossible") {
            return 1;
        }
        return null;
    }

    nothingRequirementRemaining(requirement) {
        if (requirement === "Nothing") {
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

    updateCounters(group, checked, inLogic) {
        const current = _.get(this.areaCounters, group)
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
                if (location.inLogic && !location.checked) {
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
        this.updatePastMacro();
    }

    updatePastMacro(dungeons) {
        // let newMacro = this.parseLogicExpression("Goddess Harp & Master Sword")
        let newMacroString = ""
        let tmsLocation = this.locations.getLocation("Sealed Grounds", "True Master Sword");
        let newReqs = "Can Access Sealed Temple & Goddess Harp & Master Sword & "
        _.forEach(this.requiredDungeons, (required, dungeon) => {
            if (!required) {
                return;
            }
            newMacroString += `(Can Beat ${dungeon} | ${dungeon} Completed) & `
            if (dungeon === "Skykeep") {
                dungeon = "Sky Keep" //account for inconsistent spellings
            }
            newReqs += `${dungeon} Completed & `
        });
        newMacroString = newMacroString.slice(0, -3)
        newReqs = newReqs.slice(0, -3);
        console.log(newMacroString)
        this.macros.setMacro("Can Complete Required Dungeons", newMacroString);
        // this.locations.updateLocationLogic();
        tmsLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(newReqs)
        const simplifiedExpression = tmsLocation.booleanExpression.simplify({
            implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
        });
        const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
        const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
        tmsLocation.needs = readablerequirements;
    }

    isDungeonRequired(dungeon) {
        return _.get(this.requiredDungeons, dungeon);
    }

    toggleDungeonCompleted(dungeon) {
        const isCompleted = !_.get(this.completedDungeons, dungeon);
        _.set(this.completedDungeons, dungeon, isCompleted)
        if (isCompleted) {
            this.giveItem(`${dungeon} Completed`)
        } else {
            this.takeItem(`${dungeon} Completed`)
        }
    }

    isDungeonCompleted(dungeon) {
        return _.get(this.completedDungeons, dungeon);
    }

    getExtraChecksForArea(area) {
        const areaInfo = _.get(this.additionalLocations, area);
        return _.values(areaInfo);
    }

    toggleExtraLocationChecked(area, location) {
        location.checked = !location.checked;
        if (location.macroName) {
            if (location.checked) {
                this.giveItem(location.macroName);
            } else {
                this.takeItem(location.macroName);
            }
        }
        if (location.additionalAction) {
            location.additionalAction(location);
        }
        this.updateCountersForItem();
    }

    getOptionValue(option) {
        return _.get(this.options, option)
    }

    crystalClicked(crystal) {
        if (crystal.checked) {
            this.giveItem("Gratitude Crystal")
        } else {
            this.takeItem("Gratitude Crystal")
        }
    }

    getCrystalCount() {
        return this.getItem("Gratitude Crystal");
    }
}

export default Logic;
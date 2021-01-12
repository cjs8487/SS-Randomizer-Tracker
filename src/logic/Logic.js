import _ from 'lodash';
import BooleanExpression from './BooleanExpression'
import Locations from './Locations';
import LogicLoader from './LogicLoader';
import LogicHelper from './LogicHelper'
import Macros from './Macros';

class Logic {

    async initialize() {
        const logicLoader = new LogicLoader();
        const { macros, locations } = await logicLoader.loadLogicFiles();
        LogicHelper.bindLogic(this);
        this.macros = new Macros(macros);
        this.locations = new Locations(locations);
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
            gratitudeCrystal: 16,
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
            svEntered: 1,
            etEntered: 1,
            lmfEntered: 1,
            acEntered: 1,
            sshEntered: 1,
            fsEntered: 1,
            skEntered: 1,
            svName: 1,
            etName: 1,
            lmfName: 1,
            acName: 1,
            sshName: 1,
            fsName: 1,
            skName: 1,
            svBossKey: 1,
            etBossKey: 1,
            lmfBossKey: 1,
            acBossKey: 1,
            sshBossKey: 1,
            fsBossKey: 1,
            triforce: 3,
            svSmall: 2,
            svSmall_1: 0,
            svSmall_2: 0,
            etEntry: 5,
            lmfSmall: 1,
            acSmall: 2,
            acSmall_1: 0,
            acSmall_2: 0,
            sshSmall: 2,
            sshSmall_1: 0,
            sshSmall_2: 0,
            fsSmall: 3,
            fsSmall_1: 0,
            fsSmall_2: 0,
            fsSmall_3: 0,
            skSmall: 1,
        }
        const areaCounters = {};
        _.forEach(this.allLocations(), (group, key) => {
            areaCounters[key] = _.size(group)
        });
        this.areaCounters = areaCounters;
        this.areaInLogicCounters = {};
        this.hasItem = this.hasItem.bind(this);
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
        this.incrementItem(item);
    }

    takeItem(item) {
        const current = this.getItem(item);
        if (current === 0) {
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

    incrementItem(item) {
        const current = this.getItem(item);
        let newCount;
        if (current < _.get(this.max, _.camelCase(item))) {
            newCount = current + 1;
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
                    let allDungeonsComplete = true;
                    this.state.requiredDungeons.forEach(dungeon => {
                        if (!this.state.completedDungeons.includes(dungeon)) {
                            allDungeonsComplete = false;
                        }
                    })
                    // if they are,the location is fully in logic
                    if (allDungeonsComplete) {
                        location.logicalState = "in-logic"
                    } else {
                        // otherwise it is in semi-logic
                        location.logicalState = "semi-logic"
                    }
                } else {
                    location.logicalState = this.getLogicalState(location.needs, location.inLogic)
                }
            });
        });
        // this.state.goddessCubes.forEach(cube => {
        //     cube.inLogic = this.meetsCompoundRequirement(cube.logicExpression)
        //     cube.logicalState = this.getLogicalState(cube.logicExpression, cube.inLogic)
        // });
    }

    /*
    Determines the logic state of a location, based on tracker restrictions. Used for deeper logical rendering and information display.
    The following logical sttes exist, and are used for determing text color in the location tracker
    - in-logic: when the location is completelyin logic
    - out-logic: location is strictly out of logic
    - semi-logic: location is not accessible logically, but the missing items are in a restricted subset of locations (i.e. dungeons wihtout keysanity)
        Also used for cube tracking to show a chest that is accesible but the cube has not been struck or is unmarked, and Batreaux rewards when crystal
        sanity is disbled
    - glitched-logic: ubtainable with glitches (and would be expected in gltiched logic) but only when glitched logic is not required
    */
    getLogicalState(requirements, inLogic) {
        // evaluate for special handling of logica state for locations that have more then 2 logical states
        // the following types of conditions cause multiple logical states
        //  - cubes: can be semi-logic when the cube is obtainable but not marked
        //  - glitched logic tracking: locations that are accessible outside of logic using glitches, only applicable when glitched logic is not active (unimplemented)
        //  - dungeons: locations that are only missing keys (unimplemented)
        //  - batreaux rewards: takes accessible loose crystals into account (even before obtained) (unimplemented)
        if (inLogic) {
            return "inLogic"
        }
        let logicState = "outLogic"
        requirements.forEach(requirement => {
            if (requirement.includes("Goddess Cube")) {
                if (this.meetsCompoundRequirement(this.parseMacro(requirement))) {
                    logicState = "semiLogic"
                }
            }
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

    updateCounters(group, checked) {
        const current = _.get(this.areaCounters, group)
        if (checked) {
            _.set(this.areaCounters, group, current - 1);
        } else {
            _.set(this.areaCounters, group, current + 1);
        }
    }

    getTotalCountForArea(group) {
        return _.get(this.areaCounters, group);
    }

    updateCountersForItem() {
        _.forEach(this.allLocations(), (group, key) => {
            let inLogic = 0;
            // console.log(group)
            _.forEach(group, (location) => {
                console.log(location.inLogic)
                if (location.inLogic) {
                    inLogic++;
                }
            });
            console.log(inLogic)
            _.set(this.areaInLogicCounters, key, inLogic);
        });
    }

    getInLogicCountForArea(group) {
        return _.get(this.areaInLogicCounters, group, 0);
    }
}

export default Logic;
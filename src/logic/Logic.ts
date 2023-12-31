import _ from 'lodash';
import LogicLoader from './LogicLoader';
import LogicHelper from './LogicHelper';
import Requirements from './Requirements';
import LogicTweaks from './LogicTweaks';
import goddessCubes from '../data/goddessCubes.json';
import ItemLocation from './ItemLocation';
import crystalLocations from '../data/crystals.json';
import potentialBannedLocations from '../data/potentialBannedLocations.json';
import logicFileNames from '../data/logicModeFiles.json';
import Settings from '../permalink/Settings';
import BooleanExpression from './BooleanExpression';
import { InventoryItem, isItem } from '../state/tracker/Inventory';
import { completionRequirementToDungeon, splitLocationName } from './Locations';

class Logic {
    // @ts-expect-error ts(2564)
    settings: Settings;
    // @ts-expect-error ts(2564)
    requirements: Requirements;


    flatLocations: ItemLocation[] = [];
    locations: Record<string, Record<string, ItemLocation>> = {};
    additionalLocations: Record<string, Record<string, ItemLocation>> = {};

    cubeList: Record<string, ItemLocation> = {};
    crystalList: Record<string, ItemLocation> = {};
    
    async initialize(settings: Settings, source: string) {
        this.settings = settings;
        console.log(settings.getOption('Logic Mode'));
        const { requirements, locations, hints } = await LogicLoader.loadLogicFiles(_.get(logicFileNames, settings.getOption('Logic Mode')), source);
        this.requirements = new Requirements(requirements);

        _.forEach(locations, (data, id) => {
            const {
                area,
                location,
            } = splitLocationName(id);
            const logicSentence = this.requirements.get(id);
            const itemLocation: ItemLocation = {
                id,
                area,
                name: location,
                logicSentence,
                rawType: data.type,
            };

            const dungeonName = completionRequirementToDungeon[id];
            if (dungeonName) {
                itemLocation.giveItemOnCheck = `${dungeonName} Completed`;
            }
            _.set(this.locations, [area, location], itemLocation);
        });

        LogicTweaks.applyTweaks(this.requirements, settings);

        _.forEach(goddessCubes, (cube, cubeRequirementName) => {
            const requirement = this.getRequirement(`Can Reach ${cubeRequirementName}`);
            const extraLocation: ItemLocation = {
                id: cubeRequirementName,
                area: cube.area,
                name: cube.displayName,
                logicSentence: requirement,
                giveItemOnCheck: cubeRequirementName,
                rawType: cube.type,
            }
            _.set(this.additionalLocations, [cube.area, cubeRequirementName], extraLocation);
            _.set(this.cubeList, cubeRequirementName, extraLocation);
        });

        _.forEach(crystalLocations, (crystal, crystalRequirementName) => {
            const crystalRequirementFullName = `${crystal.area} - ${crystalRequirementName}`;
            const requirement = this.getRequirement(crystalRequirementFullName);
            const extraLocation: ItemLocation = {
                id: crystalRequirementFullName,
                area: crystal.area,
                name: crystal.displayName,
                logicSentence: requirement,
                rawType: 'loose gratitude crystals',
                isLooseGratitudeCrystal: true,
            }
            delete this.locations[crystal.area]?.[crystalRequirementName];
            _.set(this.additionalLocations, [crystal.area, crystalRequirementName], extraLocation);
            _.set(this.crystalList, crystalRequirementName, extraLocation);
        });
        _.forEach(hints, (_hint, hintName) => {
            const { area, location } = splitLocationName(hintName);
            const requirement = this.getRequirement(hintName);
            const extraLocation: ItemLocation = {
                id: hintName,
                area,
                name: location,
                logicSentence: requirement,
                rawType: 'gossip stones',
            }
            _.set(this.additionalLocations, [area, location], extraLocation);
        });
        this.isRequirementMet = this.isRequirementMet.bind(this);
        this.itemsRemainingForRequirement = this.itemsRemainingForRequirement.bind(this);
    }

    getRequirement(requirement: string) {
        return this.requirements.get(requirement);
    }

    allLocations() {
        return this.locations;
    }

    areas() {
        return Object.keys(this.locations);
    }

    locationsForArea(area: string) {
        return this.locations[area];
    }

    getLocation(area: string, location: string) {
        return this.locations[area]?.[location];
    }

    areRequirementsMet(requirements: BooleanExpression, itemCounts: Record<InventoryItem, number>, additionalItems: Record<string, number>) {
        return requirements.evaluate(
            (requirement) => this.isRequirementMet(requirement, itemCounts, additionalItems),
        );
    }

    isRequirementMet(requirement: string, itemCounts: Record<InventoryItem, number>, additionalItems: Record<string, number>) {
        const itemsRemaining = this.itemsRemainingForRequirement(requirement, itemCounts, additionalItems);
        return itemsRemaining === 0;
    }

    itemsRemainingForRequirement(requirement: string, itemCounts: Record<InventoryItem, number>, additionalItems: Record<string, number>) {
        const remainingItemsForRequirements = [
            Logic.impossibleRequirementRemaining(requirement),
            Logic.nothingRequirementRemaining(requirement),
            this.itemCountRequirementRemaining(requirement, itemCounts, additionalItems),
            this.itemRequirementRemaining(requirement, itemCounts, additionalItems),
            // this.hasAccessedOtherLocationRequirementRemaining(requirement),
        ];

        const remainingItems = _.find(remainingItemsForRequirements, (result) => !_.isNil(result));

        if (!_.isNil(remainingItems)) {
            return remainingItems;
        }
        throw Error(`Could not parse requirement: ${requirement}`);
    }

    static impossibleRequirementRemaining(requirement: string) {
        if (requirement === 'Impossible') {
            return 1;
        }
        return null;
    }

    static nothingRequirementRemaining(requirement: string) {
        if (requirement === 'Nothing') {
            return 0;
        }
        return null;
    }

    itemCountRequirementRemaining(requirement: string, itemCounts: Record<InventoryItem, number>, additionalItems: Partial<Record<string, number>>) {
        const itemCountRequirement = LogicHelper.parseItemCountRequirement(requirement);
        if (!_.isNil(itemCountRequirement)) {
            const {
                countRequired,
                itemName,
            } = itemCountRequirement;

            const itemCount = isItem(itemName) ? itemCounts[itemName] : additionalItems[itemName];
            if (_.isNil(itemCount)) {
                throw new Error('failed to find item count ' + itemName);
            }
            return Math.max(countRequired - itemCount, 0);
        }
        return null;
    }

    itemRequirementRemaining(requirement: string, itemCounts: Record<InventoryItem, number>, additionalItems: Partial<Record<string, number>>) {
        const itemValue = isItem(requirement) ? itemCounts[requirement] : additionalItems[requirement];
        if (!_.isNil(itemValue)) {
            if (itemValue > 0) {
                return 0;
            }
            return 1;
        }
        return null;
    }

    getExtraChecksForArea(area: string) {
        return _.values(this.additionalLocations[area]);
    }
}

export default Logic;

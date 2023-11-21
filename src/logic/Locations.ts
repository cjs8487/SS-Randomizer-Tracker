import _ from 'lodash';
import ItemLocation from './ItemLocation';
import LogicHelper from './LogicHelper';
import Settings from '../permalink/Settings';
import Requirements from './Requirements';
import { RawLocations } from './UpstreamTypes';

class Locations {
    // @ts-expect-error ts(2564)
    locations: {[area: string]: {[location: string]: ItemLocation}} | null;
    // @ts-expect-error ts(2564)
    bannedLocations: string[];
    // @ts-expect-error ts(2564)
    bannedAreas: string[];

    constructor();
    constructor(locationsFile: RawLocations, requirements: Requirements, settings: Settings);

    constructor(locationsFile?: RawLocations, requirements?: Requirements, settings?: Settings) {
        if (!settings) return;
        this.locations = {};
        this.bannedLocations = settings.getOption('Excluded Locations') as string[];
        _.forEach(locationsFile, (data, name) => {
            let nonprogress = this.bannedLocations.includes(name);
            const {
                area,
                location,
            } = Locations.splitLocationName(name);
            let maxRelics = settings.getOption('Trial Treasure Amount') as number;
            if (!settings.getOption('Treasuresanity in Silent Realms')) {
                maxRelics = 0;
            }
            if (area.includes('Silent Realm')) {
                nonprogress ||= (parseInt(location.replace(/^\D+/g, ''), 10) > maxRelics);
            }
            const itemLocation = ItemLocation.emptyLocation();
            itemLocation.name = location;
            itemLocation.logicSentence = requirements!.get(name);
            itemLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(requirements!.get(name));
            const simplifiedExpression = itemLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            itemLocation.needs = readablerequirements;
            itemLocation.nonprogress = nonprogress;
            itemLocation.settingsNonprogress = nonprogress;
            this.setLocation(area, location, itemLocation);
        });
        this.bannedAreas = [];
    }

    initialize(locations: {[area: string]: {[location: string]: ItemLocation}}) {
        this.locations = locations;
        // _.forEach(this.allAreas(), (area) => {
        //     _.forEach(this.locationsForArea(area), (location) => {
        //         location.booleanExpression = LogicHelper.booleanExpressionForRequirements(location.logicSentence)
        //         const simplifiedExpression = location.booleanExpression.simplify({
        //             implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
        //         });
        //         const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
        //         const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
        //         location.needs = readablerequirements;
        //     });
        // });
        this.updateLocationLogic();
    }

    reset() {
        this.locations = null;
    }

    all() {
        return this.locations;
    }

    allAreas() {
        const areas = _.keys(this.locations);
        // @ts-expect-error ts(2345)
        return _.without(areas, this.bannedAreas);
    }

    mapLocations<T>(locationIteratee: (areaName: string, location: string) => T) {
        const newLocations = {};
        _.forEach(this.locations, (areaData, areaName) => {
            _.forEach(_.keys(areaData), (location) => {
                _.set(newLocations, [areaName, location], locationIteratee(areaName, location));
            });
        });
        return newLocations;
    }

    locationsForArea(area: string) {
        const areaInfo = _.get(this.locations, area);
        if (!areaInfo) {
            throw Error(`Area ${area} not found`);
        }
        return _.values(areaInfo);
    }

    getLocation(area: string, location: string) {
        if (!_.has(this.locations, [area, location])) {
            throw Error(`Location not found: ${area} - ${location}`);
        }
        return _.get(this.locations, [area, location])!;
    }

    setLocation(area: string, location: string, itemLocation: ItemLocation) {
        _.set(this.locations!, [area, location], itemLocation);
    }

    deleteLocation(area: string, location: string) {
        _.unset(this.locations, [area, location]);
    }

    static splitLocationName(name: string) {
        const locationElements = name.split(' - ');
        return {
            area: locationElements[0].trim(),
            location: locationElements.splice(1).join(' - ').trim(),
        };
    }

    updateLocationLogic() {
        _.forEach(this.locations!, (group) => {
            _.forEach(group, (location) => {
                location.booleanExpression = LogicHelper.booleanExpressionForRequirements(location.logicSentence);
                const simplifiedExpression = location.booleanExpression.simplify({
                    implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
                });
                const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
                const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
                location.needs = readablerequirements;
            });
        });
    }

    banArea(area: string) {
        _.pull(this.bannedAreas, area);
    }

    unbanArea(area: string) {
        this.bannedAreas.push(area);
    }
}

export default Locations;

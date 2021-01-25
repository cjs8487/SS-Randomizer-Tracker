import _ from 'lodash';
import ItemLocation from './ItemLocation';
import LogicHelper from './LogicHelper';

class Locations {
    constructor(locationsFile) {
        this.locations = {};
        _.forEach(locationsFile, (data, name) => {
            const {
                area,
                location,
            } = Locations.splitLocationName(name);
            const itemLocation = ItemLocation.emptyLocation();
            itemLocation.name = location;
            itemLocation.logicSentence = data.Need;
            itemLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(data.Need);
            const simplifiedExpression = itemLocation.booleanExpression.simplify({
                implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
            });
            const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
            const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
            itemLocation.needs = readablerequirements;
            this.setLocation(area, location, itemLocation);
        });
    }

    initialize(locations) {
        this.locations = locations;
    }

    reset() {
        this.locations = null;
    }

    all() {
        return this.locations;
    }

    allAreas() {
        return _.keys(this.locations);
    }

    mapLocations(locationIteratee) {
        const newLocations = {};
        _.forEach(this.locations, (areaData, areaName) => {
            _.forEach(_.keys(areaData), (location) => {
                _.set(newLocations, [areaName, location], locationIteratee(areaName, location));
            });
        });
        return newLocations;
    }

    locationsForArea(area) {
        const areaInfo = _.get(this.locations, area);
        if (!areaInfo) {
            throw Error(`Area ${area} not found`);
        }
        return _.values(areaInfo);
    }

    getLocation(area, location) {
        if (!_.has(this.locations, [area, location])) {
            throw Error(`Location not found: ${area} - ${location}`);
        }
        return _.get(this.locations, [area, location]);
    }

    setLocation(area, location, itemLocation) {
        _.set(this.locations, [area, location], itemLocation);
    }

    deleteLocation(area, location) {
        _.unset(this.locations, [area, location]);
    }

    static splitLocationName(name) {
        const locationElements = name.split('-');
        return {
            area: locationElements[0].trim(),
            location: locationElements.splice(1).join().trim(),
        };
    }

    updateLocationLogic() {
        _.forEach(this.locations, (group) => {
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
}

export default Locations;

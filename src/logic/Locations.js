import _ from 'lodash';
import ItemLocation from './ItemLocation';
import LogicHelper from './LogicHelper';

class Locations {
    constructor(locationsFile, requirements, settings) {
        this.locations = {};
        this.bannedLocations = settings.getOption('Excluded Locations');
        _.forEach(locationsFile, (data, name) => {
            let nonprogress = false;
            // temporary fix for mismatched names
            let tempName = name.replace('Knight Academy -', 'Upper Skyloft -');
            tempName = tempName.replace('Beedle -', 'Beedle\'s Shop -');
            tempName = tempName.replace('Batreaux -', 'Batreaux\'s House -');
            tempName = tempName.replace('Faron Soth', 'Water Dragon\'s Reward');
            tempName = tempName.replace('Lanayru Soth', 'Thunder Dragon\'s Reward');
            tempName = tempName.replace('Harp Minigame', '- Harp Minigame');
            if (this.bannedLocations.includes(tempName)) {
                nonprogress = true;
            }
            // replaces last dash with double dash (as in new minigame names)
            let minigameName = [...tempName].reverse().join('');
            minigameName = [...minigameName.replace('-', '--')].reverse().join('');
            if (this.bannedLocations.includes(minigameName)) {
                nonprogress = true;
            }
            const {
                area,
                location,
            } = Locations.splitLocationName(name);
            const shopMode = settings.getOption('Shop Mode');
            let maxBeedle;
            if (shopMode === 'Vanilla') {
                maxBeedle = 0;
            } else if (shopMode === 'Randomized - Cheap') {
                maxBeedle = 300;
            } else if (shopMode === 'Randomized - Medium') {
                maxBeedle = 1000;
            } else {
                maxBeedle = 1600;
            }
            if (area === 'Batreaux') {
                nonprogress = (parseInt(location.replace(/^\D+/g, ''), 10) > settings.getOption('Max Batreaux Reward'));
            }
            if (area === 'Beedle') {
                nonprogress = (parseInt(location.replace(/^\D+/g, ''), 10) > maxBeedle);
            }
            const itemLocation = ItemLocation.emptyLocation();
            itemLocation.name = location;
            itemLocation.logicSentence = requirements.get(name);
            itemLocation.booleanExpression = LogicHelper.booleanExpressionForRequirements(requirements.get(name));
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

    initialize(locations) {
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
        return _.without(areas, this.bannedAreas);
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
        const locationElements = name.split(' - ');
        return {
            area: locationElements[0].trim(),
            location: locationElements.splice(1).join(' - ').trim(),
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

    banArea(area) {
        _.pull(this.bannedAreas, area);
    }

    unbanArea(area) {
        this.bannedAreas.push(area);
    }
}

export default Locations;

import _ from 'lodash'

class Locations {
    constructor(locationsFile) {
        this.locations = {};
        _.forEach(locationsFile, (data, name) => {
            const {
                area,
                location
            } = this.splitLocationName(name);
            const filteredData = _.pick(data, ['Need', 'type'])
            _.forEach(filteredData, (value, key) => {
                this.setLocation(area, location, _.camelCase(key), value)
            });
        });
    }

    initialize(locations) {
        this.locations = locations;
    }

    reset() {
        this.locations = null;
    }

    KEYS = {
        NEED: 'need',
        TYPE: 'type',
    }

    all() {
        return this.locations;
    }

    allAreas() {
        return _.keys(this.locations)
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
        return _.keys(areaInfo);
    }

    getLocation(area, location, key) {
        if (!_.has(this.locations, [area, location])) {
            throw Error(`Location not found: ${area} - ${location}`)
        }
        return _.get(this.locations, [area, location, key]);
    }

    setLocation(area, location, key, value) {
        _.set(this.locations, [area, location, key], value);
    }

    splitLocationName(name) {
        const locationElements = name.split('-');
        return {
            area: locationElements[0].trim(),
            location: locationElements.splice(1).join().trim(),
        }
    }
}

export default Locations;
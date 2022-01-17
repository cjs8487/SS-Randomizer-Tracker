import _ from 'lodash';

class Requirements {
    constructor(requirementsFile) {
        if (requirementsFile) {
            this.requirements = requirementsFile;
        } else {
            this.requirements = null;
        }
    }

    initialize(requirementsFile) {
        this.requirements = requirementsFile;
    }

    reset() {
        this.requirements = null;
    }

    all() {
        return this.requirements;
    }

    get(requirementName) {
        return _.get(this.requirements, requirementName);
    }

    set(requirementName, value) {
        _.set(this.requirements, requirementName, value);
    }

    remove(requirementName) {
        _.unset(this.requirements, requirementName);
    }
}

export default Requirements;

import _ from 'lodash';

type RequirementsData = Record<string, string>;

class Requirements {
    requirements: RequirementsData | null;
    constructor(requirementsFile?: RequirementsData) {
        if (requirementsFile) {
            this.requirements = requirementsFile;
        } else {
            this.requirements = null;
        }
    }

    initialize(requirementsFile: RequirementsData) {
        this.requirements = requirementsFile;
    }

    reset() {
        this.requirements = null;
    }

    all() {
        return this.requirements;
    }

    get(requirementName: string) {
        return _.get(this.requirements!, requirementName);
    }

    set(requirementName: string, value: string) {
        _.set(this.requirements!, requirementName, value);
    }

    remove(requirementName: string) {
        _.unset(this.requirements, requirementName);
    }

    clone() {
        return new Requirements({ ...this.requirements });
    }
}

export default Requirements;

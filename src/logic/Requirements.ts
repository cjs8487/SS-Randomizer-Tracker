import _ from 'lodash';
import { RequirementsList } from './LogicLoader';

class Requirements {
    requirements: RequirementsList;

    constructor(requirementsFile: RequirementsList) {
        if (requirementsFile) {
            this.requirements = requirementsFile;
        } else {
            this.requirements = {};
        }
    }

    initialize(requirementsFile: RequirementsList) {
        this.requirements = requirementsFile;
    }

    reset() {
        this.requirements = {};
    }

    all() {
        return this.requirements;
    }

    get(requirementName: string) {
        return _.get(this.requirements, requirementName);
    }

    set(requirementName: string, value: string) {
        _.set(this.requirements, requirementName, value);
    }

    remove(requirementName: string) {
        _.unset(this.requirements, requirementName);
    }
}

export default Requirements;

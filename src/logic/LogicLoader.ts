import yaml from 'js-yaml';
import { RawHints, RawLocations, RawRequirements } from './UpstreamTypes';
import { MultiChoiceOption, Option } from '../permalink/SettingsTypes';
import _ from 'lodash';

class LogicLoader {
    static async loadLogicFiles(branch: string) {
        const [
            requirements,
            locations,
            hints,
            options
        ] = await Promise.all([
            LogicLoader.loadLogicFile<RawRequirements>('SS Rando Logic - Glitchless Requirements.yaml', branch),
            LogicLoader.loadLogicFile<RawLocations>('checks.yaml', branch),
            LogicLoader.loadLogicFile<RawHints>('hints.yaml', branch),
            LogicLoader.loadLogicFile<Option[]>('options.yaml', branch),
        ]);

        // correctly load the choices for excluded locations
        const excludedLocs = options.find(
            (x) => x.command === 'excluded-locations',
        )! as MultiChoiceOption;
        excludedLocs.choices = [];
        _.forEach(locations, (_data, location) => {
            excludedLocs.choices.push(location);
        });

        return { requirements, locations, hints, options };
    }

    static async loadLogicFile<T>(file: string, branch: string) {
        const fileUrl = this.logicFileUrl(file, branch);
        const data = await this.loadFileFromUrl(fileUrl);
        return yaml.load(data) as T;
    }

    static async loadFileFromUrl(url: string) {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error('failed to load ' +  url);
        }
        return response.text();
    }

    static logicFileUrl(file: string, branch: string) {
        return `https://raw.githubusercontent.com/ssrando/ssrando/${branch}/${file}`;
    }
}

export default LogicLoader;

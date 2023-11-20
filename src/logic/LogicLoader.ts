import yaml from 'js-yaml';
import { RawHints, RawLocations, RawRequirements } from './UpstreamTypes';

class LogicLoader {
    static async loadLogicFiles(logicFile: string, branch: string) {
        const requirements = await LogicLoader.loadLogicFile<RawRequirements>(logicFile, branch);
        const locations = await LogicLoader.loadLogicFile<RawLocations>('checks.yaml', branch);
        const hints = await LogicLoader.loadLogicFile<RawHints>('hints.yaml', branch);
        return { requirements, locations, hints };
    }

    static async loadLogicFile<T>(file: string, branch: string) {
        const fileUrl = this.logicFileUrl(file, branch);
        const data = await this.loadFileFromUrl(fileUrl);
        return yaml.load(data) as T;
    }

    static async loadFileFromUrl(url: string) {
        const response = await fetch(url);
        return response.text();
    }

    static logicFileUrl(file: string, branch: string) {
        return `https://raw.githubusercontent.com/ssrando/ssrando/${branch}/${file}`;
    }
}

export default LogicLoader;

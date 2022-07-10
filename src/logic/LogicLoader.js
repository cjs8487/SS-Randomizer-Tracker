import yaml from 'js-yaml';

class LogicLoader {
    static async loadLogicFiles(logicFile) {
        const requirements = await LogicLoader.loadLogicFile(logicFile);
        const locations = await LogicLoader.loadLogicFile('checks.yaml');
        const hints = await LogicLoader.loadLogicFile('hints.yaml');
        return { requirements, locations, hints };
    }

    static async loadLogicFile(file) {
        const fileUrl = this.logicFileUrl(file);
        const data = await this.loadFileFromUrl(fileUrl);
        return yaml.load(data);
    }

    static async loadFileFromUrl(url) {
        const response = await fetch(url);
        return response.text();
    }

    static logicFileUrl(file) {
        return `https://raw.githubusercontent.com/ssrando/ssrando/master/${file}`;
    }
}

export default LogicLoader;

import yaml from 'js-yaml';

class LogicLoader {
    static async loadLogicFiles(logicFile, branch) {
        console.log(branch);
        const requirements = await LogicLoader.loadLogicFile(logicFile, branch);
        const locations = await LogicLoader.loadLogicFile('checks.yaml', branch);
        const hints = await LogicLoader.loadLogicFile('hints.yaml', branch);
        return { requirements, locations, hints };
    }

    static async loadLogicFile(file, branch) {
        const fileUrl = this.logicFileUrl(file, branch);
        const data = await this.loadFileFromUrl(fileUrl);
        return yaml.load(data);
    }

    static async loadFileFromUrl(url) {
        const response = await fetch(url);
        return response.text();
    }

    static logicFileUrl(file, branch) {
        return `https://raw.githubusercontent.com/ssrando/ssrando/${branch}/${file}`;
    }
}

export default LogicLoader;

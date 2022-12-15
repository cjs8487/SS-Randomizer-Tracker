import yaml from 'js-yaml';

class LogicLoader {
    static async loadLogicFiles(logicFile) {
        const requirements = await LogicLoader.loadLogicFile(logicFile);
        const locations = await LogicLoader.loadLogicFile('checks.yaml');
        return { requirements, locations };
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
        return `https://raw.githubusercontent.com/ssrando/ssrando/1843d46a5561bb7a0d9d1826b23e91bdd984c52d/${file}`;
    }
}

export default LogicLoader;

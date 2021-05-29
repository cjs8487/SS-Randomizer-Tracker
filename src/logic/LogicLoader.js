import yaml from 'js-yaml';

class LogicLoader {
    static async loadLogicFiles() {
        const requirements = await LogicLoader.loadLogicFile('SS%20Rando%20Logic%20-%20Requirements.yaml');
        const locations = await LogicLoader.loadLogicFile('checks.yaml');
        return { requirements, locations };
    }

    static async loadLogicFile(file) {
        const fileUrl = this.logicFileUrl(file);
        const data = await this.loadFileFromUrl(fileUrl);
        return yaml.safeLoad(data);
    }

    static async loadFileFromUrl(url) {
        const response = await fetch(url);
        return response.text();
    }

    static logicFileUrl(file) {
        return `https://raw.githubusercontent.com/yannl35133/sslib/logic/${file}`;
    }
}

export default LogicLoader;

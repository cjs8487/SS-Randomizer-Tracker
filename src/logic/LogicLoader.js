import yaml from 'js-yaml';

class LogicLoader {
    static async loadLogicFiles() {
        const macros = await LogicLoader.loadLogicFile('SS%20Rando%20Logic%20-%20Macros.yaml');
        const locations = await LogicLoader.loadLogicFile('SS%20Rando%20Logic%20-%20Item%20Location.yaml');
        return { macros, locations };
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
        return `https://raw.githubusercontent.com/lepelog/sslib/shopsanity/${file}`;
    }
}

export default LogicLoader;

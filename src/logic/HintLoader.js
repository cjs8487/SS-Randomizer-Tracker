import yaml from 'js-yaml';

class LogicLoader {
    static async loadHintFiles() {
        const hints = await LogicLoader.loadLogicFile('hints.yaml');
        return hints;
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
        return `https://raw.githubusercontent.com/lepelog/sslib/hints/${file}`;
    }
}

export default LogicLoader;

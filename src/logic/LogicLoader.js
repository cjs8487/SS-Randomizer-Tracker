import _ from 'lodash';
import yaml from 'js-yaml';

class LogicLoader {
    async loadLogicFiles() {
        const macros = await this.loadLogicFile('SS%20Rando%20Logic%20-%20Macros.yaml');
        const locations = await this.loadLogicFile('SS%20Rando%20Logic%20-%20Item%20Location.yaml')
        return { macros, locations };
    }

    async loadLogicFile(file) {
        const fileUrl = this.logicFileUrl(file);
        const data = await this.loadFileFromUrl(fileUrl);
        return yaml.safeLoad(data);
    }

    async loadFileFromUrl(url) {
        const response = await fetch(url);
        return await response.text();
    }

    logicFileUrl(file) {
        return `https://raw.githubusercontent.com/lepelog/sslib/7b3b4e28a6c45e0c36a6564a482b116a7303e2f1/${file}`
    }
}

export default LogicLoader;
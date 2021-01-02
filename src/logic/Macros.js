import _ from 'lodash'

class Macros {
    constructor(macrosFile) {
        if (macrosFile) {
            this.macros = macrosFile;
        } else {
            this.macros = null;
        }
    }

    initialize(macrosFile) {
        this.macros = macrosFile;
    }

    reset() {
        this.macros = null;
    }

    all() {
        return this.macros;
    }

    getMacro(macroName) {
        return _.get(this.macros, macroName);
    }

    setMacro(macroName, value) {
        _.set(this.macros, macroName, value)
    }
}

export default Macros;
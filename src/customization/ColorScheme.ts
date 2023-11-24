class ColorScheme {
    outLogic: string;
    inLogic: string;
    semiLogic: string;
    background: string;
    text: string;
    required: string;
    unrequired: string;
    checked: string;

    constructor() {
        this.outLogic = '#FF0000';
        this.inLogic = '#00AFFF';
        this.semiLogic = '#FFA500';
        this.background = '#FFFFFF';
        this.text = '#000000';
        this.required = '#004FFF';
        this.unrequired = '#808080';
        this.checked = '#303030';
    }
}

export default ColorScheme;

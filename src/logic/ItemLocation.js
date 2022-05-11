class ItemLocation {
    constructor(name, logicSentence, booleanExpression, needs, inLogic, logicalState, checked, nonprogress, settingsNonprogress, item) {
        this.name = name;
        this.logicSentence = logicSentence;
        this.booleanExpression = booleanExpression;
        this.needs = needs;
        this.inLogic = inLogic;
        this.logicalState = logicalState;
        this.checked = checked;
        this.nonprogress = nonprogress;
        this.settingsNonprogress = settingsNonprogress;
        this.item = item;
    }

    static emptyLocation() {
        return new ItemLocation('', '', null, [], false, 'out-logic', false, false, false, '');
    }
}

export default ItemLocation;

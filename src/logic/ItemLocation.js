class ItemLocation {
    constructor(name, logicSentence, booleanExpression, needs, inLogic, logicalState, checked, types) {
        this.name = name;
        this.logicSentence = logicSentence;
        this.booleanExpression = booleanExpression;
        this.needs = needs;
        this.inLogic = inLogic;
        this.logicalState = logicalState;
        this.checked = checked;
    }

    static emptyLocation() {
        return new ItemLocation('', '', null, [], false, 'out-logic', false)
    }
}

export default ItemLocation;
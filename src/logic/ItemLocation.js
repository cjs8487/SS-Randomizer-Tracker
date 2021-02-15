class ItemLocation {
    constructor(name, logicSentence, booleanExpression, needs, inLogic, logicalState, checked, nonprogress) {
        this.name = name;
        this.logicSentence = logicSentence;
        this.booleanExpression = booleanExpression;
        this.needs = needs;
        this.inLogic = inLogic;
        this.logicalState = logicalState;
        this.checked = checked;
        this.nonprogress = nonprogress;
    }

    static emptyLocation() {
        return new ItemLocation('', '', null, [], false, 'out-logic', false, false);
    }
}

export default ItemLocation;

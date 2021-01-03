class ItemLocation {
    constructor(name, booleanExpression, needs, inLogic, logicalState, checked) {
        this.name = name;
        this.booleanExpression = booleanExpression;
        this.needs = needs;
        this.inLogic = inLogic;
        this.logicalState = logicalState;
        this.checked = checked;
    }

    static emptyLocation() {
        return new ItemLocation('', null, [], false, 'out-logic', false)
    }
}

export default ItemLocation;
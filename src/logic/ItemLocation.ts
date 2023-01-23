import BooleanExpression from './BooleanExpression';

type LogicalState = 'in-logic' | 'out-logic'

class ItemLocation {
    name: string;
    logicSentence: string;
    booleanExpression: BooleanExpression | null;
    needs: string[];
    inLogic: boolean;
    logicalState: LogicalState;
    checked: boolean;
    nonprogress: boolean;
    settingsNonprogress: boolean;
    item: string;

    constructor(name: string, logicSentence: string, booleanExpression: BooleanExpression | null, needs: string[], inLogic: boolean, logicalState: LogicalState, checked: boolean, nonprogress: boolean, settingsNonprogress: boolean, item: string) {
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

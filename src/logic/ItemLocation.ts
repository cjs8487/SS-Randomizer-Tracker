import type BooleanExpression from "./BooleanExpression";
import { type ReadableRequirement } from "./LogicHelper";

export type LogicalState = 'checked' | 'inLogic' | 'semiLogic' | 'outLogic';

class ItemLocation {
    name: string;
    logicSentence: string;
    booleanExpression: BooleanExpression;
    needs: ReadableRequirement[][];
    inLogic: boolean;
    logicalState: LogicalState;
    checked: boolean;
    nonprogress: boolean;
    settingsNonprogress: boolean;
    item: string;
    additionalAction: ((loc: ItemLocation) => void) | undefined = undefined;
    requirementName?: string;

    constructor(name: string, logicSentence: string, booleanExpression: BooleanExpression, needs: ReadableRequirement[][], inLogic: boolean, logicalState: LogicalState, checked: boolean, nonprogress: boolean, settingsNonprogress: boolean, item: string) {
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
        return new ItemLocation('', '', null!, [], false, 'outLogic', false, false, false, '');
    }
}

export default ItemLocation;

import ItemLocation from '../../logic/ItemLocation';
import { ReadableRequirement } from '../../logic/LogicHelper';

export type LogicalState = 'checked' | 'inLogic' | 'semiLogic' | 'outLogic';

export interface LocationState {
    staticLocation: ItemLocation;
    nonProgress: boolean;
    logicalState: LogicalState;
    inLogic: boolean;
    needs: ReadableRequirement[][];
}

export interface AreaState {
    numLocations: number;
    numLocationsInLogic: number;
    numRemainingLocations: number;

    locations: LocationState[];
    extraLocations: LocationState[];
}
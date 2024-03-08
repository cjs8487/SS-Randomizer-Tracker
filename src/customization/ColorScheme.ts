import { LogicalState } from '../selectors/LogicOutput';

export type ColorScheme = { [logicalState in LogicalState]: string } & {
    background: string;
    text: string;
    required: string;
    unrequired: string;
};

export const lightColorScheme: ColorScheme = {
    outLogic: '#FF0000',
    inLogic: '#00AFFF',
    semiLogic: '#FFA500',
    background: '#FFFFFF',
    text: '#000000',
    required: '#004FFF',
    unrequired: '#808080',
    checked: '#303030',
};

export const darkColorScheme: ColorScheme = {
    ...lightColorScheme,
    background: '#000000',
    text: '#FFFFFF',
    checked: '#B6B6B6',
};

export default ColorScheme;

import ItemLocation from "./logic/ItemLocation";

export type GroupClickCallback = (group: string) => void;
export type LocationClickCallback = (group: stirng, location: ItemLocation, forceState?: boolean) => void;
export type DungeonClickCallback = (dungeon: string) => void;
export type CubeClickCallback = (location: string) => void;
export type ItemClickCallback = (item: string, take: boolean) => void;
export type ModalCloseCallback = () => void;
export type MarkerClickCallback = (region: string) => void;
export type HintClickCallback = (region: string, hint: string) => void;
export type EntranceBindCallback = (entrance: string, region: string) => void;
export type CheckAllClickCallback = (region: string, checked: boolean) => void;
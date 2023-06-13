import ItemLocation from "./logic/ItemLocation";

export type GroupClickCallback = (group: string) => void;
export type LocationClickCallback = (group: stirng, location: ItemLocation, forceState?: boolean) => void;
export type DungeonClickCallback = (dungeon: string) => void;
export type CubeClickCallback = (location: string) => void;
export type ItemClickCallback = (item: string, take: boolean) => void;
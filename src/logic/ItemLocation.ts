export interface ItemLocation {
    id: string;
    area: string;
    name: string;

    /** The type from RawLocation */
    rawType: string;

    giveItemOnCheck?: string;

    logicSentence: string;
}

export default ItemLocation;

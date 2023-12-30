export interface ItemLocation {
    id: string;
    area: string;
    name: string;

    // TODO this will be consolidated to a more generic `type`
    isLooseGratitudeCrystal?: boolean;
    /** The type from RawLocation */
    rawType: string;

    giveItemOnCheck?: string;

    logicSentence: string;
}

export default ItemLocation;

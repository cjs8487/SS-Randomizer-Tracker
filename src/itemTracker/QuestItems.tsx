import { CSSProperties } from 'react';
import Item from './Item';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';
import CrystalCounter from './items/sidequest/CrystalCounter';

import questItemBlock from '../assets/quest_items_block.png';

import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import { ItemClickCallback } from '../callbacks';

type QuestItemProps = {
    logic: Logic;
    handleItemClick: ItemClickCallback;
    styleProps: CSSProperties;
    colorScheme: ColorScheme;
};

const QuestItems = (props: QuestItemProps) => {
    const width = Number(props.styleProps.width || 0);

    const letterWidth = width / 6.5;
    const cBeetleWidth = width / 6.5;
    const rattleWidth = width / 6.5;
    const crystalWidth = width / 8;

    return (
        <div id="quest-items">
            <img src={questItemBlock} alt="" width={width} />
            <div
                style={{
                    position: 'relative',
                    bottom: width * 0.18 + 900 / width,
                    left: width / 14,
                }}
            >
                <Item
                    itemName="Cawlin's Letter"
                    logic={props.logic}
                    onChange={props.handleItemClick}
                    imgWidth={letterWidth}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    bottom: width * 0.2 + 300 / width,
                    left: width / 3.26,
                }}
            >
                <Item
                    itemName="Horned Colossus Beetle"
                    logic={props.logic}
                    onChange={props.handleItemClick}
                    imgWidth={cBeetleWidth}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    bottom: width * 0.205 + 200 / width,
                    left: width / 1.85,
                }}
            >
                <Item
                    itemName="Baby Rattle"
                    logic={props.logic}
                    onChange={props.handleItemClick}
                    imgWidth={rattleWidth}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    bottom: width * 0.19 + 400 / width,
                    left: width / 1.26,
                }}
            >
                <GratitudeCrystals
                    logic={props.logic}
                    onChange={props.handleItemClick}
                    imgWidth={crystalWidth}
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    bottom: width * 0.15,
                    left: width * 0.9,
                }}
            >
                <CrystalCounter
                    current={props.logic.getCrystalCount()}
                    colorScheme={props.colorScheme}
                    fontSize={crystalWidth * 1.25}
                />
            </div>
        </div>
    );
};

export default QuestItems;

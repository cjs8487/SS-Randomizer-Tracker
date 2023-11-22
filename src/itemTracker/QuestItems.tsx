import { CSSProperties } from 'react';
import Item from './Item';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';
import CrystalCounter from './items/sidequest/CrystalCounter';

import questItemBlock from '../assets/quest_items_block.png';

import Logic from '../logic/Logic';
import { ItemClickCallback } from '../callbacks';

type QuestItemProps = {
    logic: Logic;
    handleItemClick: ItemClickCallback;
    styleProps: CSSProperties;
};

const QuestItems = (props: QuestItemProps) => {
    const width = Number(props.styleProps.width || 0);

    const letterWidth = width / 6.5;
    const cBeetleWidth = width / 6.5;
    const rattleWidth = width / 6.5;
    const crystalWidth = width / 8;

    const letterStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.18 + 900 / width,
        left: width / 14,
    };
    const cBeetleStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.2 + 300 / width,
        left: width / 3.26,
    };
    const rattleStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.205 + 200 / width,
        left: width / 1.85,
    };
    const crystalStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.19 + 400 / width,
        left: width / 1.26,
    };

    const counterStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.15,
        left: width * 0.9,
    };

    return (
        <div id="quest-items">
            <img src={questItemBlock} alt="" width={width} />
            <div style={letterStyle}>
                <Item itemName="Cawlin's Letter" logic={props.logic} onChange={props.handleItemClick} imgWidth={letterWidth} />
            </div>
            <div style={cBeetleStyle}>
                <Item itemName="Horned Colossus Beetle" logic={props.logic} onChange={props.handleItemClick} imgWidth={cBeetleWidth} />
            </div>
            <div style={rattleStyle}>
                <Item itemName="Baby Rattle" logic={props.logic} onChange={props.handleItemClick} imgWidth={rattleWidth} />
            </div>
            <div style={crystalStyle}>
                <GratitudeCrystals logic={props.logic} onChange={props.handleItemClick} imgWidth={crystalWidth} />
            </div>
            <div style={counterStyle}>
                <CrystalCounter current={props.logic.getCrystalCount()} fontSize={crystalWidth * 1.25} />
            </div>
        </div>
    );
};

export default QuestItems;

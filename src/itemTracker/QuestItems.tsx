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
            <div style={{ position: 'absolute', top: 0 }}>
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width,
                        paddingLeft: width / 12,
                        paddingRight: width / 7,
                        transform: 'translate(0, 25%)',
                    }}
                >
                    <Item
                        itemName="Cawlin's Letter"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={letterWidth}
                        ignoreItemClass
                    />
                    <Item
                        itemName="Horned Colossus Beetle"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={cBeetleWidth}
                        ignoreItemClass
                    />
                    <Item
                        itemName="Baby Rattle"
                        logic={props.logic}
                        onChange={props.handleItemClick}
                        imgWidth={rattleWidth}
                        ignoreItemClass
                    />

                    <div>
                        <GratitudeCrystals
                            logic={props.logic}
                            onChange={props.handleItemClick}
                            imgWidth={crystalWidth}
                        />
                        <div
                            style={{
                                position: 'relative',
                                bottom: '-10%',
                                left: '90%',
                            }}
                        >
                            <CrystalCounter
                                current={props.logic.getCrystalCount()}
                                colorScheme={props.colorScheme}
                                fontSize={crystalWidth * 1.25}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestItems;

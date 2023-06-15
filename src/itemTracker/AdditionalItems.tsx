import { CSSProperties } from 'react';
import Item from './Item';

import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import { ItemClickCallback } from '../callbacks';
import miscItemBlock from '../assets/misc_items_block.png';

type AdditionalItemsProps = {
    handleItemClick: ItemClickCallback;
    logic: Logic;
    colorScheme: ColorScheme;
    styleProps: CSSProperties;
};

const AdditionalItems = ({
    handleItemClick,
    logic,
    colorScheme,
    styleProps,
}: AdditionalItemsProps) => {

    const width = styleProps.width as number;
    const pouchStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.425 + 400 / width,
        left: width * 0.08,
    };
    const bottleStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.425 + 600 / width,
        left: width * 0.31,
    };
    const chargeStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.65 + 2000 / width,
        left: width * 0.54,
    };
    const tadtoneStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.63 + 2400 / width,
        left: width * 0.785,
    };
    const keyStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.64 + 4000 / width,
        left: width * 0.08,
    };
    const chartStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.72 + 3600 / width,
        left: width * 0.35,
    };
    const fruitStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.71 + 4000 / width,
        left: width * 0.542,
    };
    const scrapperStyle: CSSProperties = {
        position: 'relative',
        bottom: width * 0.715 + 4000 / width,
        left: width * 0.785,
    };

    const keyWidth = width / 6.5;
    const chartWidth = width / 10;
    const chargeWidth = width / 6.5;
    const pouchWidth = width / 6.5;
    const bottleWidth = width / 6.5;
    const fruitWidth = width / 6.5;
    const tadtoneWidth = width / 7;
    const scrapperWidth = width / 6.5;
    return (
        <div
            id="misc-items"
        >
            <img src={miscItemBlock} alt="" width={width} />
            <div style={pouchStyle}>
                <Item itemName="Progressive Pouch" logic={logic} onChange={handleItemClick} imgWidth={pouchWidth} />
            </div>
            <div style={bottleStyle}>
                <Item itemName="Empty Bottle" logic={logic} onChange={handleItemClick} imgWidth={bottleWidth} />
                <p style={{ fontSize: width * 0.12, position: 'relative', left: '11%', bottom: `-${bottleWidth * 0.3}px`, color: colorScheme.text }}>{logic.getItem('Empty Bottle')}</p>
            </div>
            <div style={chargeStyle}>
                <Item itemName="Spiral Charge" logic={logic} onChange={handleItemClick} imgWidth={chargeWidth} />
            </div>
            <div style={tadtoneStyle}>
                <Item itemName="Group of Tadtones" logic={logic} onChange={handleItemClick} imgWidth={tadtoneWidth} />
                <p style={{ fontSize: width * 0.12, position: 'relative', left: '10%', bottom: `-${tadtoneWidth * 0.25}px`, color: colorScheme.text }}>{logic.getItem('Group of Tadtones')}</p>
            </div>
            <div style={keyStyle}>
                <Item itemName="Lanayru Caves Small Key" logic={logic} onChange={handleItemClick} imgWidth={keyWidth} />
                <p style={{ margin: 0, fontSize: width / 20, color: colorScheme.text, position: 'relative', top: `${keyWidth * 0.75}px`, left: '1%' }}>Caves</p>
            </div>
            <div style={chartStyle}>
                <Item itemName="Sea Chart" logic={logic} onChange={handleItemClick} imgWidth={chartWidth} />
            </div>
            <div style={fruitStyle}>
                <Item itemName="Life Tree Fruit" logic={logic} onChange={handleItemClick} imgWidth={fruitWidth} />
            </div>
            <div style={scrapperStyle}>
                <Item itemName="Scrapper" logic={logic} onChange={handleItemClick} imgWidth={scrapperWidth} />
            </div>
        </div>
    );
};

export default AdditionalItems;

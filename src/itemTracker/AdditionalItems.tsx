import { CSSProperties } from 'react';
import Item from './Item';

import miscItemBlock from '../assets/misc_items_block.png';
import { useSelector } from 'react-redux';
import { itemCountSelector } from '../selectors/Inventory';

type AdditionalItemsProps = {
    styleProps: CSSProperties;
};

const AdditionalItems = ({
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

    const numTadtones = useSelector(itemCountSelector('Group of Tadtones'));
    const numBottles = useSelector(itemCountSelector('Empty Bottle'));

    return (
        <div
            id="misc-items"
        >
            <img src={miscItemBlock} alt="" width={width} />
            <div style={pouchStyle}>
                <Item itemName="Progressive Pouch" imgWidth={pouchWidth} />
            </div>
            <div style={bottleStyle}>
                <Item itemName="Empty Bottle" imgWidth={bottleWidth} />
                <p style={{ fontSize: width * 0.12, position: 'relative', left: '11%', bottom: `-${bottleWidth * 0.3}px` }}>{numBottles}</p>
            </div>
            <div style={chargeStyle}>
                <Item itemName="Spiral Charge" imgWidth={chargeWidth} />
            </div>
            <div style={tadtoneStyle}>
                <Item itemName="Group of Tadtones" imgWidth={tadtoneWidth} />
                <p style={{ fontSize: width * 0.12, position: 'relative', left: '10%', bottom: `-${tadtoneWidth * 0.25}px` }}>{numTadtones}</p>
            </div>
            <div style={keyStyle}>
                <Item itemName="Lanayru Caves Small Key" imgWidth={keyWidth} />
                <p style={{ margin: 0, fontSize: width / 20, position: 'relative', top: `${keyWidth * 0.75}px`, left: '1%' }}>Caves</p>
            </div>
            <div style={chartStyle}>
                <Item itemName="Sea Chart" imgWidth={chartWidth} />
            </div>
            <div style={fruitStyle}>
                <Item itemName="Life Tree Fruit" imgWidth={fruitWidth} />
            </div>
            <div style={scrapperStyle}>
                <Item itemName="Scrapper" imgWidth={scrapperWidth} />
            </div>
        </div>
    );
};

export default AdditionalItems;

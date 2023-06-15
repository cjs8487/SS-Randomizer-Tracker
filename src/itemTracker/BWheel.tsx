import { CSSProperties } from 'react';
import Item from './Item';
import Logic from '../logic/Logic';
import { ItemClickCallback } from '../callbacks';
import wheel from '../assets/b wheel.png';

type BWheelProps = {
    logic: Logic;
    handleItemClick: ItemClickCallback;
    styleProps: CSSProperties;
};

const BWheel = ({ logic, handleItemClick, styleProps }: BWheelProps) => {
    const wid = Number(styleProps.width || 0);

    const beetleWidth = wid / 5.2;
    const slingshotWidth = wid / 6.5;
    const bombsWidth = wid / 6.5;
    const bugNetWidth = wid / 6.5;
    const bowWidth = wid / 5.5;
    const clawshotsWidth = wid / 4.6;
    const whipWidth = wid / 5.5;
    const bellowsWidth = wid / 5.2;

    return (
        <div id="BWheel">
            <img src={wheel} alt="" width={wid} />
            <div
                id="beetle"
                style={{
                    position: 'relative',
                    bottom: wid / 1.75 + 600 / wid,
                    left: wid / 1.33,
                }}
            >
                <Item
                    itemName="Progressive Beetle"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={beetleWidth}
                />
            </div>
            <div
                id="slingshot"
                style={{
                    position: 'relative',
                    bottom: wid / 3.85 + 600 / wid,
                    left: wid / 2.3,
                }}
            >
                <Item
                    itemName="Progressive Slingshot"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={slingshotWidth}
                />
            </div>
            <div
                id="bombs"
                style={{
                    position: 'relative',
                    bottom: wid / 1.22 + 600 / wid,
                    left: wid / 1.51,
                }}
            >
                <Item
                    itemName="Bomb Bag"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={bombsWidth}
                />
            </div>
            <div
                id="bugnet"
                style={{
                    position: 'relative',
                    bottom: wid / 2.9 + 600 / wid,
                    left: wid / 1.51,
                }}
            >
                <Item
                    itemName="Progressive Bug Net"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={bugNetWidth}
                />
            </div>
            <div
                id="bow"
                style={{
                    position: 'relative',
                    bottom: wid / 1.09 + 600 / wid,
                    left: wid / 2.4,
                }}
            >
                <Item
                    itemName="Progressive Bow"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={bowWidth}
                />
            </div>
            <div
                id="clawshots"
                style={{
                    position: 'relative',
                    bottom: wid / 2.9 + 600 / wid,
                    left: wid / 6.8,
                }}
            >
                <Item
                    itemName="Clawshots"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={clawshotsWidth}
                />
            </div>
            <div
                id="whip"
                style={{
                    position: 'relative',
                    bottom: wid / 1.75 + 600 / wid,
                    left: wid / 13,
                }}
            >
                <Item
                    itemName="Whip"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={whipWidth}
                />
            </div>
            <div
                id="gustBellows"
                style={{
                    position: 'relative',
                    bottom: wid / 1.22 + 600 / wid,
                    left: wid / 6,
                }}
            >
                <Item
                    itemName="Gust Bellows"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={bellowsWidth}
                />
            </div>
        </div>
    );
};

export default BWheel;

import { CSSProperties } from 'react';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import Item from './Item';
import CrystalCounter from './items/sidequest/CrystalCounter';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';

import noTablets from '../assets/tablets/no_tablets.png';
import CounterItem from './items/CounterItem';
import { ItemClickCallback } from '../callbacks';

type GridTrackerProps = {
    logic: Logic;
    handleItemClick: ItemClickCallback;
    styleProps: CSSProperties;
    colorScheme: ColorScheme;
};

const GridTracker = ({
    logic,
    handleItemClick,
    styleProps,
    colorScheme,
}: GridTrackerProps) => {
    const handleExtraWalletClick = () => {
        handleItemClick('Extra Wallet', false);
    };

    const emeraldTabletStyle: CSSProperties = {
        position: 'absolute',
        left: '100%',
        bottom: '0%',
        transform: 'translate(-100%)',
    };

    const rubyTabletStyle: CSSProperties = {
        position: 'absolute',
        left: '100%',
        top: '0%',
        transform: 'translate(-100%)',
    };

    const amberTabletStyle: CSSProperties = {
        position: 'absolute',
        left: '0%',
        top: '0%',
    };

    let imgWidth = styleProps.width as number / 10;
    const maxHeight = styleProps.height as number;
    if (maxHeight < imgWidth * 8) {
        imgWidth = maxHeight / 8;
    }
    const emptyTabWidth = imgWidth * 2.5;
    const emeraldWidth = emptyTabWidth * 0.54;
    const rubyWidth = emptyTabWidth * 0.74;
    const amberWidth = emptyTabWidth * 0.505;

    return (
        <table>
            <tbody>
                <tr>
                    <td rowSpan={2}>
                        <Item
                            itemName="Progressive Sword"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Beetle"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Slingshot"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Bomb Bag"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Bug Net"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td rowSpan={2} colSpan={2}>
                        <div style={{ position: 'relative' }}>
                            <img src={noTablets} alt="" width={emptyTabWidth} />
                            <Item
                                styleProps={amberTabletStyle}
                                imgWidth={amberWidth}
                                itemName="Amber Tablet"
                                logic={logic}
                                onChange={handleItemClick}
                            />
                            <Item
                                styleProps={emeraldTabletStyle}
                                imgWidth={emeraldWidth}
                                itemName="Emerald Tablet"
                                logic={logic}
                                onChange={handleItemClick}
                            />
                            <Item
                                styleProps={rubyTabletStyle}
                                imgWidth={rubyWidth}
                                itemName="Ruby Tablet"
                                logic={logic}
                                onChange={handleItemClick}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Item
                            itemName="Progressive Bow"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Clawshots"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Whip"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Gust Bellows"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 'small',
                                color: colorScheme.text,
                            }}
                        >
                            Caves
                        </p>
                        <Item
                            itemName="Lanayru Caves Small Key"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Sea Chart"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Spiral Charge"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Pouch"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <CounterItem
                            itemName="Empty Bottle"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            fontSize={imgWidth * 0.5}
                            colorScheme={colorScheme}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <div style={{ position: 'relative', top: '-5px' }}>
                            <Item
                                itemName="Progressive Wallet"
                                logic={logic}
                                onChange={handleItemClick}
                                imgWidth={imgWidth}
                            />
                        </div>
                        <div
                            style={{
                                position: 'relative',
                                left: '0%',
                                top: '20px',
                            }}
                            onClick={handleExtraWalletClick}
                            onKeyDown={handleExtraWalletClick}
                            tabIndex={0}
                            role="button"
                        >
                            <CrystalCounter
                                current={`+${
                                    logic.getItem('Extra Wallet') * 300
                                }`}
                                colorScheme={colorScheme}
                                fontSize={imgWidth * 0.4}
                            />
                        </div>
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Mitts"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Item
                            itemName="Goddess's Harp"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Ballad of the Goddess"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Farore's Courage"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Nayru's Wisdom"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Din's Power"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <div style={{ position: 'relative' }}>
                            <CounterItem
                                itemName="Song of the Hero"
                                logic={logic}
                                onChange={handleItemClick}
                                imgWidth={imgWidth}
                                colorScheme={colorScheme}
                                fontSize={imgWidth * 0.5}
                                grid
                                ignoreItemClass
                            />
                        </div>
                    </td>
                    <td>
                        <Item
                            itemName="Triforce"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Item
                            itemName="Water Dragon's Scale"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Fireshield Earrings"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Cawlin's Letter"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Horned Colossus Beetle"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Baby Rattle"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <div>
                            <GratitudeCrystals
                                logic={logic}
                                onChange={handleItemClick}
                                imgWidth={imgWidth}
                                grid
                            />
                        </div>
                        <div
                            style={{
                                position: 'relative',
                                bottom: '100%',
                                pointerEvents: 'none',
                            }}
                        >
                            <CrystalCounter
                                current={logic.getCrystalCount()}
                                colorScheme={colorScheme}
                                fontSize={imgWidth * 0.5}
                            />
                        </div>
                    </td>
                    <td>
                        <Item
                            itemName="Life Tree Fruit"
                            logic={logic}
                            onChange={handleItemClick}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <CounterItem
                            itemName="Group of Tadtones"
                            logic={logic}
                            onChange={handleItemClick}
                            colorScheme={colorScheme}
                            fontSize={imgWidth / 2}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item itemName="Scrapper" logic={logic} onChange={handleItemClick} imgWidth={imgWidth} ignoreItemClass />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default GridTracker;

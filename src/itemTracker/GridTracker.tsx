import { CSSProperties } from 'react';
import Item from './Item';
import CrystalCounter from './items/sidequest/CrystalCounter';
import GratitudeCrystals from './items/sidequest/GratitudeCrystals';

import noTablets from '../assets/tablets/no_tablets.png';
import CounterItem from './items/CounterItem';
import { useDispatch, useSelector } from 'react-redux';
import { itemCountSelector, totalGratitudeCrystalsSelector } from '../state/tracker/Selectors';
import { clickItem } from '../state/tracker/Slice';

type GridTrackerProps = {
    styleProps: CSSProperties;
};

const GridTracker = ({
    styleProps,
}: GridTrackerProps) => {
    const dispatch = useDispatch();
    const handleExtraWalletClick = () => {
        dispatch(clickItem({ item: 'Extra Wallet', take: false }));
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

    const crystalCount = useSelector(totalGratitudeCrystalsSelector);
    const walletCount = useSelector(itemCountSelector('Extra Wallet'));

    return (
        <table>
            <tbody>
                <tr>
                    <td rowSpan={2}>
                        <Item
                            itemName="Progressive Sword"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Beetle"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Slingshot"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Bomb Bag"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Bug Net"
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
                            />
                            <Item
                                styleProps={emeraldTabletStyle}
                                imgWidth={emeraldWidth}
                                itemName="Emerald Tablet"
                            />
                            <Item
                                styleProps={rubyTabletStyle}
                                imgWidth={rubyWidth}
                                itemName="Ruby Tablet"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Item
                            itemName="Progressive Bow"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Clawshots"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Whip"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Gust Bellows"
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
                            }}
                        >
                            Caves
                        </p>
                        <Item
                            itemName="Lanayru Caves Small Key"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Sea Chart"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Spiral Charge"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Pouch"

                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <CounterItem
                            itemName="Empty Bottle"
                            imgWidth={imgWidth}
                            fontSize={imgWidth * 0.5}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <div style={{ position: 'relative', top: '-5px' }}>
                            <Item
                                itemName="Progressive Wallet"
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
                                current={`+${walletCount * 300}`}
                                fontSize={imgWidth * 0.4}
                            />
                        </div>
                    </td>
                    <td>
                        <Item
                            itemName="Progressive Mitts"
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
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Ballad of the Goddess"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Farore's Courage"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Nayru's Wisdom"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Din's Power"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <div style={{ position: 'relative' }}>
                            <CounterItem
                                itemName="Song of the Hero"
                                imgWidth={imgWidth}
                                fontSize={imgWidth * 0.5}
                                grid
                                ignoreItemClass
                            />
                        </div>
                    </td>
                    <td>
                        <Item
                            itemName="Triforce"
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
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Fireshield Earrings"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Cawlin's Letter"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Horned Colossus Beetle"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item
                            itemName="Baby Rattle"
                            imgWidth={imgWidth}
                            grid
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <div>
                            <GratitudeCrystals
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
                                current={crystalCount}
                                fontSize={imgWidth * 0.5}
                            />
                        </div>
                    </td>
                    <td>
                        <Item
                            itemName="Life Tree Fruit"
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <CounterItem
                            itemName="Group of Tadtones"
                            fontSize={imgWidth / 2}
                            imgWidth={imgWidth}
                            ignoreItemClass
                        />
                    </td>
                    <td>
                        <Item itemName="Scrapper" imgWidth={imgWidth} ignoreItemClass />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default GridTracker;

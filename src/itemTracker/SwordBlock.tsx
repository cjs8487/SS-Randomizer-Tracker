import { CSSProperties } from 'react';
import Item from './Item';
import allImages from './Images';
import swordBlock from '../assets/Sword_Block.png';

import CrystalCounter from './items/sidequest/CrystalCounter';
import keyDownWrapper from '../KeyDownWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { itemCountSelector } from '../state/tracker/Selectors';
import { clickItem } from '../state/tracker/Slice';

type SwordBlockProperties = {
    styleProps: CSSProperties;
};

const SwordBlock = (props: SwordBlockProperties) => {
    const dispatch = useDispatch();
    const handleExtraWalletClick = () => {
        dispatch(clickItem({ item: 'Extra Wallet', take: false }));
    };

    const wid = Number(props.styleProps.width || 0);

    const swordStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 0.84 - 1 / wid,
        left: wid / 2.85,
    };

    const faroresFlameStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.07 - 1 / wid,
        left: wid / 1.36,
    };

    const nayrusFlameStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.12 - 1 / wid,
        left: wid / 20,
    };

    const dinsFlameStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 0.69 - 1 / wid,
        left: wid / 2.55,
    };

    const walletStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 2.46 - 1 / wid,
        left: wid / 1.6,
    };
    const extraWalletStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 4.6 - 1 / wid,
        left: wid / 1.2,
    };

    const swordWidth = wid / 3.1;
    const flameWidth = wid / 4.4;
    const walletWidth = wid / 3;

    const walletCount = useSelector(itemCountSelector('Extra Wallet'));

    return (
        <div id="BWheel">
            <img src={swordBlock} alt="" width={wid} />
            <div id="sword" style={swordStyle}>
                <Item
                    itemName="Progressive Sword"
                    imgWidth={swordWidth}
                />
            </div>
            <div id="faroresFlame" style={faroresFlameStyle}>
                <Item
                    itemName="Progressive Sword"
                    images={allImages["Farore's Flame"]}
                    imgWidth={flameWidth}
                />
            </div>
            <div id="nayrusFlame" style={nayrusFlameStyle}>
                <Item
                    itemName="Progressive Sword"
                    images={allImages["Nayru's Flame"]}
                    imgWidth={flameWidth}
                />
            </div>
            <div id="dinsFlame" style={dinsFlameStyle}>
                <Item
                    itemName="Progressive Sword"
                    images={allImages["Din's Flame"]}
                    imgWidth={flameWidth}
                />
            </div>
            <div id="wallets" style={walletStyle}>
                <Item
                    itemName="Progressive Wallet"
                    imgWidth={walletWidth}
                />
            </div>
            <div
                id="wallets"
                style={extraWalletStyle}
                onClick={handleExtraWalletClick}
                onKeyDown={keyDownWrapper(handleExtraWalletClick)}
                tabIndex={0}
                role="button"
            >
                <CrystalCounter
                    current={`+${walletCount * 300}`}
                    fontSize={wid * 0.12}
                />
            </div>
        </div>
    );
};

export default SwordBlock;

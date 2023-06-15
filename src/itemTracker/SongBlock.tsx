import { CSSProperties } from 'react';
import songBlock from '../assets/Song_Block.png';

import Item from './Item';
import Logic from '../logic/Logic';
import { ItemClickCallback } from '../callbacks';

type SongBlockProps = {
    logic: Logic;
    handleItemClick: ItemClickCallback;
    styleProps: CSSProperties;
};

const SongBlock = ({ logic, handleItemClick, styleProps }: SongBlockProps) => {
    const wid = Number(styleProps.width || 0);

    const sailclothStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.97 + 600 / wid,
        left: wid / 13,
    };

    const earringsStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 4 + 600 / wid,
        left: wid / 1.75,
    };

    const scaleStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 3.8 + 600 / wid,
        left: wid / 4,
    };

    const mittsStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.95 + 600 / wid,
        left: wid / 1.325,
    };

    const courageStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.315 + 600 / wid,
        left: wid / 1.54,
    };

    const powerStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.78 + 600 / wid,
        left: wid / 1.775,
    };

    const wisdomStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.78 + 600 / wid,
        left: wid / 3.375,
    };

    const balladStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.315 + 600 / wid,
        left: wid / 4.7,
    };
    const sothStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.07 + 600 / wid,
        left: wid / 3.15,
    };

    const harpStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 1.315 + 600 / wid,
        left: wid / 2.5,
    };

    const triforceStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 0.77 + 600 / wid,
        left: wid / 1.85,
    };

    const emeraldTabletStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 0.855 + 600 / wid,
        left: wid / 4.3,
    };

    const rubyTabletStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 0.7855 + 600 / wid,
        left: wid / 6,
    };

    const amberTabletStyle: CSSProperties = {
        position: 'relative',
        bottom: wid / 0.7855 + 600 / wid,
        left: wid / 13.9,
    };

    const harpWidth = wid / 4.6;
    const botgWidth = wid / 7;
    const courageWidth = wid / 7;
    const wisdomWidth = wid / 7;
    const powerWidth = wid / 7;
    const sothWidth = wid / 2.62;
    const sailclothWidth = wid / 5.2;
    const scaleWidth = wid / 5.2;
    const earringsWidth = wid / 5.2;
    const mittsWidth = wid / 5.2;
    const triforceWidth = wid / 2.3;
    const emeraldWidth = wid / 5.2;
    const rubyWidth = wid / 3.85;
    const amberWidth = wid / 5.57;

    return (
        <div id="songBlock">
            <img src={songBlock} alt="" width={wid} />

            <div id="sailcloth" style={sailclothStyle}>
                <Item
                    itemName="Sailcloth"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={sailclothWidth}
                />
            </div>
            <div id="earrings" style={earringsStyle}>
                <Item
                    itemName="Fireshield Earrings"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={earringsWidth}
                />
            </div>
            <div id="scale" style={scaleStyle}>
                <Item
                    itemName="Water Scale"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={scaleWidth}
                />
            </div>
            <div id="mitts" style={mittsStyle}>
                <Item
                    itemName="Progressive Mitts"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={mittsWidth}
                />
            </div>
            <div id="courage" style={courageStyle}>
                <Item
                    itemName="Farore's Courage"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={courageWidth}
                />
            </div>
            <div id="power" style={powerStyle}>
                <Item
                    itemName="Din's Power"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={powerWidth}
                />
            </div>
            <div id="wisdom" style={wisdomStyle}>
                <Item
                    itemName="Nayru's Wisdom"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={wisdomWidth}
                />
            </div>
            <div id="ballad" style={balladStyle}>
                <Item
                    itemName="Ballad of the Goddess"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={botgWidth}
                />
            </div>
            <div id="soth" style={sothStyle}>
                <Item
                    itemName="Song of the Hero"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={sothWidth}
                />
            </div>
            <div id="harp" style={harpStyle}>
                <Item
                    itemName="Goddess Harp"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={harpWidth}
                />
            </div>

            <div id="triforce" style={triforceStyle}>
                <Item
                    itemName="Triforce"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={triforceWidth}
                />
            </div>
            <div id="emeraldTablet" style={emeraldTabletStyle}>
                <Item
                    itemName="Emerald Tablet"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={emeraldWidth}
                />
            </div>
            <div id="rubyTablet" style={rubyTabletStyle}>
                <Item
                    itemName="Ruby Tablet"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={rubyWidth}
                />
            </div>
            <div id="amberTablet" style={amberTabletStyle}>
                <Item
                    itemName="Amber Tablet"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={amberWidth}
                />
            </div>
        </div>
    );
};

export default SongBlock;

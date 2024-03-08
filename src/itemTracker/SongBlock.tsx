import { CSSProperties } from 'react';
import songBlock from '../assets/Song_Block.png';

import Item from './Item';

type SongBlockProps = {
    styleProps: CSSProperties;
};

const SongBlock = ({ styleProps }: SongBlockProps) => {
    const wid = Number(styleProps.width || 0);

    const sailclothStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 2.02 + 300 / wid),
        left: wid / 13.5,
    };

    const earringsStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 4.15 + 300 / wid),
        left: wid / 1.75,
    };

    const scaleStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 3.9 + 100 / wid),
        left: wid / 4,
    };

    const mittsStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 2 + 400 / wid),
        left: wid / 1.325,
    };

    const courageStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 1.34 + 600 / wid),
        left: wid / 1.54,
    };

    const powerStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 1.82 + 600 / wid),
        left: wid / 1.775,
    };

    const wisdomStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 1.82 + 600 / wid),
        left: wid / 3.375,
    };

    const balladStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 1.34 + 600 / wid),
        left: wid / 4.7,
    };
    const sothStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 1.081 + 140 / wid),
        left: wid / 3.15,
    };

    const harpStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 1.34 + 300 / wid),
        left: wid / 2.52,
    };

    const triforceStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 0.770 + 600 / wid),
        left: wid / 1.85,
    };

    const emeraldTabletStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 0.858 + 200 / wid),
        left: wid / 4.3,
    };

    const rubyTabletStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 0.8 + 1000 / wid),
        left: wid / 6.2,
    };

    const amberTabletStyle: CSSProperties = {
        position: 'relative',
        bottom: (wid / 0.7855 + 0 / wid),
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
                    imgWidth={sailclothWidth}
                />
            </div>
            <div id="earrings" style={earringsStyle}>
                <Item
                    itemName="Fireshield Earrings"
                    imgWidth={earringsWidth}
                />
            </div>
            <div id="scale" style={scaleStyle}>
                <Item
                    itemName="Water Dragon's Scale"
                    imgWidth={scaleWidth}
                />
            </div>
            <div id="mitts" style={mittsStyle}>
                <Item
                    itemName="Progressive Mitts"
                    imgWidth={mittsWidth}
                />
            </div>
            <div id="courage" style={courageStyle}>
                <Item
                    itemName="Farore's Courage"
                    imgWidth={courageWidth}
                />
            </div>
            <div id="power" style={powerStyle}>
                <Item
                    itemName="Din's Power"
                    imgWidth={powerWidth}
                />
            </div>
            <div id="wisdom" style={wisdomStyle}>
                <Item
                    itemName="Nayru's Wisdom"
                    imgWidth={wisdomWidth}
                />
            </div>
            <div id="ballad" style={balladStyle}>
                <Item
                    itemName="Ballad of the Goddess"
                    imgWidth={botgWidth}
                />
            </div>
            <div id="soth" style={sothStyle}>
                <Item
                    itemName="Song of the Hero"
                    imgWidth={sothWidth}
                />
            </div>
            <div id="harp" style={harpStyle}>
                <Item
                    itemName="Goddess's Harp"
                    imgWidth={harpWidth}
                />
            </div>

            <div id="triforce" style={triforceStyle}>
                <Item
                    itemName="Triforce"
                    imgWidth={triforceWidth}
                />
            </div>
            <div id="emeraldTablet" style={emeraldTabletStyle}>
                <Item
                    itemName="Emerald Tablet"
                    imgWidth={emeraldWidth}
                />
            </div>
            <div id="rubyTablet" style={rubyTabletStyle}>
                <Item
                    itemName="Ruby Tablet"
                    imgWidth={rubyWidth}
                />
            </div>
            <div id="amberTablet" style={amberTabletStyle}>
                <Item
                    itemName="Amber Tablet"
                    imgWidth={amberWidth}
                />
            </div>
        </div>
    );
};

export default SongBlock;

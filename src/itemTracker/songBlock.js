import React from 'react';
import songBlock from '../assets/Song_Block.png'
import noHarp from '../assets/main quest/No_Harp.png'
import harp from '../assets/main quest/Goddess_Harp.png'
import noBallad from '../assets/songs/No_Song.png'
import ballad from '../assets/songs/Ballad_of_the_Goddess.png'
import noCourage from '../assets/songs/No_Song.png'
import courage from '../assets/songs/Farores_Courage.png'
import noWisdom from '../assets/songs/No_Song.png'
import wisdom from '../assets/songs/Nayrus_Wisdom.png'
import noPower from '../assets/songs/No_Song.png'
import power from '../assets/songs/Dins_Power.png'
import noSoth from '../assets/songs/No_Soth.png'
import soth1 from '../assets/songs/SOTH1.png'
import soth2 from '../assets/songs/SOTH2.png'
import soth from '../assets/songs/SOTH4.png'
import noSailcloth from '../assets/main quest/No_Sailcloth.png'
import sailcloth from '../assets/main quest/Sailcloth.png'
import noScale from '../assets/main quest/No_Scale.png'
import scale from '../assets/main quest/Water_Dragon_Scale.png'
import noEarrings from '../assets/main quest/No_Earrings.png'
import earrings from '../assets/main quest/Fireshield_Earrings.png'
import noMitts from '../assets/main quest/No_Mitts.png'
import diggingMitts from '../assets/main quest/Digging_Mitts.png'
import mogmaMitts from '../assets/main quest/Mogma_Mitts.png'
import noStone from '../assets/main quest/No_Stone.png'
import stone from '../assets/main quest/Stone_of_Trials.png'
import noTablet from '../assets/tablets/No_Amber_Tablet.png'
import emeraldTablet from '../assets/tablets/emerald_tablet.png'
import rubyTablet from '../assets/tablets/ruby_tablet.png'
import amberTablet from '../assets/tablets/amber_tablet.png'
import Item from './Item';

export default class SwordBlock extends React.Component {

    constructor(props) {
        super(props);

        this.harpImages = [
            noHarp,
            harp,
        ];
        this.botgImages = [
            noBallad,
            ballad,
        ];
        this.fcImages = [
            noCourage,
            courage,
        ];
        this.nwImages = [
            noWisdom,
            wisdom,
        ];
        this.dpImages = [
            noPower,
            power,
        ];
        this.sothImages = [
            noSoth,
            soth1,
            soth2,
            soth,
        ];
        this.sailclothImages = [
            noSailcloth,
            sailcloth,
        ];
        this.scaleImages = [
            noScale,
            scale,
        ];
        this.fseImages = [
            noEarrings,
            earrings,
        ];
        this.mittsImages = [
            noMitts,
            diggingMitts,
            mogmaMitts,
        ];
        this.sotImages = [
            noStone,
            stone,
        ];
        this.emeraldImages = [
            noTablet,
            emeraldTablet,
        ];
        this.rubyImages = [
            noTablet,
            rubyTablet,
        ];
        this.amberImages = [
            noTablet,
            amberTablet,
        ];
    }

    render() {
        const wid = this.props.styleProps.width;

        const sailclothStyle = {
            position: 'relative',
            bottom: (wid / 1.97 + 600 / wid),
            left: wid / 13,
        };

        const earringsStyle = {
            position: 'relative',
            bottom: (wid / 4 + 600 / wid),
            left: wid / 1.75,
        };

        const scaleStyle = {
            position: 'relative',
            bottom: (wid / 3.8 + 600 / wid),
            left: wid / 4,
        };

        const mittsStyle = {
            position: 'relative',
            bottom: (wid / 1.95 + 600 / wid),
            left: wid / 1.325,
        };

        const courageStyle = {
            position: 'relative',
            bottom: (wid / 1.315 + 600 / wid),
            left: wid / 1.54,
        };

        const powerStyle = {
            position: 'relative',
            bottom: (wid / 1.78 + 600 / wid),
            left: wid / 1.775,
        };

        const wisdomStyle = {
            position: 'relative',
            bottom: (wid / 1.78 + 600 / wid),
            left: wid / 3.375,
        };

        const balladStyle = {
            position: 'relative',
            bottom: (wid / 1.315 + 600 / wid),
            left: wid / 4.7,
        };
        const sothStyle = {
            position: 'relative',
            bottom: (wid / 1.07 + 600 / wid),
            left: wid / 3.15,
        };

        const harpStyle = {
            position: 'relative',
            bottom: (wid / 1.315 + 600 / wid),
            left: wid / 2.5,
        };

        const stoneStyle = {
            position: 'relative',
            bottom: (wid / 0.809 + 600 / wid),
            left: wid / 1.8,
        };

        const emeraldTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.855 + 600 / wid),
            left: wid / 4.3,
        };

        const rubyTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.7855 + 600 / wid),
            left: wid / 6,
        };

        const amberTabletStyle = {
            position: 'relative',
            bottom: (wid / 0.7855 + 600 / wid),
            left: wid / 13.9
        }

        const harpWidth = this.props.styleProps.width / 4.6;
        const botgWidth = this.props.styleProps.width / 7;
        const courageWidth = this.props.styleProps.width / 7;
        const wisdomWidth = this.props.styleProps.width / 7;
        const powerWidth = this.props.styleProps.width / 7;
        const sothWidth = this.props.styleProps.width / 2.62;
        const sailclothWidth = this.props.styleProps.width / 5.2;
        const scaleWidth = this.props.styleProps.width / 5.2;
        const earringsWidth = this.props.styleProps.width / 5.2;
        const mittsWidth = this.props.styleProps.width / 5.2;
        const sotWidth = this.props.styleProps.width / 4.6;
        const emeraldWidth = this.props.styleProps.width / 5.2;
        const rubyWidth = this.props.styleProps.width / 3.85;
        const amberWidth = this.props.styleProps.width / 5.57;

        return <div id={"songBlock"}>
            <img src={songBlock} alt={""} width={wid} />

            <div id={"sailcloth"} style={sailclothStyle}>
                <Item itemName="Sailcloth" images={this.sailclothImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={sailclothWidth} />
            </div>
            <div id={"earrings"} style={earringsStyle}>
                <Item itemName="Fireshield Earrings" images={this.fseImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={earringsWidth} />
            </div>
            <div id={"scale"} style={scaleStyle}>
                <Item itemName="Water Scale" images={this.scaleImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={scaleWidth} />
            </div>
            <div id={"mitts"} style={mittsStyle}>
                <Item itemName="Progressive Mitts" images={this.mittsImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={mittsWidth} />
            </div>
            <div id={"courage"} style={courageStyle}>
                <Item itemName="Farore's Courage" images={this.fcImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={courageWidth} />
            </div>
            <div id={"power"} style={powerStyle}>
                <Item itemName="Din's Power" images={this.dpImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={powerWidth} />
            </div>
            <div id={"wisdom"} style={wisdomStyle}>
                <Item itemName="Nayru's Wisdom" images={this.nwImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={wisdomWidth} />
            </div>
            <div id={"ballad"} style={balladStyle}>
                <Item itemName="Ballad of the Goddess" images={this.botgImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={botgWidth} />
            </div>
            <div id={"soth"} style={sothStyle}>
                <Item itemName="Song of the Hero" images={this.sothImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={sothWidth} />
            </div>
            <div id={"harp"} style={harpStyle}>
                <Item itemName="Goddess Harp" images={this.harpImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={harpWidth} />
            </div>


            <div id={"stone"} style={stoneStyle}>
                <Item itemName="Stone of Trials" images={this.sotImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={sotWidth} />
            </div>
            <div id={"emeraldTablet"} style={emeraldTabletStyle}>
                <Item itemName="Emerald Tablet" images={this.emeraldImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={emeraldWidth} />
            </div>
            <div id={"rubyTablet"} style={rubyTabletStyle}>
                <Item itemName="Ruby Tablet" images={this.rubyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={rubyWidth} />
            </div>
            <div id={"rubyTablet"} style={amberTabletStyle}>
                <Item itemName="Amber Tablet" images={this.amberImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={amberWidth} />
            </div>
        </div>
    }
}

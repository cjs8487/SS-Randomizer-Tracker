import React from 'react';
import Item from './Item'

import wheel from '../assets/b wheel.png'
import noBeetle from '../assets/Beetle_Silhouette.png'
import beetle from '../assets/Beetle_Icon.png'
import hookBeetle from '../assets/Hook_Beetle_Icon.png'
import slingshot from '../assets/Slingshot_Icon.png'
import noSlingshot from '../assets/Slingshot_Silhouette.png'
import noBombs from '../assets/Bomb_Silhouette.png'
import bombs from '../assets/Bomb_Icon.png'
import noBugNet from '../assets/Bugnet_Silhouette.png'
import bugNet from '../assets/Bugnet_Icon.png'
import noBow from '../assets/Bow_Silhouette.png'
import bow from '../assets/Bow_Icon.png'
import noClawshots from '../assets/Clawshots_Silhouette.png'
import clawshots from '../assets/Clawshots_Icon.png'
import noWhip from '../assets/Whip_Silhouette.png'
import whip from '../assets/Whip_Icon.png'
import noGustBellows from '../assets/Gust_Bellows_Silhouette.png'
import gustBellows from '../assets/Gust_Bellows_Icon.png'

export default class BWheel extends React.Component {

    constructor(props) {
        super(props);

        this.beetleImages = [
            noBeetle,
            beetle,
            hookBeetle,
        ];
        this.slingshotImages = [
            noSlingshot,
            slingshot,
        ]
        this.bombImages = [
            noBombs,
            bombs,
        ];
        this.bugNetImages = [
            noBugNet,
            bugNet,
        ];
        this.bowImages = [
            noBow,
            bow,
        ];
        this.clawshotsImages = [
            noClawshots,
            clawshots,
        ];
        this.whipImages = [
            noWhip,
            whip,
        ];
        this.bellowsImages = [
            noGustBellows,
            gustBellows,
        ]
    }

    render() {
        const wid = this.props.styleProps.width;

        const beetleStyle = {
            position: 'relative',
            bottom: (wid / 1.75 + 600 / wid),
            left: wid / 1.33,
        };

        const slingshotStyle = {
            position: 'relative',
            bottom: (wid / 3.85 + 600 / wid),
            left: wid / 2.3,
        };

        const bombsStyle = {
            position: 'relative',
            bottom: (wid / 1.22 + 600 / wid),
            left: wid / 1.51,
        };

        const netStyle = {
            position: 'relative',
            bottom: (wid / 2.9 + 600 / wid),
            left: wid / 1.51,
        };

        const bowStyle = {
            position: 'relative',
            bottom: (wid / 1.09 + 600 / wid),
            left: wid / 2.4,
        };

        const clawshotsStyle = {
            position: 'relative',
            bottom: (wid / 2.9 + 600 / wid),
            left: wid / 6.8,
        };

        const whipStyle = {
            position: 'relative',
            bottom: (wid / 1.75 + 600 / wid),
            left: wid / 13,
        };

        const gustBewllowsStyle = {
            position: 'relative',
            bottom: (wid / 1.22 + 600 / wid),
            left: wid / 6,
        };

        const beetleWidth = this.props.styleProps.width / 5.2;
        const slingshotWidth = this.props.styleProps.width / 6.5;
        const bombsWidth = this.props.styleProps.width / 6.5;
        const bugNetWidth = this.props.styleProps.width / 6.5;
        const bowWidth = this.props.styleProps.width / 5.5;
        const clawshotsWidth = this.props.styleProps.width / 4.6;
        const whipWidth = this.props.styleProps.width / 5.5;
        const bellowsWidth = this.props.styleProps.width / 5.2;

        return (
            <div id={"BWheel"}>
            <img src={wheel} alt={""} width={wid}/>
            <div id={"beetle"} style={beetleStyle}>
                <Item itemName="Progressive Beetle" images={this.beetleImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={beetleWidth}/>
            </div>
            <div id={"slingshot"} style={slingshotStyle}>
                <Item itemName="Slingshot" images={this.slingshotImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={slingshotWidth}/>
            </div>
            <div id={"bombs"} style={bombsStyle}>
                <Item itemName="Bomb Bag" images={this.bombImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={bombsWidth}/>
            </div>
            <div id={"bugnet"} style={netStyle}>
                <Item itemName="Bug Net" images={this.bugNetImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={bugNetWidth}/>
            </div>
            <div id={"bow"} style={bowStyle}>
                <Item itemName="Bow" images={this.bowImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={bowWidth}/>
            </div>
            <div id={"clawshots"} style={clawshotsStyle}>
                <Item itemName="Clawshots" images={this.clawshotsImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={clawshotsWidth}/>
            </div>
            <div id={"whip"} style={whipStyle}>
                <Item itemName="Whip" images={this.whipImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={whipWidth}/>
            </div>
            <div id={"gustBellows"} style={gustBewllowsStyle}>
                <Item itemName="Gust Bellows" images={this.bellowsImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={bellowsWidth}/>
            </div>
            <div id="slingshot" style={slingshotStyle}>
                <Slingshot current={this.props.items.slingshot} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            <div id="bombs" style={bombsStyle}>
                <Bombs current={this.props.items.bombs} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            <div id="bugnet" style={netStyle}>
                <Bugnet current={this.props.items.bugnet} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            <div id="bow" style={bowStyle}>
                <Bow current={this.props.items.bow} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            <div id="clawshots" style={clawshotsStyle}>
                <Clawshots current={this.props.items.clawshots} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            <div id="whip" style={whipStyle}>
                <Whip current={this.props.items.whip} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            <div id="gustBellows" style={gustBewllowsStyle}>
                <GustBellows current={this.props.items.gustBellows} parent={this.props.styleProps} onChange={this.props.handleItemClick} />
            </div>
            </div>
        );
    }
}

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AreaCounters from '../locationTracker/AreaCounters';
import Item from './Item';

import noSmallKey from '../assets/dungeons/noSmallKey.png';
import oneSmallKey from '../assets/dungeons/1_smallKey.png';
import twoSmallKey from '../assets/dungeons/2_smallKey.png';
import threeSmallKey from '../assets/dungeons/3_smallKey.png';
import noEntrance from '../assets/No_Entrance.png';
import entrance from '../assets/Entrance.png';
import g1 from '../assets/bosses/g1.png';
import scaldera from '../assets/bosses/scaldera.png';
import moldarach from '../assets/bosses/moldarach.png';
import koloktos from '../assets/bosses/koloktos.png';
import tentalus from '../assets/bosses/tentalus.png';
import g2 from '../assets/bosses/g2.png';
import dreadfuse from '../assets/bosses/dreadfuse.png';
import trialGate from '../assets/bosses/trialGate.png';
import faronTrialGate from '../assets/bosses/faronTrialGate.png';
import lanayruTrialGate from '../assets/bosses/lanayruTrialGate.png';
import eldinTrialGate from '../assets/bosses/eldinTrialGate.png';
import DungeonName from './items/dungeons/DungeonName';
import ColorScheme from '../customization/ColorScheme';
import Logic from '../logic/Logic';
import DungeonIcon from './items/dungeons/DungeonIcon';
import HintMarker from '../hints/HintMarker';

class MapDungeonTracker extends React.Component {
    constructor(props) {
        super(props);

        this.smallKeyImages = [
            noSmallKey,
            oneSmallKey,
            twoSmallKey,
            threeSmallKey,
        ];
        this.dungeonEnteredImages = [
            noEntrance,
            entrance,
        ];
    }

    render() {
        // eslint-disable-next-line react/destructuring-assignment
        const wid = this.props.styleProps.width;
        const { height } = this.props.styleProps;
        // const aspectRatio = 0.0;
        const numDungeons = this.props.skyKeep ? 7 : 6;
        const iconsPerDungeon = 2;
        // scale icons differently with sky keep to keep things fitted all at once
        const scaleFactor = (this.props.skyKeep ? 1.05 : 1);
        const colWidth = wid / (numDungeons * iconsPerDungeon * scaleFactor);
        const keysStyle = {
            position: 'fixed',
            margin: '0%',
            left: '0.25%',
            top: '0%',
            width: wid,
        };
        const dungeonStyle = {
            position: 'relative',
            top: wid * -0.015,
        };
        return (
            <Col
                noGutters
                // style={{ padding: 0 }}
                id="dungeonTracker"
                ref={(divElement) => { this.divElement = divElement; }}
                style={{width: wid}}
            >
                <table style={keysStyle}>
                    <td>
                        <tr>
                            <td id="svSmall">
                                <Item itemName="Skyview Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="svBossKey">
                                <Item itemName="Skyview Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="SV"
                                    dungeonName="Skyview"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            <td id="etSmall">
                                <Item itemName="Key Piece" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="etBossKey">
                                <Item itemName="Earth Temple Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="ET"
                                    dungeonName="Earth Temple"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            <td id="lmfSmall">
                                <Item itemName="Lanayru Mining Facility Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="lmfBossKey">
                                <Item itemName="Lanayru Mining Facility Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="LMF"
                                    dungeonName="Lanayru Mining Facility"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            <td id="acSmall">
                                <Item itemName="Ancient Cistern Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="acBossKey">
                                <Item itemName="Ancient Cistern Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="AC"
                                    dungeonName="Ancient Cistern"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            <td id="sshSmall">
                                <Item itemName="Sandship Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="sshBossKey">
                                <Item itemName="Sandship Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="SSH"
                                    dungeonName="Sandship"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr>
                            <td id="fsSmall">
                                <Item itemName="Fire Sanctuary Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                            <td id="fsBossKey">
                                <Item itemName="Fire Sanctuary Boss Key" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={iconsPerDungeon} style={dungeonStyle}>
                                <DungeonName
                                    dungeon="FS"
                                    dungeonName="Fire Sanctuary"
                                    logic={this.props.logic}
                                    parent={this.props.styleProps}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    colorScheme={this.props.colorScheme}
                                />
                            </td>
                        </tr>
                    </td>
                    {
                        this.props.skyKeep && (
                            <td>
                                <tr>
                                    <td id="skSmall">
                                        <Item itemName="Sky Keep Small Key" images={this.smallKeyImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                    <td id="stoneTrials">
                                        <Item itemName="Stone of Trials" logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={colWidth} ignoreItemClass />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={this.props.entranceRando === 'All Dungeons + Sky Keep' ? 3 : 2} style={dungeonStyle}>
                                        <DungeonName
                                            dungeon="SK"
                                            dungeonName="Sky Keep"
                                            logic={this.props.logic}
                                            parent={this.props.styleProps}
                                            dungeonChange={this.props.handleDungeonUpdate}
                                            colorScheme={this.props.colorScheme}
                                        />
                                    </td>
                                </tr>
                            </td>
                        )
                    }
                </table>
            </Col>
        );
    }
}

MapDungeonTracker.propTypes = {
    skyKeep: PropTypes.bool.isRequired,
    logic: PropTypes.instanceOf(Logic).isRequired,
    styleProps: PropTypes.shape().isRequired,
    handleDungeonUpdate: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    entranceRando: PropTypes.string.isRequired,
};

export default MapDungeonTracker;

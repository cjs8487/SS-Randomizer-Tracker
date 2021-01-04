import React from 'react';
import PropTypes from 'prop-types';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import dungeonLayout from '../assets/dungeonLayout.png';
import AreaCounters from '../locationTracker/AreaCounters';

import DungeonEntrance from './items/dungeons/dungeonEntrance';
import SVBossKey from './items/dungeons/bk/svBossKey';
import ETBossKey from './items/dungeons/bk/etBossKey';
import LMFBossKey from './items/dungeons/bk/lmfBossKey';
import ACBossKey from './items/dungeons/bk/acBossKey';
import SSHBossKey from './items/dungeons/bk/sshBossKey';
import FSBossKey from './items/dungeons/bk/fsBossKey';
import Triforce from './items/dungeons/triforce';
import ETEntry from './items/dungeons/etEntry';
import DungeonName from './items/dungeons/dungeonName';
import SmallKey from './items/dungeons/SmallKey';
import ColorScheme from '../customization/colorScheme';

class DungeonTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };
    }

    componentDidMount() {
        this.setState({ width: this.divElement.clientWidth });
    }

    render() {
        let { width } = this.state;
        if (this.divElement !== undefined) {
            width = this.divElement.clientWidth;
        }

        const svNameStyle = {
            // position: 'relative',
            // left: 1*wid/7
        };

        const etNameStyle = {
            // position: 'relative',
            // left: 1*wid/7
        };

        const lmfNameStyle = {
            // position: 'relative',
            // left: 2*wid/7
        };

        const acNameStyle = {
            // position: 'relative',
            // left: 3*wid/7
        };

        const sshNameStyle = {
            // position: 'relative',
            // left: 4*wid/7
        };

        const fsNameStyle = {
            // position: 'relative',
            // left: 5*wid/7
        };

        const skNameStyle = {
            // position: 'relative',
            // left: 6*wid/7
        };

        const svBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 1*wid/7
        };

        const etBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 1*wid/7,
        };

        const lmfBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 2*wid/7,
        };

        const acBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 3*wid/7,
        };

        const sshBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 4*wid/7,
        };

        const fsBossKeyStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 5*wid/7,
        };

        const triforceStyle = {
            // position: 'relative',
            // bottom: 2*hig/4,
            // left: 6*wid/7,
        };

        const svSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: wid/7,
            // width: wid/7
        };

        const etEntryStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 2*wid/7,
            // width: wid/7
        };

        const lmfSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 4*wid/7,
            // width: wid/7
        };

        const acSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 7*wid/7,
            // width: wid/7
        };

        const sshSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 7*wid/7,
            // width: wid/7
        };

        const fsSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 6*wid/7,
            // width: wid/7
        };

        const skSmallStyle = {
            // position: 'relative',
            // bottom: 3*hig/4,
            // left: 7*wid/7,
            // width: wid/7
        };

        const svChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 1*wid/7,
            // width: wid/7
        };

        const etChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 2*wid/7
        };

        const lmfChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 3*wid/7
        };

        const acChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 4*wid/7
        };

        const sshChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 5*wid/7
        };

        const fsChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 6*wid/7
        };

        const skChecksStyle = {
            // position: 'relative',
            // bottom: hig,
            // left: 7*wid/7
        };

        const numDungeons = this.props.skykeep ? 7 : 6;
        const colWidth = width / numDungeons;

        return (
            <Col
                id="dungeonTracker"
                ref={(divElement) => { this.divElement = divElement; }}
            >
                <Row noGutters>
                    <Col id="svName" className="dungeonName" style={svNameStyle}>
                        <DungeonName
                            dungeon="SV"
                            dungeonName="Skyview"
                            current={this.props.items.svName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes('Skyview')}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="etName" className="dungeonName" style={etNameStyle}>
                        <DungeonName
                            dungeon="ET"
                            dungeonName="Earth Temple"
                            current={this.props.items.etName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            d
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes('Earth Temple')}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="lmfName" className="dungeonName" style={lmfNameStyle}>
                        <DungeonName
                            dungeon="LMF"
                            dungeonName="Lanayru Mining Facility"
                            current={this.props.items.lmfName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes('Lanayru Mining Facility')}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="acName" className="dungeonName" style={acNameStyle}>
                        <DungeonName
                            dungeon="AC"
                            dungeonName="Ancient Cistern"
                            current={this.props.items.acName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes('Ancient Cistern')}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="sshName" className="dungeonName" style={sshNameStyle}>
                        <DungeonName
                            dungeon="SSH"
                            dungeonName="Sandship"
                            current={this.props.items.sshName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes('Sandship')}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    <Col id="fsName" className="dungeonName" style={fsNameStyle}>
                        <DungeonName
                            dungeon="FS"
                            dungeonName="Fire Sanctuary"
                            current={this.props.items.fsName}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            dungeonChange={this.props.handleDungeonUpdate}
                            complete={this.props.completedDungeons.includes('Fire Sanctuary')}
                            colorScheme={this.props.colorScheme}
                        />
                    </Col>

                    {
                        this.props.skykeep && (
                            <Col id="skName" className="dungeonName" style={skNameStyle}>
                                <DungeonName
                                    dungeon="SK"
                                    dungeonName="Skykeep"
                                    current={this.props.items.skName}
                                    parent={this.props.styleProps}
                                    onChange={this.props.handleItemClick}
                                    dungeonChange={this.props.handleDungeonUpdate}
                                    complete={this.props.completedDungeons.includes('Sky Keep')}
                                    colorScheme={this.props.colorScheme}
                                />
                            </Col>
                        )
                    }

                </Row>
                {
                    this.props.entranceRando !== 'None' && (
                        <Row noGutters>

                            <Col id="svEntrance" style={svNameStyle}>
                                <DungeonEntrance current={this.props.items.svEntered} onChange={this.props.handleItemClick} dungeonName="SV" entranceItem="svEntered" />
                            </Col>

                            <Col id="etEntrance" style={etNameStyle}>
                                <DungeonEntrance current={this.props.items.etEntered} onChange={this.props.handleItemClick} dungeonName="ET" entranceItem="etEntered" />
                            </Col>

                            <Col id="lmfEntrance" style={lmfNameStyle}>
                                <DungeonEntrance current={this.props.items.lmfEntered} onChange={this.props.handleItemClick} dungeonName="LMF" entranceItem="lmfEntered" />
                            </Col>

                            <Col id="acEntrance" style={acNameStyle}>
                                <DungeonEntrance current={this.props.items.acEntered} onChange={this.props.handleItemClick} dungeonName="AC" entranceItem="acEntered" />
                            </Col>

                            <Col id="ssEntrance" style={sshNameStyle}>
                                <DungeonEntrance current={this.props.items.sshEntered} onChange={this.props.handleItemClick} dungeonName="SSH" entranceItem="sshEntered" />
                            </Col>

                            <Col id="fsEntrance" style={fsNameStyle}>
                                <DungeonEntrance current={this.props.items.fsEntered} onChange={this.props.handleItemClick} dungeonName="FS" entranceItem="fsEntered" />
                            </Col>

                            {/* this is not a typo */}
                            {
                                this.props.entranceRando === 'Dungeons   Sky Keep' && this.props.skykeep && (
                                    <Col id="skEntrance" style={skNameStyle}>
                                        <DungeonEntrance current={this.props.items.skEntered} onChange={this.props.handleItemClick} dungeonName="SK" entranceItem="skEntered" />
                                    </Col>
                                )
                            }
                            {
                                this.props.entranceRando !== 'Dungeons   Sky Keep' && this.props.skykeep &&
                                    <Col id="skEntranceBuffer" style={skNameStyle} />
                            }

                        </Row>
                    )
                }
                <Row noGutters>

                    <Col id="svBossKey" style={svBossKeyStyle}>
                        <SVBossKey current={this.props.items.svBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    <Col id="etBossKey" style={etBossKeyStyle}>
                        <ETBossKey current={this.props.items.etBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    <Col id="lmfBossKey" style={lmfBossKeyStyle}>
                        <LMFBossKey current={this.props.items.lmfBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    <Col id="acBossKey" style={acBossKeyStyle}>
                        <ACBossKey current={this.props.items.acBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    <Col id="sshBossKey" style={sshBossKeyStyle}>
                        <SSHBossKey current={this.props.items.sshBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    <Col id="fsBossKey" style={fsBossKeyStyle}>
                        <FSBossKey current={this.props.items.fsBossKey} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    {
                        this.props.skykeep && (
                            <Col id="triforce" style={triforceStyle}>
                                <Triforce current={this.props.items.triforce} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                            </Col>
                        )
                    }

                </Row>
                <Row noGutters>

                    <Col id="svSmall" style={svSmallStyle}>
                        <SmallKey
                            keyName="svSmall"
                            altName="Skyview"
                            current={this.props.items.svSmall}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            colWidth={colWidth}
                        />
                    </Col>

                    <Col id="etEntry" style={etEntryStyle}>
                        <ETEntry current={this.props.items.etEntry} parent={this.props.styleProps} onChange={this.props.handleItemClick} colWidth={colWidth} />
                    </Col>

                    <Col id="lmfSmall" style={lmfSmallStyle}>
                        <SmallKey
                            keyName="lmfSmall"
                            altName="Lanayru Mining Facility"
                            current={this.props.items.lmfSmall}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            colWidth={colWidth}
                        />
                    </Col>

                    <Col id="acSmall" style={acSmallStyle}>
                        <SmallKey
                            keyName="acSmall"
                            altName="Acient Cistern"
                            current={this.props.items.acSmall}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            colWidth={colWidth}
                        />
                    </Col>

                    <Col id="sshSmall" style={sshSmallStyle}>
                        <SmallKey
                            keyName="sshSmall"
                            altName="Sandship"
                            current={this.props.items.sshSmall}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            colWidth={colWidth}
                        />
                    </Col>

                    <Col id="fsSmall" style={fsSmallStyle}>
                        <SmallKey
                            keyName="fsSmall"
                            altName="Fire Sanctuary"
                            current={this.props.items.fsSmall}
                            parent={this.props.styleProps}
                            onChange={this.props.handleItemClick}
                            colWidth={colWidth}
                        />
                    </Col>

                    {
                        this.props.skykeep && (
                            <Col id="skSmall" style={skSmallStyle}>
                                <SmallKey
                                    keyName="skSmall"
                                    altName="Sky Keep"
                                    current={this.props.items.skSmall}
                                    parent={this.props.styleProps}
                                    onChange={this.props.handleItemClick}
                                    colWidth={colWidth}
                                />
                            </Col>
                        )
                    }

                </Row>
                <Row noGutters>

                    <Col id="svChecks" style={svChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation.Skyview} totalChecksAccessible={this.props.accessiblePerLocation.Skyview} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="etChecks" style={etChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation['Earth Temple']} totalChecksAccessible={this.props.accessiblePerLocation['Earth Temple']} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="lmfChecks" style={lmfChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation['Lanayru Mining Facility']} totalChecksAccessible={this.props.accessiblePerLocation['Lanayru Mining Facility']} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="acChecks" style={acChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation['Ancient Cistern']} totalChecksAccessible={this.props.accessiblePerLocation['Ancient Cistern']} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="sshChecks" style={sshChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation.Sandship} totalChecksAccessible={this.props.accessiblePerLocation.Sandship} colorScheme={this.props.colorScheme} />
                    </Col>

                    <Col id="fsChecks" style={fsChecksStyle}>
                        <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation['Fire Sanctuary']} totalChecksAccessible={this.props.accessiblePerLocation['Fire Sanctuary']} colorScheme={this.props.colorScheme} />
                    </Col>

                    {
                        this.props.skykeep && (
                            <Col id="skChecks" style={skChecksStyle}>
                                <AreaCounters totalChecksLeftInArea={this.props.checksPerLocation['Sky Keep']} totalChecksAccessible={this.props.accessiblePerLocation['Sky Keep']} colorScheme={this.props.colorScheme} />
                            </Col>
                        )
                    }

                </Row>
            </Col>
        );
    }
}

DungeonTracker.propTypes = {
    skykeep: PropTypes.bool.isRequired,
    entranceRando: PropTypes.string.isRequired,
    completedDungeons: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleItemClick: PropTypes.func.isRequired,
    handleDungeonUpdate: PropTypes.func.isRequired,
    colorScheme: PropTypes.objectOf(ColorScheme).isRequired,
    items: PropTypes.shape({
        svSmall: PropTypes.number,
        etEntry: PropTypes.number,
        lmfSmall: PropTypes.number,
        acSmall: PropTypes.number,
        sshSmall: PropTypes.number,
        fsSmall: PropTypes.number,
        skSmall: PropTypes.number,
        svBossKey: PropTypes.number,
        etBossKey: PropTypes.number,
        lmfBossKey: PropTypes.number,
        acBossKey: PropTypes.number,
        sshBossKey: PropTypes.number,
        fsBossKey: PropTypes.number,
        triforce: PropTypes.number,
        svEntered: PropTypes.number,
        etEntered: PropTypes.number,
        lmfEntered: PropTypes.number,
        acEntered: PropTypes.number,
        sshEntered: PropTypes.number,
        fsEntered: PropTypes.number,
        skEntered: PropTypes.number,
        svName: PropTypes.number,
        etName: PropTypes.number,
        lmfName: PropTypes.number,
        acName: PropTypes.number,
        sshName: PropTypes.number,
        fsName: PropTypes.number,
        skName: PropTypes.number,
    }).isRequired,
    styleProps: PropTypes.shape({
        width: PropTypes.number,
    }).isRequired,
    checksPerLocation: PropTypes.shape({
        Skyview: PropTypes.number,
        'Earth Temple': PropTypes.number,
        'Lanayru Mining Facility': PropTypes.number,
        'Ancient Cistern': PropTypes.number,
        Sandship: PropTypes.number,
        'Fire Sanctuary': PropTypes.number,
        'Sky Keep': PropTypes.number,
    }).isRequired,
    accessiblePerLocation: PropTypes.shape({
        Skyview: PropTypes.number,
        'Earth Temple': PropTypes.number,
        'Lanayru Mining Facility': PropTypes.number,
        'Ancient Cistern': PropTypes.number,
        Sandship: PropTypes.number,
        'Fire Sanctuary': PropTypes.number,
        'Sky Keep': PropTypes.number,
    }).isRequired,
};

export default DungeonTracker;

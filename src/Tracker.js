import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/cjs/Row';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/itemTracker';
import BasicCounters from './BasicCounters';
import ImportExport from './ImportExport';
import DungeonTracker from './itemTracker/dungeonTracker';
import CubeTracker from './locationTracker/CubeTracker';
import ColorScheme from './customization/colorScheme';
import CustomizationModal from './customization/customizationModal';
import Logic from './logic/Logic';

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        const path = new URLSearchParams(this.props.location.search);
        const json = JSON.parse(path.get('options'));
        this.state = {
            options: json,
            width: window.innerWidth,
            height: window.innerHeight,
            showCustomizationDialog: false,
            colorScheme: new ColorScheme(),
        };
        // bind this to handlers to ensure that context is correct when they are called so they have
        // access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCubeClick = this.handleCubeClick.bind(this);
        this.handleDungeonClick = this.handleDungeonClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.importState = this.importState.bind(this);
        this.updateColorScheme = this.updateColorScheme.bind(this);
        this.initialize(json);
    }

    componentDidMount() {
        // updating window properties
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    handleGroupClick(group) {
        if (this.state.expandedGroup === group) {
            this.setState({ expandedGroup: '' }); // deselection if the opened group is clicked again
        } else {
            this.setState({ expandedGroup: group });
        }
    }

    handleLocationClick(group, location) {
        location.checked = !location.checked;
        this.state.logic.updateCounters(group, location.checked, location.inLogic);
        // handle any locations that contribute to additional factors, such as dungeon tracking
        switch (location.name) {
        case 'Ruby Tablet':
            this.state.logic.toggleDungeonCompleted('Skyview');
            break;
        case 'Amber Tablet':
            this.state.logic.toggleDungeonCompleted('Earth Temple');
            break;
        case 'Harp':
            this.state.logic.toggleDungeonCompleted('Lanayru Mining Facility');
            break;
        case 'Goddess Longsword':
            this.state.logic.toggleDungeonCompleted('Ancient Cistern');
            break;
        case "Nayru's Flame":
            this.state.logic.toggleDungeonCompleted('Sandship');
            break;
        case "Din's Flame":
            this.state.logic.toggleDungeonCompleted('Skyview');
            break;
        default:
            break;
        }
        this.forceUpdate();
    }

    handleCubeClick(group, location) {
        this.state.logic.toggleExtraLocationChecked(group, location);
        this.forceUpdate();
    }

    handleItemClick(item) {
        this.state.logic.giveItem(item);
        this.state.logic.checkAllRequirements();
        this.state.logic.updateCountersForItem();
        this.forceUpdate();
    }

    handleDungeonClick(dungeon) {
        this.state.logic.toggleDungeonRequired(dungeon);
        this.forceUpdate();
    }

    setItemState(item, state) {
        const newItems = { ...this.state.trackerItems };
        newItems[item] = state;
        this.updateLocationLogic(item, state);
        return newItems;
    }

    async initialize(options) {
        const startingItems = [];
        startingItems.push('Sailcloth');
        if (options.startingTablets === 3) {
            startingItems.push('Emerald Tablet');
            startingItems.push('Ruby Tablet');
            startingItems.push('Amber Tablet');
        }
        if (!options.swordless) {
            startingItems.push('Progressive Sword');
            startingItems.push('Progressive Sword');
        }
        if (options.startPouch) {
            startingItems.push('Progressive Pouch');
        }
        const logic = new Logic();
        await logic.initialize(options, startingItems);
        this.setState({ logic });
    }

    updateColorScheme(colorScheme) {
        this.setState({ colorScheme });
    }

    importState(state) {
        this.setState(state);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        // ensure that logic is properly initialized befopre attempting to render the actual tracker
        if (_.isNil(this.state.logic)) {
            return (
                <div />
            );
        }
        this.state.logic.checkAllRequirements();
        if (this.state.itemClicked) {
            this.itemClickedCounterUpdate();
        }
        const itemTrackerStyle = {
            position: 'fixed',
            width: (12 * this.state.width) / 30, // this is supposed to be *a bit* more than 1/3
            height: this.state.height,
            left: 0,
            top: 0,
            margin: '1%',
            // border: '3px solid #73AD21'
        };

        const locationTrackerStyle = {
            // position: 'absolute',
            // width: this.state.width/3,
            // left: itemTrackerStyle.width,
            // top: 0,
            // margin: "1%",
            // overflowY: "scroll",
            // overflow: "hidden"
        };

        const countersStyle = {
            // position: 'absolute',
            // width: this.state.width/3,
            // left: locationTrackerStyle.left + locationTrackerStyle.width,
            // top: 0,
            // margin: "1%"
        };

        // console.log(this.state.locations);

        const dungeonTrackerStyle = {
            width: this.state.widthwidth / 3,
        };

        return (
            <div style={{ height: 'auto' }}>
                <Container fluid style={{ background: this.state.colorScheme.background }}>
                    <Row>
                        <Col>
                            <Row style={{ paddingLeft: '3%' }}>
                                <ItemTracker
                                    styleProps={itemTrackerStyle}
                                    items={this.state.trackerItems}
                                    logic={this.state.logic}
                                    handleItemClick={this.handleItemClick}
                                    colorScheme={this.state.colorScheme}
                                />
                            </Row>
                        </Col>
                        <Col style={{ overflowY: 'scroll', overflowX: 'auto' }}>
                            <LocationTracker
                                className="overflowAuto"
                                style={locationTrackerStyle}
                                items={this.state.trackerItems}
                                logic={this.state.logic}
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                handleLocationClick={this.handleLocationClick}
                                colorScheme={this.state.colorScheme}
                            />
                        </Col>
                        <Col>
                            <Row>
                                <BasicCounters
                                    style={countersStyle}
                                    locationsChecked={this.state.logic.getTotalLocationsChecked()}
                                    totalAccessible={this.state.logic.getTotalLocationsInLogic()}
                                    checksRemaining={this.state.logic.getTotalRemainingChecks()}
                                    colorScheme={this.state.colorScheme}
                                />
                            </Row>
                            <Row noGutters>
                                <DungeonTracker
                                    styleProps={dungeonTrackerStyle}
                                    handleItemClick={this.handleItemClick}
                                    handleDungeonUpdate={this.handleDungeonClick}
                                    items={this.state.trackerItems}
                                    logic={this.state.logic}
                                    skykeep={!this.state.options.skipSkykeep}
                                    entranceRando={this.state.options.entrancesRandomized}
                                    colorScheme={this.state.colorScheme}
                                />
                            </Row>
                            <Row style={{ paddingRight: '10%', paddingTop: '5%' }}>
                                <Col style={{ overflowY: 'scroll', overflowX: 'auto', height: this.state.height / 2 }}>
                                    <CubeTracker
                                        className="overflowAuto"
                                        locations={this.state.logic.getExtraChecksForArea(this.state.expandedGroup)}
                                        locationHandler={this.handleCubeClick}
                                        logic={this.state.logic}
                                        colorScheme={this.state.colorScheme}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={
                        {
                            position: 'fixed', bottom: 0, background: 'lightgrey', width: '100%', padding: '0.5%',
                        }
                    }
                    >
                        <Col>
                            <ImportExport state={this.state} importFunction={this.importState} />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.setState({ showCustomizationDialog: true })}>Customization</Button>
                        </Col>
                    </Row>
                </Container>
                <CustomizationModal
                    show={this.state.showCustomizationDialog}
                    onHide={() => this.setState({ showCustomizationDialog: false })}
                    colorScheme={this.state.colorScheme}
                    updateColorScheme={this.updateColorScheme}
                />
            </div>
        );
    }
}

Tracker.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }).isRequired,
};

export default Tracker;

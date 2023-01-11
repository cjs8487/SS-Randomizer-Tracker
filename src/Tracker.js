import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/ItemTracker';
import GridTracker from './itemTracker/GridTracker';
import BasicCounters from './BasicCounters';
import ImportExport from './ImportExport';
import DungeonTracker from './itemTracker/DungeonTracker';
import CubeTracker from './locationTracker/CubeTracker';
import ColorScheme from './customization/ColorScheme';
import CustomizationModal from './customization/CustomizationModal';
import Logic from './logic/Logic';
import Settings from './permalink/Settings';
import EntranceTracker from './entranceTracker/EntranceTracker';

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        const path = new URLSearchParams(window.location.search);
        const permalink = decodeURIComponent(path.get('options'));
        console.log(permalink);
        let colorScheme = JSON.parse(localStorage.getItem('ssrTrackerColorScheme'));
        if (!colorScheme) {
            colorScheme = new ColorScheme();
        }
        let layout = localStorage.getItem('ssrTrackerLayout');
        if (!layout) {
            layout = 'inventory';
        }
        this.state = {
            settings: new Settings(),
            width: window.innerWidth,
            height: window.innerHeight,
            showCustomizationDialog: false,
            colorScheme,
            layout,
            showEntranceDialog: false,
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
        this.reset = this.reset.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        // const storedState = JSON.parse(localStorage.getItem('ssrTrackerState'));
        // if (storedState) {
        //     this.importState(storedState);
        // } else {
        //     this.initialize(permalink);
        // }
        this.initialize(permalink);
    }

    componentDidMount() {
        // updating window properties
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
            return '';
        });
    }

    componentDidUpdate() {
        localStorage.setItem('ssrTrackerState', JSON.stringify(this.state));
        localStorage.setItem('ssrTrackerColorScheme', JSON.stringify(this.state.colorScheme));
        localStorage.setItem('ssrTrackerLayout', this.state.layout);
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

    handleLocationClick(group, location, forceState) {
        if (forceState !== undefined) {
            if (location.checked !== forceState) {
                this.state.logic.updateCounters(group, forceState, location.inLogic);
            }
            location.checked = forceState;
        } else {
            location.checked = !location.checked;
            this.state.logic.updateCounters(group, location.checked, location.inLogic);
        }
        // handle any locations that contribute to additional factors, such as dungeon tracking
        switch (location.name) {
            case 'Ruby Tablet':
                this.state.logic.toggleDungeonCompleted('Skyview');
                break;
            case 'Amber Tablet':
                this.state.logic.toggleDungeonCompleted('Earth Temple');
                break;
            case 'Goddess Harp':
                this.state.logic.toggleDungeonCompleted('Lanayru Mining Facility');
                break;
            case "Farore's Flame":
                this.state.logic.toggleDungeonCompleted('Ancient Cistern');
                break;
            case "Nayru's Flame":
                this.state.logic.toggleDungeonCompleted('Sandship');
                break;
            case "Din's Flame":
                this.state.logic.toggleDungeonCompleted('Fire Sanctuary');
                break;
            default:
                break;
        }
        this.forceUpdate();
    }

    handleCubeClick(location) {
        this.state.logic.toggleExtraLocationChecked(location);
        this.forceUpdate();
    }

    handleItemClick(item, take) {
        if (take) {
            this.state.logic.takeItem(item);
        } else {
            this.state.logic.giveItem(item);
        }
        this.state.logic.checkAllRequirements();
        this.state.logic.updateCountersForItem();
        if (item === 'Triforce') {
            if (this.state.logic.getItem(item) === 3) {
                this.state.logic.toggleDungeonCompleted('Sky Keep');
            } else if (this.state.logic.isDungeonCompleted('Sky Keep')) {
                this.state.logic.toggleDungeonCompleted('Sky Keep');
            }
        }
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

    async initialize(permalink) {
        await this.state.settings.init();
        this.state.settings.updateFromPermalink(permalink);
        const startingItems = [];
        startingItems.push('Sailcloth');
        if (this.state.settings.getOption('Starting Tablet Count') === 3) {
            startingItems.push('Emerald Tablet');
            startingItems.push('Ruby Tablet');
            startingItems.push('Amber Tablet');
        }
        if (this.state.settings.getOption('Start with Adventure Pouch')) {
            startingItems.push('Progressive Pouch');
        }
        const startingSword = this.state.settings.getOption('Starting Sword');
        if (!(startingSword === 'Swordless')) {
            const swordsToAdd = {
                'Practice Sword': 1,
                'Goddess Sword': 2,
                'Goddess Longsword': 3,
                'Goddess White Sword': 4,
                'Master Sword': 5,
                'True Master Sword': 6,
            };

            for (let swordsAdded = 0; swordsAdded < swordsToAdd[startingSword]; swordsAdded++) {
                startingItems.push('Progressive Sword');
            }
        }
        const logic = new Logic();
        await logic.initialize(this.state.settings, startingItems);
        this.setState({ logic });
    }

    updateColorScheme(colorScheme) {
        this.setState({ colorScheme });
    }

    updateLayout(e) {
        const { value } = e.target;
        this.setState({ layout: value });
    }

    async importState(state) {
        const oldLogic = state.logic;
        // this.setState({loading: true})
        const settings = new Settings();
        settings.loadFrom(state.settings);
        state.settings = settings;
        state.logic = new Logic();
        await state.logic.initialize(state.settings, []);
        state.logic.loadFrom(oldLogic);
        this.setState(state);
        // this.forceUpdate();
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    reset() {
        const path = new URLSearchParams(this.props.location.search);
        const permalink = decodeURIComponent(path.get('options'));
        this.initialize(permalink);
    }

    render() {
        // ensure that logic is properly initialized befopre attempting to render the actual tracker
        if (_.isNil(this.state.logic) || this.state.loading) {
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
        };

        const dungeonTrackerStyle = {
            width: this.state.widthwidth / 3,
        };

        let itemTracker;
        if (this.state.layout === 'inventory') {
            itemTracker = (
                <ItemTracker
                    styleProps={itemTrackerStyle}
                    items={this.state.trackerItems}
                    logic={this.state.logic}
                    handleItemClick={this.handleItemClick}
                    colorScheme={this.state.colorScheme}
                />
            );
        } else if (this.state.layout === 'grid') {
            itemTracker = (
                <GridTracker
                    styleProps={itemTrackerStyle}
                    items={this.state.trackerItems}
                    logic={this.state.logic}
                    handleItemClick={this.handleItemClick}
                    colorScheme={this.state.colorScheme}
                />
            );
        }

        return (
            <div style={{ height: this.state.height * 0.95, overflow: 'hidden', background: this.state.colorScheme.background }}>
                <Container fluid>
                    <Row>
                        <Col>

                            {itemTracker}

                        </Col>
                        <Col>
                            <LocationTracker
                                items={this.state.trackerItems}
                                logic={this.state.logic}
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                handleLocationClick={this.handleLocationClick}
                                colorScheme={this.state.colorScheme}
                                containerHeight={this.state.height * 0.95}
                            />
                        </Col>
                        <Col>
                            <Row noGutters>
                                <BasicCounters
                                    locationsChecked={this.state.logic.getTotalLocationsChecked()}
                                    totalAccessible={this.state.logic.getTotalLocationsInLogic()}
                                    checksRemaining={this.state.logic.getTotalRemainingChecks()}
                                    colorScheme={this.state.colorScheme}
                                />
                            </Row>
                            <Row noGutters>
                                <DungeonTracker
                                    style={{ height: (this.state.height * 0.95) * 0.3 }}
                                    styleProps={dungeonTrackerStyle}
                                    handleItemClick={this.handleItemClick}
                                    handleDungeonUpdate={this.handleDungeonClick}
                                    items={this.state.trackerItems}
                                    logic={this.state.logic}
                                    skyKeep={!(this.state.settings.getOption('Empty Unrequired Dungeons') & (!this.state.settings.getOption('Triforce Required') | this.state.settings.getOption('Triforce Shuffle') === 'Anywhere'))}
                                    entranceRando={this.state.settings.getOption('Randomize Entrances')}
                                    trialRando={this.state.settings.getOption('Randomize Silent Realms')}
                                    colorScheme={this.state.colorScheme}
                                    groupClicked={this.handleGroupClick}
                                />
                            </Row>
                            <Row style={{ paddingRight: '10%', paddingTop: '2.5%', height: (this.state.height * 0.95) / 2 }} noGutters>
                                <Col style={{ overflowY: 'scroll', overflowX: 'auto', height: (this.state.height * 0.95) - 447 }} noGutters>
                                    <CubeTracker
                                        className="overflowAuto"
                                        locations={this.state.logic.getExtraChecksForArea(this.state.expandedGroup)}
                                        locationHandler={this.handleCubeClick}
                                        logic={this.state.logic}
                                        colorScheme={this.state.colorScheme}
                                        containerHeight={(this.state.height * 0.95) / 2}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={
                        {
                            position: 'fixed',
                            bottom: 0,
                            background: 'lightgrey',
                            width: '100%',
                            padding: '0.5%',
                            height: this.state.height * 0.05,
                        }
                    }
                    >
                        <Col>
                            <ImportExport state={this.state} importFunction={this.importState} />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.setState({ showCustomizationDialog: true })}>Customization</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.setState({ showEntranceDialog: true })}>Entrances</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={this.reset}>Reset</Button>
                        </Col>
                    </Row>
                </Container>
                <CustomizationModal
                    show={this.state.showCustomizationDialog}
                    onHide={() => this.setState({ showCustomizationDialog: false })}
                    colorScheme={this.state.colorScheme}
                    updateColorScheme={this.updateColorScheme}
                    updateLayout={this.updateLayout}
                    selectedLayout={this.state.layout}
                />
                <EntranceTracker
                    show={this.state.showEntranceDialog}
                    onHide={() => this.setState({ showEntranceDialog: false })}
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

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
import MapDungeonTracker from './itemTracker/MapDungeonTracker';
import CubeTracker from './locationTracker/CubeTracker';
import ColorScheme from './customization/ColorScheme';
import CustomizationModal from './customization/CustomizationModal';
import Logic from './logic/Logic';
import Settings from './permalink/Settings';
import EntranceTracker from './entranceTracker/EntranceTracker';
import WorldMap from './locationTracker/mapTracker/WorldMap';

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        const path = new URLSearchParams(window.location.search);
        const permalink = decodeURIComponent(path.get('options'));
        const source = path.get('source');
        let colorScheme = JSON.parse(localStorage.getItem('ssrTrackerColorScheme'));
        if (!colorScheme) {
            colorScheme = new ColorScheme();
        }
        let itemLayout = localStorage.getItem('ssrTrackerItemLayout');
        if (!itemLayout) {
            itemLayout = 'inventory';
        }
        let locationLayout = localStorage.getItem('ssrTrackerLocationLayout');
        if (!locationLayout) {
            locationLayout = 'list';
        }
        this.state = {
            settings: new Settings(),
            width: window.innerWidth,
            height: window.innerHeight,
            showCustomizationDialog: false,
            colorScheme,
            itemLayout,
            locationLayout,
            showEntranceDialog: false,
            source,
        };
        // bind this to handlers to ensure that context is correct when they are called so they have
        // access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleSubmapClick = this.handleSubmapClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCubeClick = this.handleCubeClick.bind(this);
        this.handleDungeonClick = this.handleDungeonClick.bind(this);
        this.handleCheckAllClick = this.handleCheckAllClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.importState = this.importState.bind(this);
        this.updateColorScheme = this.updateColorScheme.bind(this);
        this.reset = this.reset.bind(this);
        this.updateItemLayout = this.updateItemLayout.bind(this);
        this.updateLocationLayout = this.updateLocationLayout.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleDungeonBind = this.handleDungeonBind.bind(this);
        // const storedState = JSON.parse(localStorage.getItem('ssrTrackerState'));
        // if (storedState) {
        //     this.importState(storedState);
        // } else {
        //     this.initialize(permalink);
        // }
        this.initialize(permalink, source);
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
        localStorage.setItem('ssrTrackerItemLayout', this.state.itemLayout);
        localStorage.setItem('ssrTrackerLocationLayout', this.state.locationLayout);
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

    handleSubmapClick(submap) {
        if (this.state.activeSubmap === submap) {
            this.setState({ activeSubmap: '' }); // deselection if the opened group is clicked again
        } else {
            this.setState({ activeSubmap: submap });
        }
        this.setState({ expandedGroup: '' }); // close active group as well
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
        // handle any locations that contribute to additional factors, such as
        // dungeon tracking
        console.log(group);
        const { name } = location;
        if (name === 'Strike Crest') {
            if (group === 'Skyview') {
                this.state.logic.toggleDungeonCompleted('Skyview');
            } else if (group === 'Earth Temple') {
                this.state.logic.toggleDungeonCompleted('Earth Temple');
            }
        }
        switch (location.name) {
            case 'Exit Hall of Ancient Robots':
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

    handleHintClick(region, hint) {
        this.state.logic.regionHints[region] = hint;
        this.forceUpdate();
    }

    handleDungeonBind(entrance, dungeon) {
        const previousDungeon = this.state.logic.dungeonConnections[entrance];
        this.state.logic.dungeonConnections[entrance] = dungeon;
        // this.state.logic.updateAccessibleEntrances();
        if (previousDungeon !== '') {
            this.state.logic.takeItem(_.camelCase(`Entered ${previousDungeon}`));
        }
        if (dungeon !== '') {
            this.state.logic.giveItem(_.camelCase(`Entered ${dungeon}`));
        }
        this.forceUpdate();
    }

    handleCheckAllClick(region, checked) {
        _.forEach(this.state.logic.locationsForArea(region), (location) => {
            location.checked = checked;
        });
        this.state.logic.updateAllCounters();
        this.forceUpdate();
    }

    setItemState(item, state) {
        const newItems = { ...this.state.trackerItems };
        newItems[item] = state;
        this.updateLocationLogic(item, state);
        return newItems;
    }

    async initialize(permalink, source) {
        await this.state.settings.init(source);
        this.state.settings.updateFromPermalink(permalink);
        const startingItems = [];
        this.state.settings.setOption('open-et', this.state.settings.getOption('Open Earth Temple'));
        this.state.settings.setOption('open-lmf', this.state.settings.getOption('Open Lanayru Mining Facility'));
        startingItems.push('Sailcloth');
        if (this.state.settings.getOption('Starting Tablet Count') === 3) {
            startingItems.push('Emerald Tablet');
            startingItems.push('Ruby Tablet');
            startingItems.push('Amber Tablet');
        }
        for (let crystalPacksAdded = 0; crystalPacksAdded < this.state.settings.getOption('Starting Gratitude Crystal Packs'); crystalPacksAdded++) {
            startingItems.push('5 Gratitude Crystal');
        }
        for (let tadtonesAdded = 0; tadtonesAdded < this.state.settings.getOption('Starting Tadtone Count'); tadtonesAdded++) {
            startingItems.push('Group of Tadtones');
        }
        for (let bottlesAdded = 0; bottlesAdded < this.state.settings.getOption('Starting Empty Bottles'); bottlesAdded++) {
            startingItems.push('Empty Bottle');
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
        _.forEach(this.state.settings.getOption('Starting Items'), (item) => {
            if (item.includes('Song of the Hero')) {
                startingItems.push('Song of the Hero');
            } else if (item.includes('Triforce')) {
                startingItems.push('Triforce');
            } else if (!item.includes('Pouch') | !startingItems.includes('Progressive Pouch')) {
                startingItems.push(item);
            }
        });
        const logic = new Logic();
        await logic.initialize(this.state.settings, startingItems, source);
        this.setState({ logic });
    }

    updateColorScheme(colorScheme) {
        this.setState({ colorScheme });
    }

    updateItemLayout(e) {
        const { value } = e.target;
        this.setState({ itemLayout: value });
    }

    updateLocationLayout(e) {
        const { value } = e.target;
        this.setState({ locationLayout: value });
    }

    async importState(state) {
        const oldLogic = state.logic;
        const oldWidth = this.state.width;
        const oldHeight = this.state.height;
        // this.setState({loading: true})
        const settings = new Settings();
        settings.loadFrom(state.settings);
        state.settings = settings;
        state.logic = new Logic();
        state.width = oldWidth;
        state.height = oldHeight;
        // default to main if no source was saved (as will be the case for saves made before this change is deployed)
        const source = (state.source ? state.source : 'main');
        await state.logic.initialize(state.settings, [], source);
        state.logic.loadFrom(oldLogic);
        this.setState(state);
        // this.forceUpdate();
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    reset() {
        const path = new URLSearchParams(window.location.search);
        const permalink = decodeURIComponent(path.get('options'));
        this.initialize(permalink, path.get('source'));
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
        const mapOn = this.state.locationLayout === 'map';
        const itemTrackerStyle = {
            position: 'fixed',
            width: 12 * this.state.width / 30, // this is supposed to be *a bit* more than 1/3. Min keeps it visible when the window is short
            height: this.state.height * (mapOn ? 0.9 : 1),
            left: '1%',
            top: 0,
            margin: '1%',
        };
        const gridTrackerStyle = {
            position: 'relative',
            width: 2 * this.state.width / 5,
            height: this.state.height,
            left: 0,
            margin: '1%',
        };

        const dungeonTrackerStyle = {
            width: this.state.width / 3,
            position: 'fixed',
        };
        const dungeonMapTrackerStyle = {
            width: this.state.width / 3.3,
            height: this.state.height,
            position: 'fixed',
            bottom: 0,
        };
        let itemTracker;
        if (this.state.itemLayout === 'inventory') {
            itemTracker = (
                <ItemTracker
                    styleProps={itemTrackerStyle}
                    items={this.state.trackerItems}
                    logic={this.state.logic}
                    handleItemClick={this.handleItemClick}
                    colorScheme={this.state.colorScheme}
                    mapMode={mapOn}
                    style={{zIndex: 2}}
                />
            );
        } else if (this.state.itemLayout === 'grid') {
            itemTracker = (
                <GridTracker
                    styleProps={gridTrackerStyle}
                    items={this.state.trackerItems}
                    logic={this.state.logic}
                    handleItemClick={this.handleItemClick}
                    colorScheme={this.state.colorScheme}
                    mapMode={mapOn}
                    style={{zIndex: 2}}
                />
            );
        }
        let mainTracker;
        if (!mapOn) {
            mainTracker = (
                <Container fluid>
                    <Row>
                        <Col xs={4}>
                            {itemTracker}
                        </Col>
                        <Col xs={4}>
                            <LocationTracker
                                items={this.state.trackerItems}
                                logic={this.state.logic}
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                handleLocationClick={this.handleLocationClick}
                                handleHintClick={this.handleHintClick}
                                handleCheckAllClick={this.handleCheckAllClick}
                                colorScheme={this.state.colorScheme}
                                containerHeight={this.state.height * 0.95}
                            />
                        </Col>
                        <Col xs={4}>
                            <Row noGutters>
                                <BasicCounters
                                    locationsChecked={this.state.logic.getTotalLocationsChecked()}
                                    totalAccessible={this.state.logic.getTotalLocationsInLogic()}
                                    checksRemaining={this.state.logic.getTotalRemainingChecks()}
                                    colorScheme={this.state.colorScheme}
                                />
                            </Row>
                            <Row>
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
            )
        } else {
            const dungeonTracker = (
                <MapDungeonTracker
                    style={{ height: (this.state.height * 0.95) * 0.1, position: 'absolute', bottom: 0, left: 5993 }}
                    styleProps={dungeonMapTrackerStyle}
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
            )
            mainTracker = (
                <Container fluid>
                    <Row>
                        <Col xs={4}>
                            {dungeonTracker}
                            {itemTracker}
                        </Col>
                        <Col xs={6}>
                            <WorldMap
                                logic={this.state.logic}
                                imgWidth={this.state.width * 0.5}
                                colorScheme={this.state.colorScheme}
                                handleGroupClick={this.handleGroupClick}
                                expandedGroup={this.state.expandedGroup}
                                handleLocationClick={this.handleLocationClick}
                                handleHintClick={this.handleHintClick}
                                handleCheckAllClick={this.handleCheckAllClick}
                                containerHeight={this.state.height * 0.95}
                                handleSubmapClick={this.handleSubmapClick}
                                activeSubmap={this.state.activeSubmap}
                                handleDungeonBind={this.handleDungeonBind}
                            />
                        </Col>
                        <Col xs={2}>
                            <Row noGutters>
                                <BasicCounters
                                    locationsChecked={this.state.logic.getTotalLocationsChecked()}
                                    totalAccessible={this.state.logic.getTotalLocationsInLogic()}
                                    checksRemaining={this.state.logic.getTotalRemainingChecks()}
                                    colorScheme={this.state.colorScheme}
                                    mapMode
                                />
                            </Row>
                            <Row style={{ paddingRight: '2%', paddingTop: '2.5%', height: (this.state.height * 0.95) / 2 }} noGutters>
                                <Col style={{ overflowY: 'scroll', overflowX: 'auto', height: (this.state.height * 0.5) }} noGutters>
                                    <CubeTracker
                                        className="overflowAuto"
                                        locations={this.state.logic.getExtraChecksForArea(this.state.expandedGroup)}
                                        locationHandler={this.handleCubeClick}
                                        logic={this.state.logic}
                                        colorScheme={this.state.colorScheme}
                                        containerHeight={(this.state.height * 0.95) / 1.25}
                                        mapMode
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
            )
        }



        return (
            <div style={{ height: this.state.height * 0.95, overflow: 'hidden', background: this.state.colorScheme.background }}>
                {mainTracker}
                <CustomizationModal
                    show={this.state.showCustomizationDialog}
                    onHide={() => this.setState({ showCustomizationDialog: false })}
                    colorScheme={this.state.colorScheme}
                    updateColorScheme={this.updateColorScheme}
                    updateItemLayout={this.updateItemLayout}
                    updateLocationLayout={this.updateLocationLayout}
                    selectedItemLayout={this.state.itemLayout}
                    selectedLocationLayout={this.state.locationLayout}
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

import React, { CSSProperties } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/ItemTracker';
import GridTracker from './itemTracker/GridTracker';
import BasicCounters from './BasicCounters';
import ImportExport, { ExportState } from './ImportExport';
import DungeonTracker from './itemTracker/DungeonTracker';
import CubeTracker from './locationTracker/CubeTracker';
import ColorScheme from './customization/ColorScheme';
import CustomizationModal, { Layout } from './customization/CustomizationModal';
import Logic from './logic/Logic';
import Settings from './permalink/Settings';
import EntranceTracker from './entranceTracker/EntranceTracker';
import ItemLocation from './logic/ItemLocation';

interface TrackerState {
    logic?: Logic,
    settings?: Settings,
    width: number;
    height: number;
    showCustomizationDialog: boolean;
    colorScheme: ColorScheme;
    layout: Layout;
    showEntranceDialog: boolean;
    source: string;
    expandedGroup: string;
}

function initTrackerState(): TrackerState {
    const path = new URLSearchParams(window.location.search);
    const source = path.get('source')!;
    const schemeJson = localStorage.getItem('ssrTrackerColorScheme');
    const colorScheme = schemeJson ? JSON.parse(schemeJson) as ColorScheme : new ColorScheme();
    const layout = localStorage.getItem('ssrTrackerLayout') as Layout | null ?? 'inventory';
    return {
        logic: undefined,
        settings: undefined,
        width: window.innerWidth,
        height: window.innerHeight,
        showCustomizationDialog: false,
        colorScheme,
        layout,
        showEntranceDialog: false,
        source,
        expandedGroup: '',
    };
}

async function createInitializationState(): Promise<Pick<TrackerState, 'settings' | 'logic'>> {
    const path = new URLSearchParams(window.location.search);
    const permalink = decodeURIComponent(path.get('options')!);
    const source = path.get('source')!;

    const settings = new Settings();
    await settings.init(source);
    settings.updateFromPermalink(permalink);
    const startingItems: string[] = [];
    settings.setOption('open-et', settings.getOption('Open Earth Temple'));
    settings.setOption('open-lmf', settings.getOption('Open Lanayru Mining Facility'));
    startingItems.push('Sailcloth');
    if (settings.getOption('Starting Tablet Count') === 3) {
        startingItems.push('Emerald Tablet');
        startingItems.push('Ruby Tablet');
        startingItems.push('Amber Tablet');
    }
    for (let crystalPacksAdded = 0; crystalPacksAdded < (settings.getOption('Starting Gratitude Crystal Packs') as number); crystalPacksAdded++) {
        startingItems.push('5 Gratitude Crystal');
    }
    for (let tadtonesAdded = 0; tadtonesAdded < (settings.getOption('Starting Tadtone Count') as number); tadtonesAdded++) {
        startingItems.push('Group of Tadtones');
    }
    for (let bottlesAdded = 0; bottlesAdded < (settings.getOption('Starting Empty Bottles') as number); bottlesAdded++) {
        startingItems.push('Empty Bottle');
    }
    const startingSword = settings.getOption('Starting Sword') as string;
    if (!(startingSword === 'Swordless')) {
        const swordsToAdd: Record<string, number> = {
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
    _.forEach(settings.getOption('Starting Items') as string[], (item) => {
        if (item.includes('Song of the Hero')) {
            startingItems.push('Song of the Hero');
        } else if (item.includes('Triforce')) {
            startingItems.push('Triforce');
        } else if (!item.includes('Pouch') || !startingItems.includes('Progressive Pouch')) {
            startingItems.push(item);
        }
    });
    const logic = new Logic();
    await logic.initialize(settings, startingItems, source);
    return { logic, settings };
}

async function createImportedState(importedState: ExportState): Promise<Pick<TrackerState, 'settings' | 'logic'>> {
    const settings = new Settings();
    settings.loadFrom(importedState.settings);

    const logic = new Logic();
    const source = importedState.source ?? 'main';
    await logic.initialize(settings, [], source);
    logic.loadFrom(importedState.logic);
    
    return { logic, settings, ..._.pick(importedState, 'colorScheme', 'source', 'layout') };
}

function raiseLogicError(): never {
    throw new Error("logic needs to be loaded");
}

export default class Tracker extends React.Component<Record<string, never>, TrackerState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = initTrackerState();

        // bind this to handlers to ensure that context is correct when they are called so they have
        // access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleCubeClick = this.handleCubeClick.bind(this);
        this.handleDungeonClick = this.handleDungeonClick.bind(this);
        this.handleCheckAllClick = this.handleCheckAllClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.importState = this.importState.bind(this);
        this.updateColorScheme = this.updateColorScheme.bind(this);
        this.reset = this.reset.bind(this);
        this.updateLayout = this.updateLayout.bind(this);

        this.updateStateWith(createInitializationState());
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

    updateStateWith<K extends keyof TrackerState>(source: Promise<Pick<TrackerState, K>>) {
        source.then((newState) => this.setState(newState)).catch((e) => {
            console.error("error updating tracker state", e);
        });
    }

    handleGroupClick(group: string) {
        if (this.state.expandedGroup === group) {
            this.setState({ expandedGroup: '' }); // deselection if the opened group is clicked again
        } else {
            this.setState({ expandedGroup: group });
        }
    }

    handleLocationClick(group: string, location: ItemLocation, forceState?: boolean) {
        if (!this.state.logic) {
            raiseLogicError();
        }
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

    handleCubeClick(location: ItemLocation) {
        if (!this.state.logic) {
            raiseLogicError();
        }
        this.state.logic.toggleExtraLocationChecked(location);
        this.forceUpdate();
    }

    handleItemClick(item: string, take: boolean) {
        if (!this.state.logic) {
            raiseLogicError();
        }
        if (take) {
            this.state.logic.takeItem(item);
        } else {
            this.state.logic.giveItem(item);
        }
        this.state.logic.checkAllRequirements();
        this.state.logic.updateCountersForItem();
        if (item === 'Triforce' && (this.state.logic.getItem(item) === 3 || this.state.logic.isDungeonCompleted('Sky Keep'))) {
            this.state.logic.toggleDungeonCompleted('Sky Keep');
        }
        this.forceUpdate();
    }

    handleDungeonClick(dungeon: string) {
        if (!this.state.logic) {
            throw new Error("need logic to be loaded");
        }
        this.state.logic.toggleDungeonRequired(dungeon);
        this.forceUpdate();
    }

    handleCheckAllClick(region: string, checked: boolean) {
        if (!this.state.logic) {
            throw new Error("need logic to be loaded");
        }
        _.forEach(this.state.logic.locationsForArea(region), (location) => {
            location.checked = checked;
        });
        this.state.logic.updateAllCounters();
        this.forceUpdate();
    }

    updateColorScheme(colorScheme: ColorScheme) {
        this.setState({ colorScheme });
    }

    updateLayout(layout: Layout) {
        this.setState({ layout });
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    importState(state: ExportState) {
        this.updateStateWith(createImportedState(state));
    }

    reset() {
        this.updateStateWith(createInitializationState());
    }

    render() {
        // ensure that logic is properly initialized befopre attempting to render the actual tracker
        if (!this.state.logic || !this.state.settings) {
            return (
                <div />
            );
        }
        this.state.logic.checkAllRequirements();
        const itemTrackerStyle: CSSProperties = {
            position: 'fixed',
            width: 12 * this.state.width / 30, // this is supposed to be *a bit* more than 1/3. Min keeps it visible when the window is short
            height: this.state.height,
            left: 0,
            top: 0,
            margin: '1%',
        };
        const gridTrackerStyle: CSSProperties = {
            position: 'fixed',
            width: 2 * this.state.width / 5,
            height: this.state.height,
            left: 0,
            top: 0,
            margin: '1%',
        };

        let itemTracker;
        if (this.state.layout === 'inventory') {
            itemTracker = (
                <ItemTracker
                    styleProps={itemTrackerStyle}
                    logic={this.state.logic}
                    handleItemClick={this.handleItemClick}
                    colorScheme={this.state.colorScheme}
                />
            );
        } else if (this.state.layout === 'grid') {
            itemTracker = (
                <GridTracker
                    styleProps={gridTrackerStyle}
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
                                logic={this.state.logic}
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                handleLocationClick={this.handleLocationClick}
                                handleCheckAllClick={this.handleCheckAllClick}
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
                                    handleItemClick={this.handleItemClick}
                                    handleDungeonUpdate={this.handleDungeonClick}
                                    logic={this.state.logic}
                                    skyKeep={!(this.state.settings.getOption('Empty Unrequired Dungeons') && (!this.state.settings.getOption('Triforce Required') || this.state.settings.getOption('Triforce Shuffle') === 'Anywhere'))}
                                    entranceRando={this.state.settings.getOption('Randomize Entrances') as string}
                                    trialRando={this.state.settings.getOption('Randomize Silent Realms') as boolean}
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
                            <ImportExport state={this.state as Required<TrackerState>} importFunc={this.importState} />
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

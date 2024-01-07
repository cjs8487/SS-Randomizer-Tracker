import React, { CSSProperties } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import LocationTracker from './locationTracker/LocationTracker';
import ItemTracker from './itemTracker/ItemTracker';
import GridTracker from './itemTracker/GridTracker';
import BasicCounters from './BasicCounters';
import ImportExport from './ImportExport';
import DungeonTracker from './itemTracker/DungeonTracker';
import CubeTracker from './locationTracker/CubeTracker';
import ColorScheme, { lightColorScheme } from './customization/ColorScheme';
import CustomizationModal, { Layout } from './customization/CustomizationModal';
import EntranceTracker from './entranceTracker/EntranceTracker';
import { useDispatch } from 'react-redux';
import { reset } from './state/Tracker';

interface TrackerState {
    width: number;
    height: number;
    showCustomizationDialog: boolean;
    colorScheme: ColorScheme;
    layout: Layout;
    showEntranceDialog: boolean;
    expandedGroup: string;
}

function initTrackerState(): TrackerState {
    const schemeJson = localStorage.getItem('ssrTrackerColorScheme');
    const colorScheme = schemeJson ? JSON.parse(schemeJson) as ColorScheme : lightColorScheme;
    const layout = localStorage.getItem('ssrTrackerLayout') as Layout | null ?? 'inventory';
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        showCustomizationDialog: false,
        colorScheme,
        layout,
        showEntranceDialog: false,
        expandedGroup: '',
    };
}

export default class Tracker extends React.Component<Record<string, never>, TrackerState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = initTrackerState();

        // bind this to handlers to ensure that context is correct when they are called so they have
        // access to this.state and this.props
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateColorScheme = this.updateColorScheme.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
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
        this.updateColorSchemeVars();
    }

    componentDidUpdate() {
        localStorage.setItem('ssrTrackerState', JSON.stringify(this.state));
        localStorage.setItem('ssrTrackerColorScheme', JSON.stringify(this.state.colorScheme));
        localStorage.setItem('ssrTrackerLayout', this.state.layout);
        this.updateColorSchemeVars();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateColorSchemeVars() {
        const html = document.querySelector('html')!;
        Object.entries(this.state.colorScheme).forEach(([key, val]) => {
            html.style.setProperty(`--scheme-${key}`, val.toString());
        });
    }

    updateStateWith<K extends keyof TrackerState>(source: Promise<Pick<TrackerState, K>>) {
        source.then((newState) => this.setState(newState));
    }

    handleGroupClick(group: string) {
        if (this.state.expandedGroup === group) {
            this.setState({ expandedGroup: '' }); // deselection if the opened group is clicked again
        } else {
            this.setState({ expandedGroup: group });
        }
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

    render() {
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
                />
            );
        } else if (this.state.layout === 'grid') {
            itemTracker = (
                <GridTracker
                    styleProps={gridTrackerStyle}
                />
            );
        }

        return (
            <div style={{ height: this.state.height * 0.95, overflow: 'hidden', color: 'var(--scheme-text)', background: 'var(--scheme-background)' }}>
                <Container fluid>
                    <Row>
                        <Col>

                            {itemTracker}

                        </Col>
                        <Col>
                            <LocationTracker
                                expandedGroup={this.state.expandedGroup}
                                handleGroupClick={this.handleGroupClick}
                                containerHeight={this.state.height * 0.95}
                            />
                        </Col>
                        <Col>
                            <Row noGutters>
                                <BasicCounters />
                            </Row>
                            <Row noGutters>
                                <DungeonTracker
                                    groupClicked={this.handleGroupClick}
                                />
                            </Row>
                            <Row style={{ paddingRight: '10%', paddingTop: '2.5%', height: (this.state.height * 0.95) / 2 }} noGutters>
                                <Col style={{ overflowY: 'scroll', overflowX: 'auto', height: (this.state.height * 0.95) - 447 }} noGutters>
                                    <CubeTracker
                                        className="overflowAuto"
                                        expandedGroup={this.state.expandedGroup}
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
                            <ImportExport />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.setState({ showCustomizationDialog: true })}>Customization</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={() => this.setState({ showEntranceDialog: true })}>Entrances</Button>
                        </Col>
                        <Col>
                            <ResetButton />
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

function ResetButton() {
    const dispatch = useDispatch();
    return (
        <Button
            variant="primary"
            onClick={() => dispatch(reset({ settings: undefined }))}
        >
            Reset
        </Button>
    );
}
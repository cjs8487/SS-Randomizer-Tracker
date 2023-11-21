import _ from 'lodash';
import {
    Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, /* FormSelect, */Row,
} from 'react-bootstrap';
import React, { CSSProperties, ChangeEvent } from 'react';
import './options.css';
import { Link } from 'react-router-dom';
import Settings from './permalink/Settings';
import Acknowledgement from './Acknowledgment';
import { RawOptions } from './permalink/SettingsTypes';

interface State {
    settings: Settings;
    ready: boolean;
    latestVersion: string;
    source: string;
}

export default class Options extends React.Component<Record<string, never>, State> {

    changeShopsanity: () => void;
    changeTadtonesanity: () => void;
    changeRupeesanity: () => void;
    changeRaceMode: () => void;
    changeTriforceRequired: () => void;
    changeSkywardStrike: () => void;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            settings: new Settings(),
            ready: false,
            latestVersion: '',
            source: 'main',
        };
        const versionData = this.getVersionData();
        versionData.then((value) => {
            // pull the name of the latest version
            const latestVersion = value[0].tag_name;
            this.setState({ source: latestVersion, latestVersion })
        });
        /*
        _.forEach(regions, (region) => {
            this[_.camelCase(`changeRegion${region.internal}`)] = this.changeBannedLocation.bind(this, region.internal);
        });
        _.forEach(types, (type) => {
            this[_.camelCase(`changeType${type.internal}`)] = this.changeBannedLocation.bind(this, type.internal);
        });
        _.forEach(cubes, (cube) => {
            this[_.camelCase(`changeCube${cube.internal}`)] = this.changeBannedLocation.bind(this, cube.internal);
        });
        */
        this.changeBinaryOption = this.changeBinaryOption.bind(this);
        this.changeStartingTablets = this.changeStartingTablets.bind(this);
        this.changeEntranceRando = this.changeEntranceRando.bind(this);
        this.changeShopsanity = this.changeBinaryOption.bind(this, 'Shopsanity');
        this.changeTadtonesanity = this.changeBinaryOption.bind(this, 'Tadtonesanity');
        this.changeRupeesanity = this.changeBinaryOption.bind(this, 'Rupeesanity');
        // this.changeGoddess = this.changeBannedLocation.bind(this, 'goddess');
        this.changeStartingSword = this.changeStartingSword.bind(this);
        this.changeRaceMode = this.changeBinaryOption.bind(this, 'Empty Unrequired Dungeons');
        this.changeThunderhead = this.changeThunderhead.bind(this);
        this.changeLMF = this.changeLMF.bind(this);
        this.changeTriforceRequired = this.changeBinaryOption.bind(this, 'Triforce Required');
        this.changeTriforceShuffle = this.changeTriforceShuffle.bind(this);
        this.changeSkywardStrike = this.changeBinaryOption.bind(this, 'Upgraded Skyward Strike');
        this.permalinkChanged = this.permalinkChanged.bind(this);
        this.updateSource = this.updateSource.bind(this);

        this.state.settings.init(this.state.source).then(() => {
            this.state.settings.loadDefaults();
            this.setState({ ready: true });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getVersionData() {
        const releaseData = await fetch('https://api.github.com/repos/ssrando/ssrando/releases');
        return await releaseData.json() as { tag_name: string }[];
    }

    changeBinaryOption(option: keyof RawOptions) {
        // for some reason this correct method of setting state does not work correctly in our case
        // as such we must revert to the incorrect method which may result in unexpected/undefined behavior
        // also need to disable the eslint error for it to allow the code to compile
        // this.setState((prevState) => {
        //     const newstate = prevState.options;
        //     newstate[option] = !prevState.options[option];
        //     return { options: newstate };
        // });
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.state.settings.toggleOption(option);
        this.forceUpdate();
    }

    changeStartingTablets(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.setOption('Starting Tablet Count', parseInt(value, 10));
        this.forceUpdate();
    }

    changeEntranceRando(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.setOption('Randomize Entrances', value);
        this.forceUpdate();
    }

    changeThunderhead(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.setOption('Open Thunderhead', value);
        this.forceUpdate();
    }

    changeLMF(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.setOption('Open Lanayru Mining Facility', value);
        this.forceUpdate();
    }

    changeTriforceShuffle(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.setOption('Triforce Shuffle', value);
        this.forceUpdate();
    }

    changeStartingSword(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.setOption('Starting Sword', value);
        this.forceUpdate();
    }

    permalinkChanged(e: ChangeEvent<HTMLInputElement>) {
        try {
            this.state.settings.updateFromPermalink(e.target.value);
        } catch (err) {
            // squash the error for now
        }
        this.forceUpdate();
    }

    updateSource(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.state.settings.init(value).then(() => {
            this.state.settings.loadDefaults();
            this.setState({ source: value });
            this.forceUpdate();
        });
    }

    render() {
        if (!this.state.ready) {
            return (
                <div />
            );
        }
        const style: CSSProperties = {
            border: 'ridge',
            borderWidth: 'thick',
            paddingLeft: '1%',
            paddingBottom: '1%',
            background: 'rgba(40, 40, 20, 0.1)',
            textAlign: 'left',
        };
        const legendStyle: CSSProperties = {
            marginLeft: '1%',
            paddingLeft: '0.25em',
            paddingRight: '0.25em',
            width: 'auto',
        };
        return (
            <Container fluid>
                <Form style={
                    {
                        width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '2%',
                    }
                }
                >
                    <div className="permalinkContainer">
                        <label htmlFor="permalink" className="permalinkLabel">
                            Settings String:
                            <input id="permalink" className="permalinkInput" placeholder="Permalink" value={this.state.settings.generatePermalink()} onChange={this.permalinkChanged} />
                        </label>
                        <div title="main, beta-features, and asyncs will pull from the latest update to that branch">
                            <Row>
                                <Col>
                                    <FormLabel htmlFor="fileSource">Randomizer Version</FormLabel>
                                </Col>
                                <Col>
                                    <FormControl
                                        as="select"
                                        id="fileSource"
                                        onChange={this.updateSource}
                                        value={this.state.source}
                                    >
                                        <option>{this.state.latestVersion}</option>
                                        <option>main</option>
                                        <option>beta-features</option>
                                        <option>asyncs</option>
                                    </FormControl>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <FormGroup as="fieldset" style={style}>
                        <legend style={legendStyle}>Shuffles</legend>
                        <Row>
                            <Col xs={3}>
                                <FormCheck
                                    type="switch"
                                    label="Shuffle Beedle's Shop"
                                    id="shopsanity"
                                    checked={this.state.settings.getOption('Shopsanity')}
                                    onChange={this.changeShopsanity}
                                />
                            </Col>
                            <Col xs={3}>
                                <FormCheck
                                    type="switch"
                                    label="Rupeesanity"
                                    id="rupeesanity"
                                    checked={this.state.settings.getOption('Rupeesanity') as boolean}
                                    onChange={this.changeRupeesanity}
                                />
                            </Col>
                            <Col xs={3}>
                                <FormCheck
                                    type="switch"
                                    label="Tadtonesanity"
                                    id="tadtonesanity"
                                    checked={this.state.settings.getOption('Tadtonesanity')}
                                    onChange={this.changeTadtonesanity}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup as="fieldset" style={style}>
                        <legend style={legendStyle}>Additional Randomization</legend>
                        <Row>
                            <Col xs={4}>
                                <FormGroup>
                                    <Row>
                                        <Col xs={5}>
                                            <FormLabel htmlFor="entranceRandoOptions">Randomize Entrances</FormLabel>
                                        </Col>
                                        <Col xs={7}>
                                            <FormControl
                                                as="select"
                                                id="entranceRandoOptions"
                                                onChange={this.changeEntranceRando}
                                                value={this.state.settings.getOption('Randomize Entrances')}
                                            >
                                                <option>None</option>
                                                <option>Required Dungeons Separately</option>
                                                <option>All Surface Dungeons</option>
                                                <option>All Surface Dungeons + Sky Keep</option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup>
                                    <Row>
                                        <Col xs={5}>
                                            <FormLabel htmlFor="startingSword">Starting Sword</FormLabel>
                                        </Col>
                                        <Col xs={7}>
                                            <FormControl
                                                as="select"
                                                id="startingSword"
                                                onChange={this.changeStartingSword}
                                                value={this.state.settings.getOption('Starting Sword')}
                                            >
                                                <option>Swordless</option>
                                                <option>Practice Sword</option>
                                                <option>Goddess Sword</option>
                                                <option>Goddess Longsword</option>
                                                <option>Goddess White Sword</option>
                                                <option>Master Sword</option>
                                                <option>True Master Sword</option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup>
                                    <Row>
                                        <Col xs={5}>
                                            <FormLabel htmlFor="startingTabletCounter">Starting Tablets</FormLabel>
                                        </Col>
                                        <Col xs={3}>
                                            <FormControl
                                                as="select"
                                                id="startingTabletCounter"
                                                onChange={this.changeStartingTablets}
                                                value={this.state.settings.getOption('Starting Tablet Count')}
                                            >
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Row>
                                        <Col xs={5}>
                                            <FormLabel htmlFor="openThunderhead">Open Thunderhead</FormLabel>
                                        </Col>
                                        <Col xs={5}>
                                            <FormControl
                                                as="select"
                                                id="openThunderhead"
                                                onChange={this.changeThunderhead}
                                                value={this.state.settings.getOption('Open Thunderhead')}
                                            >
                                                <option>Ballad</option>
                                                <option>Open</option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Row>
                                        <Col xs={5}>
                                            <FormLabel htmlFor="openLMF">Open Lanayru Mining Facility</FormLabel>
                                        </Col>
                                        <Col xs={5}>
                                            <FormControl
                                                as="select"
                                                id="openLMF"
                                                onChange={this.changeLMF}
                                                value={this.state.settings.getOption('Open Lanayru Mining Facility')}
                                            >
                                                <option>Nodes</option>
                                                <option>Main Node</option>
                                                <option>Open</option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormCheck
                                    type="switch"
                                    label="Upgraded Skyward Strike"
                                    id="skyward-strike"
                                    checked={this.state.settings.getOption('Upgraded Skyward Strike')}
                                    onChange={this.changeSkywardStrike}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormCheck
                                    type="switch"
                                    label="Empty Unrequired Dungeons"
                                    id="racemode"
                                    checked={this.state.settings.getOption('Empty Unrequired Dungeons')}
                                    onChange={this.changeRaceMode}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    type="switch"
                                    label="Triforce Required"
                                    id="triforceRequired"
                                    checked={this.state.settings.getOption('Triforce Required')}
                                    onChange={this.changeTriforceRequired}
                                />
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Row>
                                        <Col xs={5}>
                                            <FormLabel htmlFor="triforceShuffle">Triforce Shuffle</FormLabel>
                                        </Col>
                                        <Col xs={5}>
                                            <FormControl
                                                as="select"
                                                id="triforceShuffle"
                                                onChange={this.changeTriforceShuffle}
                                                value={this.state.settings.getOption('Triforce Shuffle')}
                                            >
                                                <option>Vanilla</option>
                                                <option>Sky Keep</option>
                                                <option>Anywhere</option>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Link to={{ pathname: '/tracker', search: `?options=${encodeURIComponent(this.state.settings.generatePermalink())}&source=${this.state.source}` }}>
                                <Button variant="primary">
                                    Launch New Tracker
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
                <Acknowledgement />
            </Container>
        );
    }
}

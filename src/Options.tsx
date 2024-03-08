import {
    Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, /* FormSelect, */Row,
} from 'react-bootstrap';
import React, { CSSProperties, ChangeEvent } from 'react';
import './options.css';
import { Link } from 'react-router-dom';
import Acknowledgement from './Acknowledgment';
import { Option, OptionsCommand, Settings } from './permalink/SettingsTypes';
import { decodePermalink, defaultSettings, encodePermalink } from './permalink/Settings';
import LogicLoader from './logic/LogicLoader';

interface State {
    options: Option[];
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

    changeStartingTablets: (ev: ChangeEvent<HTMLInputElement>) => void;
    changeEntranceRando: (ev: ChangeEvent<HTMLInputElement>) => void;
    changeStartingSword: (ev: ChangeEvent<HTMLInputElement>) => void;
    changeThunderhead: (ev: ChangeEvent<HTMLInputElement>) => void;
    changeLMF: (ev: ChangeEvent<HTMLInputElement>) => void;
    changeTriforceShuffle: (ev: ChangeEvent<HTMLInputElement>) => void;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            // With ready === false, we don't do anything,
            // so we lie about the types for convenience. Eventually
            // this will be connected to Redux
            // @ts-ignore
            settings: undefined,
            // @ts-ignore
            options: undefined,
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
        this.changeBinaryOption = this.changeBinaryOption.bind(this);
        this.changeStringOption = this.changeStringOption.bind(this);
        
        this.changeStartingTablets = this.changeIntOption.bind(this, 'starting-tablet-count');
        this.changeEntranceRando = this.changeStringOption.bind(this, 'randomize-entrances');
        this.changeShopsanity = this.changeBinaryOption.bind(this, 'shopsanity');
        this.changeTadtonesanity = this.changeBinaryOption.bind(this, 'tadtonesanity');
        this.changeRupeesanity = this.changeBinaryOption.bind(this, 'rupeesanity');
        this.changeStartingSword = this.changeStringOption.bind(this, 'starting-sword');
        this.changeRaceMode = this.changeBinaryOption.bind(this, 'empty-unrequired-dungeons');
        this.changeThunderhead = this.changeStringOption.bind(this, 'open-thunderhead');
        this.changeLMF = this.changeStringOption.bind(this, 'open-lmf');
        this.changeTriforceRequired = this.changeBinaryOption.bind(this, 'triforce-required');
        this.changeTriforceShuffle = this.changeStringOption.bind(this, 'triforce-shuffle');
        this.changeSkywardStrike = this.changeBinaryOption.bind(this, 'upgraded-skyward-strike');

        this.permalinkChanged = this.permalinkChanged.bind(this);
        this.updateSource = this.updateSource.bind(this);

        LogicLoader.loadLogicFiles(this.state.source).then(({ options }) => {
            this.setState({ ready: true, options, settings: defaultSettings(options) });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getVersionData() {
        const releaseData = await fetch('https://api.github.com/repos/ssrando/ssrando/releases');
        return await releaseData.json() as { tag_name: string }[];
    }

    changeBinaryOption(option: OptionsCommand) {
        this.setState((prevState) => {
            return { settings: { ...prevState.settings, [option]: !prevState.settings[option] } satisfies Settings };
        });
    }

    changeIntOption(option: OptionsCommand, e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.setState((prevState) => {
            return { settings: { ...prevState.settings, [option]: parseInt(value, 10) } satisfies Settings };
        });
    }

    changeStringOption(option: OptionsCommand, e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        this.setState((prevState) => {
            return { settings: { ...prevState.settings, [option]: value } satisfies Settings };
        });
    }

    permalinkChanged(e: ChangeEvent<HTMLInputElement>) {
        try {
            const settings = decodePermalink(this.state.options, e.target.value);
            this.setState({ settings })
        } catch (err) {
            // squash the error for now
        }
    }

    updateSource(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        LogicLoader.loadLogicFiles(value).then(({ options }) => {
            this.setState({ source: value, options, settings: defaultSettings(options) });
        });
    }

    render() {
        if (!this.state.ready) {
            return (
                <div>Loading...</div>
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
                            <input id="permalink" className="permalinkInput" placeholder="Permalink" value={encodePermalink(this.state.options, this.state.settings)} onChange={this.permalinkChanged} />
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
                                    checked={this.state.settings['shopsanity']}
                                    onChange={this.changeShopsanity}
                                />
                            </Col>
                            <Col xs={3}>
                                <FormCheck
                                    type="switch"
                                    label="Rupeesanity"
                                    id="rupeesanity"
                                    checked={this.state.settings['rupeesanity']}
                                    onChange={this.changeRupeesanity}
                                />
                            </Col>
                            <Col xs={3}>
                                <FormCheck
                                    type="switch"
                                    label="Tadtonesanity"
                                    id="tadtonesanity"
                                    checked={this.state.settings['tadtonesanity']}
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
                                                value={this.state.settings['randomize-entrances']}
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
                                                value={this.state.settings['starting-sword']}
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
                                                value={this.state.settings['starting-tablet-count']}
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
                                                value={this.state.settings['open-thunderhead']}
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
                                                value={this.state.settings['open-lmf']}
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
                                    checked={this.state.settings['upgraded-skyward-strike']}
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
                                    checked={this.state.settings['empty-unrequired-dungeons']}
                                    onChange={this.changeRaceMode}
                                />
                            </Col>
                            <Col>
                                <FormCheck
                                    type="switch"
                                    label="Triforce Required"
                                    id="triforceRequired"
                                    checked={this.state.settings['triforce-required']}
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
                                                value={this.state.settings['triforce-shuffle']}
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
                            <Link to={{ pathname: '/tracker', search: `?options=${encodeURIComponent(encodePermalink(this.state.options, this.state.settings))}&source=${this.state.source}` }}>
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

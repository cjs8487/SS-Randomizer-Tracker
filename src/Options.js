/* eslint-disable jsx-a11y/control-has-associated-label */
import _ from 'lodash';
import {
    Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, /* FormSelect, */Row,
} from 'react-bootstrap';
import React from 'react';
import './options.css';
import { Link } from 'react-router-dom';
import Settings from './permalink/Settings';
import Acknowledgement from './Acknowledgment';

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: new Settings(),
            ready: false,
            source: 'main',
        };
        // these regions are irrelevant now with the removal of banned types, will keep in until full new logic unfreeze
        this.regions = [
            {
                display: 'Skyloft',
                internal: 'skyloft',
            },
            {
                display: 'The Sky',
                internal: 'sky',
            },
            {
                display: 'Thunderhead',
                internal: 'thunderhead',
            },
            {
                display: 'Faron',
                internal: 'faron',
            },
            {
                display: 'Eldin',
                internal: 'eldin',
            },
            {
                display: 'Lanayru',
                internal: 'lanayru',
            },
        ];
        _.forEach(this.regions, (region) => {
            this[_.camelCase(`changeRegion${region.internal}`)] = this.changeBannedLocation.bind(this, region.internal);
        });
        this.types = [
            {
                display: 'Dungeons',
                internal: 'dungeon',
            },
            {
                display: 'Mini Dungeons',
                internal: 'mini dungeon',
            },
            {
                display: 'Free Gifts',
                internal: 'free gift',
            },
            {
                display: 'Freestanding Items',
                internal: 'freestanding',
            },
            {
                display: 'Miscellaneous',
                internal: 'miscellaneous',
            },
            {
                display: 'Silent Realms',
                internal: 'silent realm',
            },
            {
                display: 'Digging Spots',
                internal: 'digging',
            },
            {
                display: 'Bombable Walls',
                internal: 'bombable',
            },
            {
                display: 'Combat Rewards',
                internal: 'combat',
            },
            {
                display: 'Songs',
                internal: 'song',
            },
            {
                display: 'Spiral Charge Chests',
                internal: 'spiral charge',
            },
            {
                display: 'Minigames',
                internal: 'minigame',
            },
            {
                display: 'Max Batreaux Reward',
                internal: 'max-batreaux-reward',
                choice: true,
                choices: [
                    0,
                    5,
                    10,
                    30,
                    40,
                    50,
                    70,
                    80,
                ],
            },
            {
                display: 'Loose Crystals',
                internal: 'crystal',
            },
            {
                display: 'Peatrice',
                internal: 'peatrice',
            },
            {
                display: 'Short Quests',
                internal: 'short',
            },
            {
                display: 'Long Quests',
                internal: 'long',
            },
            {
                display: 'Fetch Quests',
                internal: 'fetch',
            },
            {
                display: 'Crystal Quests',
                internal: 'crystal quest',
            },
            {
                display: 'Scrapper Quest',
                internal: 'scrapper',
            },
            {
                display: 'Shop Mode',
                internal: 'shop-mode',
            },
            {
                display: 'Beedle\'s Shop Ship',
                internal: 'beedle',
            },
            {
                display: 'Cheap Purchases',
                internal: 'cheap',
            },
            {
                display: 'Medium Cost Purchases',
                internal: 'medium',
            },
            {
                display: 'Expensive Purchases',
                internal: 'expensive',
            },
        ];
        _.forEach(this.types, (type) => {
            this[_.camelCase(`changeType${type.internal}`)] = this.changeBannedLocation.bind(this, type.internal);
        });
        this.typesSplitListing = [];
        for (let i = 0; i < this.types.length; i += 5) {
            this.typesSplitListing.push(this.types.slice(i, i + 5));
        }
        this.cubeOptions = [
            {
                display: 'Faron Woods',
                internal: 'faron goddess',
            },
            {
                display: 'Eldin Volcano',
                internal: 'eldin goddess',
            },
            {
                display: 'Lanayru Desert',
                internal: 'lanayru goddess',
            },
            {
                display: 'Lake Floria',
                internal: 'floria goddess',
            },
            {
                display: 'Volcano Summit',
                internal: 'summit goddess',
            },
            {
                display: 'Lanayru Sand Sea',
                internal: 'sand sea goddess',
            },
        ];
        _.forEach(this.cubeOptions, (cube) => {
            this[_.camelCase(`changeCube${cube.internal}`)] = this.changeBannedLocation.bind(this, cube.internal);
        });
        this.cubesSplitListing = [];
        for (let i = 0; i < this.cubeOptions.length; i += 3) {
            this.cubesSplitListing.push(this.cubeOptions.slice(i, i + 3));
        }
        this.changeBinaryOption = this.changeBinaryOption.bind(this);
        this.changeStartingTablets = this.changeStartingTablets.bind(this);
        this.changeEntranceRando = this.changeEntranceRando.bind(this);
        this.changeShopsanity = this.changeBinaryOption.bind(this, 'Shopsanity');
        this.changeTadtonesanity = this.changeBinaryOption.bind(this, 'Tadtonesanity');
        this.changeRupeesanity = this.changeBinaryOption.bind(this, 'Rupeesanity');
        this.changeGoddess = this.changeBannedLocation.bind(this, 'goddess');
        this.changeStartingSword = this.changeStartingSword.bind(this);
        this.changeRaceMode = this.changeBinaryOption.bind(this, 'Empty Unrequired Dungeons');
        this.changeThunderhead = this.changeThunderhead.bind(this);
        this.changeLMF = this.changeLMF.bind(this);
        this.changeTriforceRequired = this.changeBinaryOption.bind(this, 'Triforce Required');
        this.changeTriforceShuffle = this.changeTriforceShuffle.bind(this);
        this.changeSkywardStrike = this.changeBinaryOption.bind(this, 'Upgraded Skyward Strike');
        this.changeStartPouch = this.changeBinaryOption.bind(this, 'Start with Adventure Pouch');
        this.permalinkChanged = this.permalinkChanged.bind(this);
        this.updateSource = this.updateSource.bind(this);

        this.state.settings.init(this.state.source).then(() => {
            this.state.settings.loadDefaults();
            this.setState({ ready: true });
        });
    }

    changeBinaryOption(option) {
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

    changeBannedLocation(location) {
        // this.setState((prevState) => {
        //     const newOptions = prevState.options;
        //     if (newOptions.bannedLocations.includes(location)) {
        //         newOptions.bannedLocations.splice(newOptions.bannedLocations.indexOf(location), 1);
        //     } else {
        //         newOptions.bannedLocations.push(location);
        //     }
        //     return { options: newOptions };
        // });
        this.state.settings.toggleBannedType(location);
        this.forceUpdate();
    }

    changeStartingTablets(e) {
        const { value } = e.target;
        this.state.settings.setOption('Starting Tablet Count', value);
        this.forceUpdate();
    }

    changeEntranceRando(e) {
        const { value } = e.target;
        this.state.settings.setOption('Randomize Entrances', value);
        this.forceUpdate();
    }

    changeThunderhead(e) {
        const { value } = e.target;
        this.state.settings.setOption('Open Thunderhead', value);
        this.forceUpdate();
    }

    changeLMF(e) {
        const { value } = e.target;
        this.state.settings.setOption('Open Lanayru Mining Facility', value);
        this.forceUpdate();
    }

    changeTriforceShuffle(e) {
        const { value } = e.target;
        this.state.settings.setOption('Triforce Shuffle', value);
        this.forceUpdate();
    }

    changeStartingSword(e) {
        const { value } = e.target;
        this.state.settings.setOption('Starting Sword', value);
        this.forceUpdate();
    }

    permalinkChanged(e) {
        try {
            this.state.settings.updateFromPermalink(e.target.value);
        } catch (err) {
            // squash the error for now
        }
        this.forceUpdate();
    }

    async updateSource(e) {
        const { value } = e.target;
        this.setState({ source: value });
        await this.state.settings.init(value);
        this.state.settings.loadDefaults();
        this.forceUpdate();
    }

    render() {
        if (!this.state.ready) {
            return (
                <div />
            );
        }
        const style = {
            border: 'ridge',
            borderWidth: 'thick',
            paddingLeft: '1%',
            paddingBottom: '1%',
            background: 'rgba(40, 40, 20, 0.1)',
            textAlign: 'left',
        };
        const legendStyle = {
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
                                        custom
                                    >
                                        <option>v2.0.1</option>
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
                                    checked={this.state.settings.getOption('Rupeesanity')}
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
                                                custom
                                            >
                                                <option>None</option>
                                                <option>Required Dungeons Separately</option>
                                                <option>All Dungeons</option>
                                                <option>All Dungeons + Sky Keep</option>
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
                                                custom
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
                                                custom
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
                                                custom
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
                                                custom
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
                                                custom
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

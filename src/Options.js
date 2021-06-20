import _ from 'lodash';
import {
    Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, /* FormSelect, */Row,
} from 'react-bootstrap';
import React from 'react';
import './options.css';
import { Link } from 'react-router-dom';
import Settings from './permalink/Settings';

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: new Settings(),
            ready: false,
        };
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
                display: 'Batreaux',
                internal: 'batreaux',
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
                choice: true,
                choices: [
                    'Vanilla',
                    'Always Junk',
                    'Randomized',
                ],
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
                display: 'Sand Sea',
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
        this.changeShopMode = this.changeShopMode.bind(this);
        this.changeGoddess = this.changeBannedLocation.bind(this, 'goddess');
        this.changeSwordless = this.changeBinaryOption.bind(this, 'swordless');
        this.changeRaceMode = this.changeBinaryOption.bind(this, 'Empty Unrequired Dungeons');
        this.changeClosedThunderhead = this.changeBinaryOption.bind(this, 'Closed Thunderhead');
        this.changeSkipSkykeep = this.changeBinaryOption.bind(this, 'skipSkykeep');
        this.changeHeroMode = this.changeBinaryOption.bind(this, 'Hero Mode');
        this.changeStartPouch = this.changeBinaryOption.bind(this, 'Start with Adventure Pouch');
        this.permalinkChanged = this.permalinkChanged.bind(this);

        this.state.settings.init().then(() => {
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

    changeShopMode(e) {
        const { value } = e.target;
        this.setState((prevState) => {
            if (prevState.options['shop-mode'] === 'Randomized' || value === 'Randomized') {
                // if mode was previously randomized, or shops will now be randomized, toggle the ban on shops
                this.changeBannedLocation('cheap');
                this.changeBannedLocation('medium');
                this.changeBannedLocation('expensive');
            }
        });
        this.state.settings.setOption('Shop Mode', value);
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
            <Form style={
                {
                    width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '2%',
                }
            }
            >
                <div className="permalinkContainer">
                    <label htmlFor="permalink" className="permalinkLabel">
                        Permalink:
                        <input id="permalink" className="permalinkInput" placeholder="Permalink" value={this.state.settings.generatePermalink()} onChange={this.permalinkChanged} />
                    </label>
                </div>
                <FormGroup as="fieldset" style={style}>
                    <legend style={legendStyle}>Regions</legend>
                    <Row>
                        {
                            this.regions.map((region) => (
                                <Col key={region.internal}>
                                    <FormCheck
                                        type="switch"
                                        label={region.display}
                                        id={region.internal}
                                        checked={!this.state.settings.getOption('Banned Types').includes(region.internal)}
                                        onChange={this[_.camelCase(`changeRegion${region.internal}`)]}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </FormGroup>
                <FormGroup as="fieldset" style={style}>
                    <legend style={legendStyle}>Progress Item Locations</legend>
                    {
                        this.typesSplitListing.map((typeList/* , index */) => (
                            <Row key={`optionListRow-${typeList[0].internal}`}>
                                {
                                    typeList.map((type) => {
                                        if (type.choice) {
                                            return (
                                                <Col key={type.internal}>
                                                    <FormLabel>{type.display}</FormLabel>
                                                    <FormControl as="select" onChange={this.changeShopMode}>
                                                        {
                                                            _.map(type.choices, (choice) => (
                                                                <option>{choice}</option>
                                                            ))
                                                        }
                                                    </FormControl>
                                                </Col>
                                            );
                                        }
                                        return (
                                            <Col key={type.internal}>
                                                <FormCheck
                                                    type="switch"
                                                    label={type.display}
                                                    id={type.internal}
                                                    checked={!this.state.settings.getOption('Banned Types').includes(type.internal)}
                                                    onChange={this[_.camelCase(`changeType${type.internal}`)]}
                                                    disabled={type.internal === 'crystal'}
                                                />
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        ))
                    }
                </FormGroup>
                <FormGroup as="fieldset" style={style}>
                    <legend style={legendStyle}>Goddess Cubes</legend>
                    <Row>
                        <Col>
                            <FormCheck
                                type="switch"
                                label="Enabled"
                                id="goodess"
                                checked={!this.state.settings.getOption('Banned Types').includes('goddess')}
                                onChange={this.changeGoddess}
                            />
                        </Col>
                    </Row>
                    {
                        this.cubesSplitListing.map((optionList) => (
                            <Row key={`cubeListRow-${optionList[0].internal}`}>
                                {
                                    optionList.map((option) => (
                                        <Col key={option.internal}>
                                            <FormCheck
                                                type="switch"
                                                label={option.display}
                                                id={option.internal}
                                                checked={!this.state.settings.getOption('Banned Types').includes(option.internal)}
                                                onChange={this[_.camelCase(`changeCube${option.internal}`)]}
                                                disabled={this.state.settings.getOption('Banned Types').includes('goddess')}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        ))
                    }
                </FormGroup>
                <FormGroup as="fieldset" style={style}>
                    <legend style={legendStyle}>Additional Randomization</legend>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Row>
                                    <Col xs={5}>
                                        <FormLabel htmlFor="entranceRandoOptions">Randomize Entrances</FormLabel>
                                    </Col>
                                    <Col xs={5}>
                                        <FormControl
                                            as="select"
                                            id="entranceRandoOptions"
                                            onChange={this.changeEntranceRando}
                                            value={this.state.settings.getOption('Randomize Entrances')}
                                            custom
                                        >
                                            <option>None</option>
                                            <option>Dungeons</option>
                                            <option>Dungeons + Sky Keep</option>
                                        </FormControl>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormCheck
                                type="switch"
                                label="Swordless"
                                id="swordless"
                                checked={this.state.settings.getOption('Swordless')}
                                onChange={this.changeSwordless}
                            />
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Row>
                                    <Col xs={4}>
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
                            <FormCheck
                                type="switch"
                                label="Race Mode"
                                id="racemode"
                                checked={this.state.settings.getOption('Empty Unrequired Dungeons')}
                                onChange={this.changeRaceMode}
                            />
                        </Col>
                        <Col>
                            <FormCheck
                                type="switch"
                                label="Closed Thunderhead"
                                id="oth"
                                checked={this.state.settings.getOption('Closed Thunderhead')}
                                onChange={this.changeClosedThunderhead}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormCheck
                                type="switch"
                                label="Skip Sky Keep"
                                id="skipSkykeep"
                                checked={this.state.settings.getOption('Skip Skykeep')}
                                onChange={this.changeSkipSkykeep}
                            />
                        </Col>
                        <Col>
                            <FormCheck
                                type="switch"
                                label="Hero Mode"
                                id="hero-mode"
                                checked={this.state.settings.getOption('Hero Mode')}
                                onChange={this.changeHeroMode}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormCheck
                                type="switch"
                                label="Start with Adventure Pouch"
                                id="startPouch"
                                checked={this.state.settings.getOption('Start with Adventure Pouch')}
                                onChange={this.changeStartPouch}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <Link to={{ pathname: '/tracker', search: `?options=${this.state.settings.generatePermalink()}` }}>
                    <Button variant="primary">
                        Launch New Tracker
                    </Button>
                </Link>

            </Form>
        );
    }
}

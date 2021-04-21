import _ from 'lodash';
import React from 'react';
// import { Container, Table } from 'react-bootstrap';
import StreamerViewItem from './StreamerViewItem';
import CounterItem from './CounterItem';
import TabletGroup from './TabletGroup';
import HarpGroup from './HarpGroup';
import noSailcloth from '../assets/main quest/No_Sailcloth.png';
import sailcloth from '../assets/main quest/Sailcloth.png';
import noBeetle from '../assets/streamerview/items/Beetle_Silhouette.png';
import beetle from '../assets/streamerview/items/Beetle_Icon.png';
import hookBeetle from '../assets/streamerview/items/Hook_Beetle_Icon.png';
import slingshot from '../assets/streamerview/items/Slingshot_Icon.png';
import noSlingshot from '../assets/streamerview/items/Slingshot_Silhouette.png';
import noBombs from '../assets/streamerview/items/Bomb_Silhouette.png';
import bombs from '../assets/streamerview/items/Bomb_Icon.png';
import noBugNet from '../assets/streamerview/items/Bugnet_Silhouette.png';
import bugNet from '../assets/streamerview/items/Bugnet_Icon.png';
import noBow from '../assets/streamerview/items/Bow_Silhouette.png';
import bow from '../assets/streamerview/items/Bow_Icon.png';
import noClawshots from '../assets/streamerview/items/Clawshots_Silhouette.png';
import clawshots from '../assets/streamerview/items/Clawshots_Icon.png';
import noWhip from '../assets/streamerview/items/Whip_Silhouette.png';
import whip from '../assets/streamerview/items/Whip_Icon.png';
import noGustBellows from '../assets/streamerview/items/Gust_Bellows_Silhouette.png';
import gustBellows from '../assets/streamerview/items/Gust_Bellows_Icon.png';
import noCBeetle from '../assets/streamerview/sidequests/no_cbeetle.png';
import cBeetle from '../assets/streamerview/sidequests/cbeetle.png';
import noRattle from '../assets/streamerview/sidequests/no_rattle.png';
import rattle from '../assets/streamerview/sidequests/rattle.png';
import noCrystal from '../assets/streamerview/sidequests/no_crystal.png';
import crystal from '../assets/streamerview/sidequests/crystal.png';
import noLetter from '../assets/streamerview/sidequests/no_cawlins_letter.png';
import letter from '../assets/streamerview/sidequests/cawlins_letter.png';
import noHarp from '../assets/main quest/No_Harp.png';
import harp from '../assets/main quest/Goddess_Harp.png';
import noSong from '../assets/songs/No_Song.png';
import ballad from '../assets/songs/Ballad_of_the_Goddess.png';
import courage from '../assets/songs/Farores_Courage.png';
import wisdom from '../assets/songs/Nayrus_Wisdom.png';
import power from '../assets/songs/Dins_Power.png';
import noSoth from '../assets/streamerview/songs/no_soth.png';
import soth from '../assets/streamerview/songs/soth.png';
import noScale from '../assets/streamerview/main quest/No_Scale.png';
import scale from '../assets/streamerview/main quest/Water_Dragon_Scale.png';
import noEarrings from '../assets/streamerview/main quest/No_Earrings.png';
import earrings from '../assets/streamerview/main quest/Fireshield_Earrings.png';
import noMitts from '../assets/streamerview/main quest/No_Mitts.png';
import diggingMitts from '../assets/streamerview/main quest/Digging_Mitts.png';
import mogmaMitts from '../assets/streamerview/main quest/Mogma_Mitts.png';
import noStone from '../assets/streamerview/main quest/No_Stone.png';
import stone from '../assets/streamerview/main quest/Stone_of_Trials.png';
import noAmberTablet from '../assets/streamerview/tablets/No_Amber_Tablet.png';
import noRubyTablet from '../assets/streamerview/tablets/No_Ruby_Tablet.png';
import noEmeraldTablet from '../assets/streamerview/tablets/No_Emerald_Tablet.png';
import emeraldTablet from '../assets/streamerview/tablets/emerald_tablet.png';
import rubyTablet from '../assets/streamerview/tablets/ruby_tablet.png';
import amberTablet from '../assets/streamerview/tablets/amber_tablet.png';
import noSword from '../assets/streamerview/swords/No_Sword.png';
import practiceSword from '../assets/streamerview/swords/Practice Sword.png';
import goddessSword from '../assets/streamerview/swords/Goddess Sword.png';
import longSword from '../assets/streamerview/swords/Goddess Long Sword.png';
import whiteSword from '../assets/streamerview/swords/Goddess White Sword.png';
import masterSword from '../assets/streamerview/swords/Master Sword.png';
import trueMasterSword from '../assets/streamerview/swords/True Master Sword.png';
import noCavesKey from '../assets/dungeons/noSmallKey.png';
import cavesKey from '../assets/dungeons/1_smallKey.png';
import noSeaChart from '../assets/streamerview/no_sea_chart.png';
import seaChart from '../assets/streamerview/sea_chart.png';
import noSpiralCharge from '../assets/no_bird_statuette.png';
import spiralCharge from '../assets/bird_statuette.png';
import noPouch from '../assets/streamerview/items/no_pouch.png';
import pouch from '../assets/streamerview/items/pouch.png';
import noBottle from '../assets/streamerview/items/no_bottle.png';
import bottle from '../assets/streamerview/items/bottle.png';

class StreamerView extends React.Component {
    constructor(props) {
        super(props);
        const channel = new BroadcastChannel('ssrTrackerItems');
        channel.addEventListener('message', (e) => {
            this.setState({ items: JSON.parse(e.data.items) });
        });
        this.state = {
            items: {},
        };
        this.basicItem = this.basicItem.bind(this);
        this.tabletGroup = this.tabletGroup.bind(this);
        this.counterItem = this.counterItem.bind(this);
        this.spacer = this.spacer.bind(this);
        this.harpGroup = this.harpGroup.bind(this);
        this.items = [
            {
                name: 'Progressive Sword',
                images: [
                    noSword,
                    practiceSword,
                    goddessSword,
                    longSword,
                    whiteSword,
                    masterSword,
                    trueMasterSword,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Slingshot',
                images: [
                    noSlingshot,
                    slingshot,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Progressive Beetle',
                images: [
                    noBeetle,
                    beetle,
                    hookBeetle,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Bomb Bag',
                images: [
                    noBombs,
                    bombs,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Gust Bellows',
                images: [
                    noGustBellows,
                    gustBellows,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Tablets',
                images: {
                    emerald: [
                        noEmeraldTablet,
                        emeraldTablet,
                    ],
                    ruby: [
                        noRubyTablet,
                        rubyTablet,
                    ],
                    amber: [
                        noAmberTablet,
                        amberTablet,
                    ],
                },
                generator: this.tabletGroup,
            },
            {
                name: 'Whip',
                images: [
                    noWhip,
                    whip,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Clawshots',
                images: [
                    noClawshots,
                    clawshots,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Bow',
                images: [
                    noBow,
                    bow,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Bug Net',
                images: [
                    noBugNet,
                    bugNet,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Harp and Songs',
                images: {
                    harp: [
                        noHarp,
                        harp,
                    ],
                    ballad: [
                        noSong,
                        ballad,
                    ],
                    courage: [
                        noSong,
                        courage,
                    ],
                    wisdom: [
                        noSong,
                        wisdom,
                    ],
                    power: [
                        noSong,
                        power,
                    ],
                    soth: [
                        noSoth,
                        soth,
                    ],
                },
                generator: this.harpGroup,
            },
            this.createSpacer(),
            {
                name: 'Sailcloth',
                images: [
                    noSailcloth,
                    sailcloth,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Progressive Mitts',
                images: [
                    noMitts,
                    diggingMitts,
                    mogmaMitts,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Water Scale',
                images: [
                    noScale,
                    scale,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Fireshield Earrings',
                images: [
                    noEarrings,
                    earrings,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Progressive Pouch',
                images: [
                    noPouch,
                    pouch,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Empty Bottle',
                images: [
                    noBottle,
                    bottle,
                ],
                generator: this.counterItem,
            },
            {
                name: 'Cawlins Letter',
                images: [
                    noLetter,
                    letter,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Horned Colossus Beetle',
                images: [
                    noCBeetle,
                    cBeetle,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Baby Rattle',
                images: [
                    noRattle,
                    rattle,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Gratitude Crystal',
                images: [
                    noCrystal,
                    crystal,
                ],
                generator: this.counterItem,
            },
            {
                name: 'Stone of Trials',
                images: [
                    noStone,
                    stone,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Sea Chart',
                images: [
                    noSeaChart,
                    seaChart,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Spiral Charge',
                images: [
                    noSpiralCharge,
                    spiralCharge,
                ],
                generator: this.basicItem,
            },
            // this.createSpacer(),
            // this.createSpacer(),
            {
                name: 'Lanayru Caves Small Key',
                images: [
                    noCavesKey,
                    cavesKey,
                ],
                generator: this.basicItem,
            },
        ];
    }

    basicItem(item) {
        return (
            <td>
                <StreamerViewItem itemName={item.name} images={item.images} items={this.state.items} />
            </td>
        );
    }

    tabletGroup(item) {
        return (
            <td>
                <TabletGroup images={item.images} items={this.state.items} />
            </td>
        );
    }

    counterItem(item) {
        return (
            <td>
                <CounterItem itemName={item.name} images={item.images} items={this.state.items} />
            </td>
        );
    }

    createSpacer() {
        return {
            name: 'Spacer',
            generator: this.spacer,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    spacer() {
        return (
            <div />
        );
    }

    harpGroup(item) {
        return (
            <td colSpan="2">
                <HarpGroup images={item.images} items={this.state.items} />
            </td>
        );
    }

    render() {
        const itemChunks = _.chunk(this.items, 6);
        const itemRows = _.map(itemChunks, (itemRow, index) => (
            <tr key={index}>
                {
                    _.map(itemRow, (item) => (
                        !_.isNil(item) && (
                            item.generator(item)
                        )
                    ))
                }
            </tr>
        ));
        return (
            <table>
                <tbody>
                    {itemRows}
                </tbody>
            </table>
        );
    }
}

export default StreamerView;

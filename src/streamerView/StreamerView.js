import _ from 'lodash';
import React from 'react';
import { Container, Table } from 'react-bootstrap';
import StreamerViewItem from './StreamerViewItem';
import noSailcloth from '../assets/main quest/No_Sailcloth.png';
import sailcloth from '../assets/main quest/Sailcloth.png';
import noBeetle from '../assets/Beetle_Silhouette.png';
import beetle from '../assets/Beetle_Icon.png';
import hookBeetle from '../assets/Hook_Beetle_Icon.png';
import slingshot from '../assets/Slingshot_Icon.png';
import noSlingshot from '../assets/Slingshot_Silhouette.png';
import noBombs from '../assets/Bomb_Silhouette.png';
import bombs from '../assets/Bomb_Icon.png';
import noBugNet from '../assets/Bugnet_Silhouette.png';
import bugNet from '../assets/Bugnet_Icon.png';
import noBow from '../assets/Bow_Silhouette.png';
import bow from '../assets/Bow_Icon.png';
import noClawshots from '../assets/Clawshots_Silhouette.png';
import clawshots from '../assets/Clawshots_Icon.png';
import noWhip from '../assets/Whip_Silhouette.png';
import whip from '../assets/Whip_Icon.png';
import noGustBellows from '../assets/Gust_Bellows_Silhouette.png';
import gustBellows from '../assets/Gust_Bellows_Icon.png';
import noCBeetle from '../assets/sidequests/no_cbeetle.png';
import cBeetle from '../assets/sidequests/cbeetle.png';
import noRattle from '../assets/sidequests/no_rattle.png';
import rattle from '../assets/sidequests/rattle.png';
import noCrystal from '../assets/sidequests/no_crystal.png';
import crystal from '../assets/sidequests/crystal.png';
import noLetter from '../assets/sidequests/no_cawlins_letter.png';
import letter from '../assets/sidequests/cawlins_letter.png';
import noHarp from '../assets/main quest/No_Harp.png';
import harp from '../assets/main quest/Goddess_Harp.png';
import noSong from '../assets/songs/No_Song.png';
import ballad from '../assets/songs/Ballad_of_the_Goddess.png';
import courage from '../assets/songs/Farores_Courage.png';
import wisdom from '../assets/songs/Nayrus_Wisdom.png';
import power from '../assets/songs/Dins_Power.png';
import noSoth from '../assets/songs/No_Soth.png';
import soth1 from '../assets/songs/SOTH1.png';
import soth2 from '../assets/songs/SOTH2.png';
import soth from '../assets/songs/SOTH4.png';
import noScale from '../assets/main quest/No_Scale.png';
import scale from '../assets/main quest/Water_Dragon_Scale.png';
import noEarrings from '../assets/main quest/No_Earrings.png';
import earrings from '../assets/main quest/Fireshield_Earrings.png';
import noMitts from '../assets/main quest/No_Mitts.png';
import diggingMitts from '../assets/main quest/Digging_Mitts.png';
import mogmaMitts from '../assets/main quest/Mogma_Mitts.png';
import noStone from '../assets/main quest/No_Stone.png';
import stone from '../assets/main quest/Stone_of_Trials.png';
import noAmberTablet from '../assets/tablets/No_Amber_Tablet.png';
import noRubyTablet from '../assets/tablets/No_Ruby_Tablet.png';
import noEmeraldTablet from '../assets/tablets/No_Emerald_Tablet.png';
import emeraldTablet from '../assets/tablets/emerald_tablet.png';
import rubyTablet from '../assets/tablets/ruby_tablet.png';
import amberTablet from '../assets/tablets/amber_tablet.png';
import noSword from '../assets/swords/No_Sword.png';
import practiceSword from '../assets/swords/Practice Sword.png';
import goddessSword from '../assets/swords/Goddess Sword.png';
import longSword from '../assets/swords/Goddess Long Sword.png';
import whiteSword from '../assets/swords/Goddess White Sword.png';
import masterSword from '../assets/swords/Master Sword.png';
import trueMasterSword from '../assets/swords/True Master Sword.png';
import noCavesKey from '../assets/dungeons/noSmallKey.png';
import cavesKey from '../assets/dungeons/1_smallKey.png';
import noSeaChart from '../assets/no_sea_chart.png';
import seaChart from '../assets/sea_chart.png';
import noSpiralCharge from '../assets/no_bird_statuette.png';
import spiralCharge from '../assets/bird_statuette.png';
import noPouch from '../assets/no_pouch.png';
import pouch from '../assets/pouch.png';
import noBottle from '../assets/no_bottle.png';
import bottle from '../assets/bottle.png';

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
        this.items = [
            {
                name: 'Sailcloth',
                images: [
                    noSailcloth,
                    sailcloth,
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
                name: 'Bow',
                images: [
                    noBow,
                    bow,
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
                name: 'But Net',
                images: [
                    noBugNet,
                    bugNet,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Sailcloth',
                images: [
                    noWhip,
                    whip,
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
                name: 'Bomb Bag',
                images: [
                    noBombs,
                    bombs,
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
                name: 'Goddess Harp',
                images: [
                    noHarp,
                    harp,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Ballad of the Goddess',
                images: [
                    noSong,
                    ballad,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Farores Courage',
                images: [
                    noSong,
                    courage,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Nayrus Wisdom',
                images: [
                    noSong,
                    wisdom,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Dins Power',
                images: [
                    noSong,
                    power,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Song of the Hero',
                images: [
                    noSoth,
                    soth1,
                    soth2,
                    soth,
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
                generator: this.basicItem,
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
            {
                name: 'Progressive Pouch',
                images: [
                    noPouch,
                    pouch,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Lanayru Caves Small Key',
                images: [
                    noCavesKey,
                    cavesKey,
                ],
                generator: this.basicItem,
            },
            {
                name: 'Sailcloth',
                images: [
                    noBottle,
                    bottle,
                ],
                generator: this.basicItem,
            },
        ];
    }

    basicItem(item) {
        console.log('creating basic item');
        console.log(item);
        console.log(this);
        return (
            <td>
                <StreamerViewItem itemName={item.name} images={item.images} items={this.state.items} onChange={this.handleItemClick} />
            </td>
        );
    }

    // eslint-disable-next-line class-methods-use-this
    tabletGroup() {
        return (
            <div />
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
            <Container fluid>
                <Table>
                    <tbody>
                        {itemRows}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default StreamerView;

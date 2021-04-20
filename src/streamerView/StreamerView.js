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
        this.items = [
            'Sailcloth',
            'Slingshot',
            'Bow',
            'Progressive Beetle',
            'Bug Net',
            'Whip',
            'Gust Bellows',
            'Bomb Bag',
            'Clawshots',
            'Goddess Harp',
            'Ballad of the Goddess',
            'Farores Courage',
            'Nayrus Wisdom',
            'Dins Power',
            'Song of the Hero',
            'Progressive Mitts',
            'Water Scale',
            'Fireshield Earrings',
            'Cawlins Letter',
            'Horned Colossus Beetle',
            'Baby Rattle',
            'Gratitude Crystal',
            'Stone of Trials',
            'Emerald Tablet',
            'Ruby Tablet',
            'Amber Tablet',
            'Progressive Sword',
            'Sea Chart',
            'Spiral Charge',
            'Adventure Pouch',
            'Lanayru Caves Small Key',
            'Empty Bottle',
        ];
        this.images = {
            Sailcloth: [
                noSailcloth,
                sailcloth,
            ],
            Slingshot: [
                noSlingshot,
                slingshot,
            ],
            Bow: [
                noBow,
                bow,
            ],
            'Progressive Beetle': [
                noBeetle,
                beetle,
                hookBeetle,
            ],
            'Bug Net': [
                noBugNet,
                bugNet],
            Whip: [
                noWhip,
                whip,
            ],
            'Gust Bellows': [
                noGustBellows,
                gustBellows,
            ],
            'Bomb Bag': [
                noBombs,
                bombs,
            ],
            Clawshots: [
                noClawshots,
                clawshots,
            ],
            'Goddess Harp': [
                noHarp,
                harp,
            ],
            'Ballad of the Goddess': [
                noSong,
                ballad,
            ],
            'Farores Courage': [
                noSong,
                courage,
            ],
            'Nayrus Wisdom': [
                noSong,
                wisdom,
            ],
            'Dins Power': [
                noSong,
                power,
            ],
            'Song of the Hero': [
                noSoth,
                soth1,
                soth2,
                soth,
            ],
            'Progressive Mitts': [
                noMitts,
                diggingMitts,
                mogmaMitts,
            ],
            'Water Scale': [
                noScale,
                scale,
            ],
            'Fireshield Earrings': [
                noEarrings,
                earrings,
            ],
            'Cawlins Letter': [
                noLetter,
                letter,
            ],
            'Horned Colossus Beetle': [
                noCBeetle,
                cBeetle,
            ],
            'Baby Rattle': [
                noRattle,
                rattle,
            ],
            'Gratitude Crystal': [
                noCrystal,
                crystal,
            ],
            'Stone of Trials': [
                noStone,
                stone,
            ],
            'Emerald Tablet': [
                noEmeraldTablet,
                emeraldTablet,
            ],
            'Ruby Tablet': [
                noRubyTablet,
                rubyTablet,
            ],
            'Amber Tablet': [
                noAmberTablet,
                amberTablet,
            ],
            'Progressive Sword': [
                noSword,
                practiceSword,
                goddessSword,
                longSword,
                whiteSword,
                masterSword,
                trueMasterSword,
            ],
            'Sea Chart': [
                noSeaChart,
                seaChart,
            ],
            'Spiral Charge': [
                noSpiralCharge,
                spiralCharge,
            ],
            'Adventure Pouch': [
                noPouch,
                pouch,
            ],
            'Lanayru Caves Small Key': [
                noCavesKey,
                cavesKey,
            ],
            'Empty Bottle': [
                noBottle,
                bottle,
            ],
        };
    }

    handleItemClick() {
        this.forceUpdate();
    }

    render() {
        const itemChunks = _.chunk(this.items, 6);
        const itemRows = _.map(itemChunks, (itemRow, index) => (
            <tr key={index}>
                {
                    _.map(itemRow, (item) => (
                        !_.isNil(item) && (
                            <td>
                                <StreamerViewItem itemName={item} images={_.get(this.images, item)} items={this.state.items} onChange={this.handleItemClick} />
                            </td>
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

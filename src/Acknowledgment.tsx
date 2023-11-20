import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contributor from './additionalComponents/Contributor';
import ImageLink from './additionalComponents/ImageLink';
import contributors from './data/contributors.json';

export default function Acknowledgement() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Row>
                <Col>
                    Tracker by
                </Col>
            </Row>
            {
                _.map(contributors.creators, (creator) => (
                    <Contributor name={creator.name} links={creator.links} />
                ))
            }
            <Row />
            <Row style={{ paddingTop: '1%' }}>
                <Col>
                    Additional contributions by
                </Col>
            </Row>
            {
                _.map(contributors.contributors, (contributor) => (
                    <Contributor name={contributor.name} links={contributor.links} />
                ))
            }
            <br />
            <Row>
                <Col>
                    <span style={{ padding: '1%' }}>
                        <a href="https://github.com/cjs8487/SS-Randomizer-Tracker">
                            View the Source Code
                            <i style={{ paddingLeft: '0.3%' }} className="fab fa-github" />
                        </a>
                    </span>
                    <span>
                        <ImageLink href="https://discord.gg/evpNKkaaw6" src="https://discordapp.com/api/guilds/767090759773323264/embed.png?style=shield" alt="Discord Embed" />
                    </span>
                </Col>
            </Row>
            <Row style={{ padding: '1.5%' }}>
                <Col>
                    <Link to="/acknowledgement">Full Acknowledgement</Link>
                </Col>
            </Row>
        </div>
    );
}

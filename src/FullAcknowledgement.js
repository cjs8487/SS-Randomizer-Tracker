import React from 'react';
import _ from 'lodash';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contributor from './additionalComponents/Contributor';
import ImageLink from './additionalComponents/ImageLink';
import contributors from './data/contributors.json';

class FullAcknowledgement extends React.Component {
    render() {
        return (
            <Container style={{ textAlign: 'center' }}>
                <Row>
                    <Col>
                        <Link to="/">Return to Tracker</Link>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ fontWeight: 'bold' }}>
                        Lead Developer
                    </Col>
                </Row>
                {
                    _.map(contributors.creators, (creator) => (
                        <Contributor name={creator.name} links={creator.links} />
                    ))
                }
                <Row />
                <Row style={{ paddingTop: '1%' }}>
                    <Col style={{ fontWeight: 'bold' }}>
                        Contributors
                    </Col>
                </Row>
                <Row>
                    {
                        _.map(contributors.contributors, (contributor) => (
                            <Col>
                                <Row>
                                    <Col>
                                        <Contributor name={contributor.name} links={contributor.links} />
                                    </Col>
                                </Row>
                                {
                                    _.map(contributor.attributions, (attribution) => (
                                        <Row>
                                            <Col>
                                                {attribution}
                                            </Col>
                                        </Row>
                                    ))
                                }
                            </Col>
                        ))
                    }
                </Row>
                <Row style={{ padding: '1%' }}>
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
            </Container>
        );
    }
}

export default FullAcknowledgement;

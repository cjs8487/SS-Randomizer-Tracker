import React from 'react';
import _ from 'lodash';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contributor from './additionalComponents/Contributor';
import ImageLink from './additionalComponents/ImageLink';
import contributors from './data/contributors.json';
import './FullAcknowledgement.css';

class FullAcknowledgement extends React.Component {
    // eslint-disable-next-line class-methods-use-this
    makeContributorTable(contributorsList) {
        return _.map(contributorsList, (contributor) => (
            <Col key={contributor.name}>
                <Row>
                    <Col>
                        <Contributor name={contributor.name} links={contributor.links} />
                    </Col>
                </Row>
                {
                    _.map(contributor.attributions, (attribution) => (
                        <Row key={attribution}>
                            <Col>
                                {attribution}
                            </Col>
                        </Row>
                    ))
                }
            </Col>
        ));
    }

    render() {
        return (
            <Container className="ack-container">
                <Row>
                    <Col>
                        <Link to="/">Return to Tracker</Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="ack-group-header">
                        Lead Developer
                    </Col>
                </Row>
                {
                    _.map(contributors.creators, (creator) => (
                        <Contributor key={creator.name} name={creator.name} links={creator.links} />
                    ))
                }
                <Row />
                <Row>
                    <Col className="ack-group-header">
                        Contributors
                    </Col>
                </Row>
                <Row>
                    { this.makeContributorTable(contributors.contributors) }
                </Row>
                <Row>
                    <Col className="ack-group-header">
                        Additional Shoutouts
                    </Col>
                </Row>
                <Row>
                    { this.makeContributorTable(contributors.additionalShoutouts) }
                </Row>
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
            </Container>
        );
    }
}

export default FullAcknowledgement;

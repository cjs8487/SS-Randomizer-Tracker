import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useContextMenu } from 'react-contexify';
import { Col, Row } from 'react-bootstrap';

import AreaCounters from './AreaCounters';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

import sotsImage from '../assets/hints/sots.png';
import barrenImage from '../assets/hints/barren.png';

import g1 from '../assets/hints/g1.png';
import scaldera from '../assets/hints/scaldera.png';
import moldarach from '../assets/hints/moldarach.png';
import koloktos from '../assets/hints/koloktos.png';
import tentalus from '../assets/hints/tentalus.png';
import g2 from '../assets/hints/g2.png';

import 'react-contexify/dist/ReactContexify.css';

const pathImages = [
    g1,
    scaldera,
    moldarach,
    koloktos,
    tentalus,
    g2,
];

function LocationGroupHeader(props) {
    const [sots, setSots] = useState(false);
    const [barren, setBarren] = useState(false);
    const [inEffect, setInEffect] = useState(false);
    const [pathIndex, setPath] = useState(6);

    const { show } = useContextMenu({
        id: 'group-context',
    });

    const displayMenu = useCallback((e) => {
        show(e, { props: { setSots, setBarren, setPath } });
    });

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setSots(false);
            setInEffect(true);
        }
    }, [pathIndex]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setPath(6);
            setInEffect(true);
        }
    }, [sots]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setSots(false);
            setPath(6);
            setInEffect(true);
        }
    }, [barren]);

    let image;
    if (pathIndex < 6) {
        image = <img src={pathImages[pathIndex]} alt="path" />;
    } else if (sots) {
        image = <img src={sotsImage} alt="sots" />;
    } else if (barren) {
        image = <img src={barrenImage} alt="barren" />;
    }

    return (
        <Row
            className="group-container"
            onClick={props.onClick}
            onKeyDown={props.onClick}
            role="button"
            tabIndex="0"
            onContextMenu={displayMenu}
        >
            <Col sm={7}>
                <h3 style={{ cursor: 'pointer', color: props.colorScheme.text }}>
                    {props.title}
                </h3>
            </Col>
            <Col sm={2} style={{ color: props.colorScheme.text }}>
                <span>{image}</span>
            </Col>
            <Col sm={1}>
                <h3>
                    <AreaCounters
                        totalChecksLeftInArea={props.logic.getTotalCountForArea(props.title)}
                        totalChecksAccessible={props.logic.getInLogicCountForArea(props.title)}
                        colorScheme={props.colorScheme}
                    />
                </h3>
            </Col>
        </Row>
    );
}

LocationGroupHeader.propTypes = {
    logic: PropTypes.instanceOf(Logic).isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default LocationGroupHeader;

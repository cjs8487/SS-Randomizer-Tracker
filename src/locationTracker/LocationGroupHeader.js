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

const pathImages = {
    'Ghirahim 1': g1,
    'Scaldera': scaldera,
    'Moldarach': moldarach,
    'Koloktos': koloktos,
    'Tentalus': tentalus,
    'Ghirahim 2': g2,
};

function LocationGroupHeader(props) {
    const setHint = (value) => {
        props.onHintClick(props.title, value);
    };

    const setAllLocationsChecked = (value) => {
        props.onCheckAll(props.title, value);
    };

    const { show } = useContextMenu({
        id: 'group-context',
    });

    const displayMenu = useCallback((e) => {
        show({ event: e, props: { setAllLocationsChecked, setHint } });
    });

    let hint = '';
    if (props.logic.regionHints !== undefined) {
        hint = props.logic.regionHints[props.title];
    };

    let image;
    if (hint.includes('Path')) {
        image = <img src={pathImages[hint.slice(8)]} alt={hint} />;
    } else if (hint === 'Spirit of the Sword') {
        image = <img src={sotsImage} alt={hint} />;
    } else if (hint === 'Barren') {
        image = <img src={barrenImage} alt={hint} />;
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
    onHintClick: PropTypes.func.isRequired,
    onCheckAll: PropTypes.func.isRequired,
};

export default LocationGroupHeader;

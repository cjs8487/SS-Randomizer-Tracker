import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useContextMenu } from 'react-contexify';
import { Col, Row } from 'react-bootstrap';

import AreaCounters from './AreaCounters';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';

import 'react-contexify/dist/ReactContexify.css';

function LocationGroupHeader(props) {
    const [sots, setSots] = useState(false);
    const [barren, setBarren] = useState(false);
    const [inEffect, setInEffect] = useState(false);

    const { show } = useContextMenu({
        id: 'group-context',
    });

    const displayMenu = useCallback((e) => {
        show(e, { props: { setSots, setBarren } });
    });

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setInEffect(true);
        }
    }, [sots]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setSots(false);
            setInEffect(true);
        }
    }, [barren]);

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
                {sots && (<p>sots</p>)}
                {barren && (<p>barren</p>)}
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

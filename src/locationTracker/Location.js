import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { useContextMenu } from 'react-contexify';
import { Row, Col } from 'react-bootstrap';

import RequirementsTooltip from './RequirementsTooltip';
import images from '../itemTracker/Images';
import './Location.css';
import ColorScheme from '../customization/ColorScheme';
import ItemLocation from '../logic/ItemLocation';
import KeyDownWrapper from '../KeyDownWrapper';

import 'react-contexify/dist/ReactContexify.css';

function Location(props) {
    const [item, setItem] = useState('');

    function onClick(e) {
        if (!e.target.id) {
            return;
        }
        if (props.hasGroup) {
            props.handler(props.group, props.location);
        } else {
            props.handler(props.location);
        }
    }

    const style = {
        textDecoration: props.location.checked ? 'line-through' : 'none',
        cursor: 'pointer',
        color: props.colorScheme[props.location.logicalState],
        paddingLeft: 6,
        paddingRight: 0,
    };

    const { show } = useContextMenu({
        id: 'location-context',
    });

    const displayMenu = useCallback((e) => {
        show(e, { props: { handler: props.handler, group: props.group, location: props.location, setItem } });
    });

    return (
        <div className="location-container" onClick={onClick} onKeyDown={KeyDownWrapper.onSpaceKey(onClick)} role="button" tabIndex="0" onContextMenu={displayMenu}>
            <Row noGutters>
                <Col
                    style={style}
                    data-tip={props.location.needs}
                    data-for={props.location.name}
                    id={props.location.name}
                >
                    {props.location.name}
                </Col>
                {
                    item !== '' && (
                        <Col sm={2} style={{ padding: 0 }}>
                            <img src={images[item][images[item].length - 1]} height={30} alt={item} />
                        </Col>
                    )
                }
            </Row>
            <ReactTooltip id={props.location.name}>
                <RequirementsTooltip requirements={props.location.needs} meetsRequirement={props.meetsRequirement} />
            </ReactTooltip>
        </div>

    );
}

Location.propTypes = {
    checked: PropTypes.bool.isRequired,
    group: PropTypes.string,
    handler: PropTypes.func.isRequired,
    location: PropTypes.shape(PropTypes.instanceOf(ItemLocation)).isRequired,
    meetsRequirement: PropTypes.bool.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    hasGroup: PropTypes.bool,
};
Location.defaultProps = {
    group: '',
    hasGroup: true,
};

export default Location;

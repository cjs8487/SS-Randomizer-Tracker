import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Menu, Item, Separator, useContextMenu } from 'react-contexify';
import RequirementsTooltip from './RequirementsTooltip';
import './Location.css';
import ColorScheme from '../customization/ColorScheme';
import ItemLocation from '../logic/ItemLocation';
import KeyDownWrapper from '../KeyDownWrapper';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'menu-id';

function Location(props) {
    function onClick() {
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
    };

    const { show } = useContextMenu({
        id: MENU_ID,
        props: [],
    });

    const handleCheckClick = useCallback(() => {
        console.log('check clicked');
    });

    const handleUncheckClick = useCallback(() => {
        console.log('uncheck clicked');
    });

    const handleSetItemClick = useCallback(() => {
        console.log('set item clicked');
    });

    const handleClearItemClick = useCallback(() => {
        console.log('clear item clicked');
    });

    function displayMenu(e) {
        // put whatever custom logic you need
        // you can even decide to not display the Menu
        show(e);
    }

    return (
        <div className="location-container" onClick={onClick} onKeyDown={KeyDownWrapper.onSpaceKey(onClick)} role="button" tabIndex="0">
            <p
                style={style}
                data-tip={props.location.needs}
                data-for={props.location.name}
            >
                {props.location.name}
            </p>
            <ReactTooltip id={props.location.name}>
                <RequirementsTooltip requirements={props.location.needs} meetsRequirement={props.meetsRequirement} />
            </ReactTooltip>
            <Menu id={MENU_ID}>
                <Item onClick={handleCheckClick}>Check</Item>
                <Item onClick={handleUncheckClick}>Uncheck</Item>
                <Separator />
                <Item onClick={handleSetItemClick}>Set Item</Item>
                <Item onClick={handleClearItemClick}>Clear Item</Item>
            </Menu>
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

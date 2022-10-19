import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Contributor extends React.Component {
    render() {
        return (
            <span style={{ padding: '1%' }}>
                <span style={{ fontWeight: '500' }}>{this.props.name}</span>
                {
                    _.map(this.props.links, (link, type) => (
                        <a href={link} aria-label={type} key={link} style={{ padding: '0.25%' }}><i className={`fab fa-${type}`} /></a>
                    ))
                }
            </span>
        );
    }
}

Contributor.propTypes = {
    name: PropTypes.string.isRequired,
    links: PropTypes.shape({
        img: PropTypes.string,
        link: PropTypes.string,
    }).isRequired,
};

export default Contributor;

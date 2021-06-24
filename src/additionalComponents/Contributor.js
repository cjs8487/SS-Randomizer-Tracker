import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Contributor extends React.Component {
    render() {
        return (
            <span>
                {this.props.name}
                {
                    _.map(this.props.links, (link, type) => (
                        <a href={link} aria-label={type}><i className={`fab fa-${type}`} /></a>
                    ))
                }
            </span>
        );
    }
}

Contributor.propTypes = {
    name: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string,
        link: PropTypes.string,
    })).isRequired,
};

export default Contributor;

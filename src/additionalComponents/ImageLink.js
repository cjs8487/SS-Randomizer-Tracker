import React from 'react';
import PropTypes from 'prop-types';

class ImageLink extends React.Component {
    render() {
        return (
            <a href={this.props.href}>
                <img src={this.props.src} alt={this.props.alt} />
            </a>
        );
    }
}

ImageLink.propTypes = {
    href: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageLink;

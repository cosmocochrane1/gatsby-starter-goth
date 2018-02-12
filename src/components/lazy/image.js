import React from 'react';
import PropTypes from 'prop-types';
import Lazy from 'react-lazyload';
import Placeholder from './placeholder';

const LazyImage = ({ src, width, height, alt = '' }) => (
    <Lazy unmountIfInvisible={true} placeholder={<Placeholder height={height} width={width} />}>
        <img src={src} alt={alt} />
    </Lazy>
);

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string
};

export default LazyImage;

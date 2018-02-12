import React from 'react';
import PropTypes from 'prop-types';

const LazyPlaceholder = ({ height, width }) => (
    <div className="snoozin" style={{ paddingBottom: `${Math.round(height / width * 100)}%` }} />
);

LazyPlaceholder.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default LazyPlaceholder;

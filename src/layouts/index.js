import React, { PureComponent } from 'react';
import './css/index.css';

export default ({ children, location }) => {
    return (
        <div className="container">
            {children()}
        </div>
    );
};

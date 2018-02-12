import React, { PureComponent } from 'react';
import Header from '../components/header';
import './css/index.css';

export default ({ children, location }) => {
    return (
        <div className="container">
            <Header />
            {children()}
        </div>
    );
};

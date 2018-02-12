import React from 'react';
import { Provider } from 'react-redux';
import store from './src/shared/store';

exports.wrapRootComponent = ({ Root }) => {
    return () => (
        <Provider store={store}>
            <Root />
        </Provider>
    );
};

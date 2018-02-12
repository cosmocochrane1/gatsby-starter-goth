import React from 'react';
import Vines from './vines';
import Ferns from './ferns';
import css from './intro.module.css';

export default ({ children }) => (
    <div className={css.container}>
        {children}
        <Ferns />
        <Vines />
    </div>
);

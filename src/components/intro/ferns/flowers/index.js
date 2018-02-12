import React from 'react';
import css from './flowers.module.css';

export default () => (
    <div className={css.container}>
        <div className={css.budLeft} />
        <div className={css.budRight} />
        <div className={css.roseLeft} />
        <div className={css.roseRight} />
    </div>
);

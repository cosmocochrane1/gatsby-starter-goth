import React from 'react';
import css from './supertunes.module.css';

export default () => (
    <article className="row middle">
        <div className={css.container}>
            <div className={css.wrapper}>
                <div className={css.dixie} />
                <div className={css.curtains} />
            </div>
            <div className={css.godzilla} />
        </div>
        <div className="col col7 padded">
            <h2 className="big-text strong">Super Tunes TV</h2>
            <p>Turn your speakers up and feel the nostalgia!</p>
        </div>
    </article>
);

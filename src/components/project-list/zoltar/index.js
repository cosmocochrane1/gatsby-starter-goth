import React from 'react';
import css from './zoltar.module.css';

export default () => (
    <article className="row offset-large middle reversed">
        <div className={css.container}>
            <div className={css.wrapper}>
                <div className={css.zoltar} />
                <div className={css.ball} />
                <div className={css.curtains} />
            </div>
            <div className={css.hands} />
        </div>
        <div className="col col6 push1 padded">
            <h2 className="big-text strong">ZOLTAR: The GIF Fortune Teller</h2>
            <p>Hello, dear wanderer. I am Zoltar. The GIF Fortune Teller.</p>
        </div>
    </article>
);

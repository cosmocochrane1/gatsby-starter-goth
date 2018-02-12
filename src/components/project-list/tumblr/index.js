import React from 'react';
import Lazy from 'react-lazyload';
import css from './tumblr.module.css';

export default () => (
    <article className="col col4">
        <div className={css.container}>
            <Lazy height={64} unmountIfInvisible={true}>
                <div className={css.dude} />
            </Lazy>
        </div>
        <a href="#">
            <h2 className="underline">Some things I made while working at Tumblr</h2>
        </a>
    </article>
);

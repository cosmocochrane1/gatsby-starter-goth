import React from 'react';
import Lazy from 'react-lazyload';
import supportsWebP from 'supports-webp';
import Placeholder from '../lazy/placeholder';
import css from './about.module.css';
import photo from '../../shared/images/yearbook.gif';
import photoWebp from '../../shared/images/yearbook.webp';

export default () => (
    <section className="row text-block">
        <div className="col col8 push4">
            <p>
                Jonny McLaughlin is a Director of Engineering at GIPHY, where he focuses on animation and making things
                fun to use. He has worked in the video game industry, advertising industry, and was awarded "Creator of
                the Year" during his time at Tumblr. You can see his work featured on WIRED, TechCrunch, Mashable,
                Engadget, Business Insider, and more.
            </p>
        </div>
    </section>
);

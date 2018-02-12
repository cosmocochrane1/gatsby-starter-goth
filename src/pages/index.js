import React from 'react';
import About from '../components/about';
import ProjectList from '../components/project-list';
import IntroAnimation from '../components/intro';
import css from './landing.module.css';

export default () => (
    <section className={css.container}>
        <div className={css.introWrapper}>
            <IntroAnimation>
                <h1 className={css.title}>
                    Jonny<br /> M<span className="lowercase">c</span>Laughlin
                </h1>
                <h2 className={css.subtitle}>Front-end Developer & Illustrator</h2>
            </IntroAnimation>
        </div>
        <div className={css.projectWrapper}>
            <ProjectList />
        </div>
    </section>
);

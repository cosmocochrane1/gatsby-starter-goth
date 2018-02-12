import React, { PureComponent } from 'react';
import Flowers from './flowers';
import css from './ferns.module.css';

const FERNS = [];

for (let i = 0; i < 12; i++) {
    FERNS.push({
        top: Math.random() * 20,
        isAlt: Math.random() > 0.5
    });
}

const getShift = i => Math.sin(i * Math.PI) * 100;
const getFernClass = (i, total, isAlt) => {
    if (i === 0) {
        return css.fernLeft;
    }
    if (i === total) {
        return css.fernRight;
    }
    return isAlt ? css.fernAlt : css.fern;
};

export default class Ferns extends PureComponent {
    state = {
        fernCount: 0,
        fernWidth: 0
    };
    onResize = this.resize.bind(this);
    componentWillMount() {
        this.resize();
        window && window.addEventListener('resize', this.onResize, false);
    }
    componentWillUnmount() {
        window && window.removeEventListener('resize', this.onResize, false);
    }
    resize() {
        const width = window.innerWidth;
        const fernCount = Math.min(FERNS.length, Math.floor(width / 100));
        this.setState({
            fernWidth: width / (fernCount - 1),
            fernCount
        });
    }
    render() {
        const { fernCount, fernWidth } = this.state;
        const ferns = FERNS.slice(0, fernCount);
        const total = ferns.length - 1;
        return (
            <div>
                <div className={css.top}>
                    {ferns.map(({ top, isAlt }, i) => (
                        <div
                            key={`top-${i}`}
                            className={getFernClass(i, total, isAlt)}
                            style={{ marginTop: top + getShift(i / total), left: fernWidth * i }}
                        />
                    ))}
                </div>
                <div className={css.bottom}>
                    <Flowers />
                    {ferns.map(({ top, isAlt }, i) => (
                        <div
                            key={`bottom-${i}`}
                            className={getFernClass(i, total, isAlt)}
                            style={{ marginTop: top + +getShift(i / total), left: fernWidth * i }}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

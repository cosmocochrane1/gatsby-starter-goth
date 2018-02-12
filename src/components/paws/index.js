import React, { PureComponent, PropTypes } from 'react';
import { some, throttle, isEmpty } from 'lodash';
import css from './paws.module.css';

const CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const MAX_DURATION = 2000;
const TILT_OFFSET = 0.7;
const TAP_THRESHOLD = 1;

export default class extends PureComponent {
    state = {
        boostLeft: false,
        boostRight: false,
        x: 0,
        y: 0,
        rotation: 0,
        isReady: false
    };
    mid = { x: 0, y: 0 };
    startTime = null;
    startPosition = { x: 0, y: 0 };
    hasMoved = false;
    isLandscape = false;

    componentDidMount() {
        if (!CAN_USE_DOM) return;

        this.onResize();
        this.movePaws(this.mid.x, this.mid.y + 1);

        // bound events
        this.mouseMove = throttle(this.onMouseMove, 20).bind(this);
        this.mouseDown = this.onMouseDown.bind(this);
        this.mouseUp = this.onMouseUp.bind(this);
        this.resize = this.onResize.bind(this);

        window.addEventListener('resize', this.resize, false);
        document.addEventListener('mousemove', this.mouseMove, false);
        document.addEventListener('mousedown', this.mouseDown, false);
        document.addEventListener('mouseup', this.mouseUp, false);
        document.addEventListener('touchstart', this.mouseDown, false);
        document.addEventListener('touchmove', this.mouseMove, false);
        document.addEventListener('touchend', this.mouseUp, false);

        this.setState({ isReady: true });
    }
    componentWillUnmount() {
        if (!CAN_USE_DOM) return;

        window.removeEventListener('resize', this.mouseMove, false);
        document.removeEventListener('mousemove', this.mouseMove, false);
        document.removeEventListener('mousedown', this.mouseDown, false);
        document.removeEventListener('mouseup', this.mouseUp, false);
        document.removeEventListener('touchstart', this.mouseDown, false);
        document.removeEventListener('touchmove', this.mouseMove, false);
        document.removeEventListener('touchend', this.mouseUp, false);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            some(
                ['boostLeft', 'boostRight', 'x', 'y', 'rotation', 'isReady'],
                prop => nextState[prop] !== this.state[prop]
            )
        ) {
            return true;
        }
        return false;
    }
    movePaws(left, top) {
        const { x, y } = this.mid;
        const radians = Math.atan2(x - left, y - top);
        const rotation = radians * (180 / -Math.PI) + 180;
        this.hasMoved = true;
        this.setState({ x: left, y: top, rotation });
    }

    onMouseMove(e) {
        const { pageX, pageY, changedTouches } = e;
        const hasTouches = !isEmpty(changedTouches);
        const x = hasTouches ? changedTouches[0].pageX : pageX;
        const y = hasTouches ? changedTouches[0].pageY : pageY;

        if (hasTouches) {
            e.preventDefault();

            if (
                Math.abs(this.startPosition.x - x) < TAP_THRESHOLD ||
                Math.abs(this.startPosition.y - y) < TAP_THRESHOLD
            ) {
                return;
            }

            this.setState({
                boostLeft: false,
                boostRight: false
            });
        }
        this.movePaws(x, y);
    }

    onMouseDown(e) {
        const { pageX, pageY, changedTouches } = e;
        const hasTouches = !isEmpty(changedTouches);
        const random = Math.random() > 0.5;
        const x = hasTouches ? changedTouches[0].pageX : pageX;
        const y = hasTouches ? changedTouches[0].pageY : pageY;

        if (y < 70) return;

        this.startTime = Date.now();
        this.startPosition = { x, y };
        this.setState({
            boostLeft: random,
            boostRight: !random
        });
    }

    onMouseUp({ pageX, pageY, changedTouches }) {
        const { boostLeft } = this.state;
        const hasTouches = !isEmpty(changedTouches);
        const hasMoved = this.hasMoved;
        const duration = Math.min(Date.now() - this.startTime, MAX_DURATION);
        const hitX = hasTouches ? this.state.x : pageX;
        const hitY = hasTouches ? this.state.y : pageY;

        this.hasMoved = false;
        this.setState({
            boostLeft: false,
            boostRight: false
        });

        if (hasTouches && (hasMoved || changedTouches[0].pageY < 70)) {
            return;
        }

        // onBat({
        //     direction: boostLeft ? -1 : 1,
        //     boost: duration / MAX_DURATION,
        //     hitX,
        //     hitY
        // });
    }

    onResize() {
        if (!CAN_USE_DOM) return;

        this.mid = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        this.isLandscape = window.innerWidth > window.innerHeight;
        // onUpdateBounds({
        //     midX: this.mid.x,
        //     midY: this.mid.y,
        //     boundsX: window.innerWidth,
        //     boundsY: window.innerHeight
        // });
    }
    render() {
        const { boostLeft, boostRight, x, y, rotation, isReady, isPrepped } = this.state;
        const transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
        return (
            <div
                className={css.container}
                style={{
                    WebkitTransform: transform,
                    transform
                }}
            >
                <div className={css.leftWrapper} data-boost={boostLeft}>
                    <div className={css.leftArm}>
                        <div className={css.leftPaw} />
                    </div>
                </div>
                <div className={css.rightWrapper} data-boost={boostRight}>
                    <div className={css.rightArm}>
                        <div className={css.rightPaw} />
                    </div>
                </div>
            </div>
        );
    }
}

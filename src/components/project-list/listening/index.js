import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNowListening } from '../../../shared/actions';
import css from './listening.module.css';

@connect(({ nowListening }) => ({ nowListening }), { getNowListening })
export default class Listening extends PureComponent {
    static propTypes = {
        nowListening: PropTypes.object,
        getNowListening: PropTypes.func
    };
    static defaultProps = {
        nowListening: {}
    };
    componentWillMount() {
        const { nowListening, getNowListening } = this.props;
        if (!nowListening.artist) {
            //getNowListening();
        }
    }
    render() {
        const { nowListening: { artist, title, url } } = this.props;
        return !artist ? null : (
            <div className="row text-block">
                <div className="col col12">
                    <span className={css.tunes}>
                        I'm currently listening to{' '}
                        <a className={css.link} href={url} target="_blank">
                            {title}
                        </a>{' '}
                        by {artist}.
                    </span>
                </div>
            </div>
        );
    }
}

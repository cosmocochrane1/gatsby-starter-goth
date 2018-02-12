import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'gatsby-link';
import { getIsMenuOpen } from '../../shared/redux/menu';
import { toggleMenu } from '../../shared/actions';
import css from './header.module.css';

@connect(
    ({ menu }) => ({
        isMenuOpen: getIsMenuOpen(menu)
    }),
    { toggleMenu }
)
export default class Header extends PureComponent {
    static propTypes = {
        toggleMenu: PropTypes.func.isRequired,
        isMenuOpen: PropTypes.bool.isRequired,
        isLight: PropTypes.bool
    };
    render() {
        const { isLight } = this.props;
        return (
            <header className={isLight ? css.containerLight : css.container}>
                <div className={css.wrapper}>
                    <nav className={css.navigation}>
                        <Link to="/projects">Work</Link>
                    </nav>
                </div>
            </header>
        );
    }
}

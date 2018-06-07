import React from 'react';
import { NavLink } from 'react-router-dom';

import strings from './strings';

import './style.scss';

export default function MainNav() {

    return (
        <nav>
            <ul className="main-menu">
                <li className="main-menu__item">
                    <NavLink
                        exact
                        to="/profile"
                        className="main-menu__link"
                        activeClassName="main-menu__link--active"
                    >
                        {strings.profilePage}
                    </NavLink>
                </li>

                <li className="main-menu__item">
                    <NavLink
                        exact
                        to="/update-status"
                        className="main-menu__link"
                        activeClassName="main-menu__link--active"
                    >
                        {strings.updateStatusPage}
                    </NavLink>
                </li>

                <li className="main-menu__item">
                    <a
                        href="/api/logout"
                        className="main-menu__link"
                    >
                        {strings.logOut}
                    </a>
                </li>
            </ul>
        </nav>
    );
}
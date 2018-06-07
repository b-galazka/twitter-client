import React, { Component } from 'react';

import sharedStrings from '../../shared/strings';
import strings from './strings';

import './style.scss';

export default class NotFoundPage extends Component {

    render() {

        return (
            <div className="not-found-page">
                <h1 className="not-found-page__status-code">404</h1>
                <p>{strings.notFoundMessage}</p>
            </div>
        );
    }

    componentDidMount() {

        this.updatePageTitle();
    }

    updatePageTitle() {

        document.title = `${sharedStrings.basePageTitle} | ${strings.pageTitle}`;
    }
}
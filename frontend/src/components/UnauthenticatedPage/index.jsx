import React, { Component } from 'react';
import axios from 'axios';

import LoadingAnimation from '../LoadingAnimation';

import strings from './strings';

import './style.scss';

export default class UnauthenticatedPage extends Component {

    constructor() {

        super();

        this.state = {
            fetchingAuthUrl: false,
            fetchingAuthUrlError: false
        };

        this.redirectToTwitterAuthUrl = this.redirectToTwitterAuthUrl.bind(this);
    }

    render() {

        return (
            <div className="unauthenticated-page">
                {this.renderProperTemplate()}
            </div>
        );
    }

    renderProperTemplate() {

        const { state } = this;

        if (state.fetchingAuthUrlError) {

            return this.renderAuthError();
        }
        
        if (state.fetchingAuthUrl) {

            return this.renderLoadingAnimation();
        }

        return this.renderAuthButton();
    }

    renderAuthError() {

        return (
            <p 
                className="unauthenticated-page__auth-error"
            >
                {strings.authError}
            </p>
        );
    }

    renderLoadingAnimation() {

        return <LoadingAnimation />;
    }

    renderAuthButton() {

        return (
            <button
                className="button button--auth"
                onClick={this.redirectToTwitterAuthUrl}
            >
                {strings.logInViaTwitter}
            </button>
        );
    }

    redirectToTwitterAuthUrl() {

        (async () => {

            try {

                this.setState({
                    fetchingAuthUrl: true,
                    fetchingAuthUrlError: false
                });

                const { data } = await axios.get('/api/auth-url');

                location.replace(data.authUrl);

            } catch (err) {

                this.setState({
                    fetchingAuthUrl: false,
                    fetchingAuthUrlError: true
                });
            }
        })();
    }
}
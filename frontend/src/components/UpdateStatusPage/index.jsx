import React, { Component, Fragment } from 'react';
import axios from 'axios';

import sharedStrings from '../../shared/strings';
import strings from './strings';

import './style.scss';

export default class UpdateStatusPage extends Component {

    constructor() {

        super();

        this.state = {
            statusValue: '',
            statusUpdateSucceeded: false,
            statusUpdateFailed: false,
            statusUpdateInProgress: false
        };

        this.updateStatusValue = this.updateStatusValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {

        const { state } = this;

        return (
            <form onSubmit={this.submitForm} className="update-status-form">

                {this.renderResponseMessages()}

                <textarea
                    className="update-status-form__textarea"
                    value={state.statusValue}
                    onChange={this.updateStatusValue}
                    disabled={state.statusUpdateInProgress}
                    placeholder={strings.statusPlaceholder}
                    autoFocus
                >
                </textarea>

                {this.renderSubmitButton()}
            </form>
        );
    }

    componentDidMount() {

        this.updatePageTitle();
    }

    updatePageTitle() {

        document.title = `${sharedStrings.basePageTitle} | ${strings.pageTitle}`;
    }

    renderSubmitButton() {

        const { state } = this;

        return (
            <button
                disabled={this.shouldPreventFormSubmit()}
                className="button button--update-status"
            >

                {
                    state.statusUpdateInProgress ?
                        strings.updating + '...' :
                        strings.update
                }

            </button>
        );
    }

    renderResponseMessages() {

        const { state } = this;

        return (
            <Fragment>

                {
                    state.statusUpdateSucceeded &&

                    <p
                        className={
                            'update-status-form__message ' +
                            'update-status-form__message--success'
                        }
                    >
                        {strings.updateSuccess}
                    </p>
                }

                {
                    state.statusUpdateFailed &&

                    <p
                        className={
                            'update-status-form__message ' +
                            'update-status-form__message--failure'
                        }
                    >
                        {strings.updateFailure}
                    </p>
                }

            </Fragment>
        );
    }

    updateStatusValue({ target }) {

        const { value } = target;

        this.setState({
            statusValue: value
        });
    }

    submitForm(event) {

        (async () => {

            event.preventDefault();

            if (this.shouldPreventFormSubmit()) {

                return;
            }

            const status = this.state.statusValue.trim();

            this.onStatusUpdating();

            try {

                await axios.post('/api/update-status', { status });

                this.onStatusUpdated();

            } catch (err) {

                this.onStatusUpdateError();
            }
        })();  
    }

    shouldPreventFormSubmit() {

        const { state } = this;

        return (!this.isStatusValueValid() || state.statusUpdateInProgress);
    }

    isStatusValueValid() {

        const { statusValue } = this.state;

        return (statusValue.trim().length > 0);
    }

    onStatusUpdating() {

        this.setState({
            statusUpdateSucceeded: false,
            statusUpdateFailed: false,
            statusUpdateInProgress: true
        });
    }

    onStatusUpdated() {
      
        this.setState({
            statusUpdateSucceeded: true,
            statusUpdateFailed: false,
            statusUpdateInProgress: false,
            statusValue: ''
        });
    }

    onStatusUpdateError() {

        this.setState({
            statusUpdateSucceeded: false,
            statusUpdateFailed: true,
            statusUpdateInProgress: false
        });
    }
}
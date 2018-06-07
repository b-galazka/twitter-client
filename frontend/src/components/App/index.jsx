import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookies from 'js-cookie';

import AuthenticatedPage from '../AuthenticatedPage';
import UnauthenticatedPage from '../UnauthenticatedPage';

import { logIn } from '../../actions/auth';

import '../../shared/style.scss';
import './style.scss';

function mapStateToProps(state) {

    return {
        isAuthenticated: state.auth.authenticated
    };
}

function mapeDisptachToProps(dispatch) {

    return {
        logIn: bindActionCreators(logIn, dispatch)
    };
}

class App extends Component {

    componentWillMount() {

        if (this.isAuthenticated()) {

            this.props.logIn();
        }
    }

    render() {

        if (this.props.isAuthenticated) {

            return <AuthenticatedPage />;
        }

        return <UnauthenticatedPage />;
    }

    isAuthenticated() {

        return (cookies.get('authenticated') === 'true');
    }
}

export default connect(mapStateToProps, mapeDisptachToProps)(App);
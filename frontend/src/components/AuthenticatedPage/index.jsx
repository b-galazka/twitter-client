import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import MainNav from '../MainNav';
import NotFoundPage from '../NotFoundPage';
import UpdateStatusPage from '../UpdateStatusPage';
import ProfilePage from '../ProfilePage';

import './style.scss';

export default function AuthenticatedPage() {

    return (
        <BrowserRouter>
            <main className="container">
                <MainNav />

                <Switch>
                    <Redirect exact path="/" to="/profile" />

                    <Route exact path="/profile" component={ProfilePage} />
                    <Route exact path="/update-status" component={UpdateStatusPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}
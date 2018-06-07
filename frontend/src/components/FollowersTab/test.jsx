import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../store/mock';
import FollowersTab from './';

describe('FollowersTab component', () => {

    it('should render without crash', () => {

        render(
            <Provider store={store}>
                <FollowersTab />
            </Provider>,

            document.createElement('div')
        );
    });
});
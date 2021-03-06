import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../store/mock';
import App from './';

describe('App component', () => {

    it('should render without crash', () => {

        render(
            <Provider store={store}>
                <App />
            </Provider>,

            document.createElement('div')
        );
    });
});
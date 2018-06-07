import React from 'react';
import ReactDOM, { render } from 'react-dom';

import AuthenticatedPage from './';

describe('AuthenticatedPage component', () => {

    it('should render without crash', () => {

        render(<AuthenticatedPage />, document.createElement('div'));
    });
});
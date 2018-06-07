import React from 'react';
import ReactDOM, { render } from 'react-dom';

import LoadingAnimation from './';

describe('LoadingAnimation component', () => {

    it('should render without crash', () => {

        render(<LoadingAnimation />, document.createElement('div'));
    });
});
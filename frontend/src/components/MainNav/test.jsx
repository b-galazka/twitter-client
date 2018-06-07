import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import MainNav from './';

describe('MainNav component', () => {

    it('should render without crash', () => {

        render(
            <BrowserRouter>
                <MainNav />
            </BrowserRouter>,
            
            document.createElement('div')
        );
    });
});
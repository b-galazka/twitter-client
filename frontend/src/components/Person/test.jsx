import React from 'react';
import ReactDOM, { render } from 'react-dom';

import Person from './';

describe('Person component', () => {

    it('should render without crash', () => {

        render(
            <Person
                profileImageUrl=""
                name=""
                nickName=""
            />,

            document.createElement('div')
        );
    });
});
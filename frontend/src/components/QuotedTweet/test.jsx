import React from 'react';
import ReactDOM, { render } from 'react-dom';

import QuotedTweet from './';

describe('QuotedTweet component', () => {

    it('should render without crash', () => {

        render(
            <QuotedTweet
                id=""
                text=""

                author={{
                    name: '',
                    screen_name: ''
                }}
            />,

            document.createElement('div')
        );
    });
});
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

import UnauthenticatedPage from './';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    get: () => Promise.resolve({})
}));

describe('UnauthenticatedPage component', () => {

    let unauthenticatedPage;

    beforeEach(() => {

        unauthenticatedPage = shallow(<UnauthenticatedPage />).instance();
    });

    it('should render without crash', () => {

        render(<UnauthenticatedPage />, document.createElement('div'));
    });

    describe('UnauthenticatedPage.prototype.redirectToTwitterAuthUrl', () => {

        it('should call update state', () => {

            const spy = jest.spyOn(unauthenticatedPage, 'setState');

            unauthenticatedPage.redirectToTwitterAuthUrl();

            expect(spy).toHaveBeenCalledWith({
                fetchingAuthUrl: true,
                fetchingAuthUrlError: false
            });

            spy.mockReset();
            spy.mockRestore();
        });

        it('should call send request to API', () => {

            const spy = jest.spyOn(axios, 'get');

            unauthenticatedPage.redirectToTwitterAuthUrl();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('/api/auth-url');

            spy.mockReset();
            spy.mockRestore();
        });
    });
});
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

import UnauthenticatedPage from './';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    get: () => Promise.reject({})
}));

describe('UnauthenticatedPage component; API connection error', () => {

    let unauthenticatedPage;

    beforeEach(() => {

        unauthenticatedPage = shallow(<UnauthenticatedPage />).instance();
    });

    describe('UnauthenticatedPage.prototype.redirectToTwitterAuthUrl', () => {

        it('should update state', () => {

            const spy = jest.spyOn(unauthenticatedPage, 'setState');

            unauthenticatedPage.redirectToTwitterAuthUrl();

            expect(spy).toHaveBeenCalledWith({
                fetchingAuthUrl: false,
                fetchingAuthUrlError: true
            });

            spy.mockReset();
            spy.mockRestore();
        });
    });
});
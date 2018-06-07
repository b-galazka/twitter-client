import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

import UnauthenticatedPage from './';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => ({

    get: () => Promise.resolve({

        data: {
            authUrl: 'https://auth-url.com'
        }
    })
}));

describe('UnauthenticatedPage component; API connection success', () => {

    let unauthenticatedPage;

    beforeEach(() => {

        unauthenticatedPage = shallow(<UnauthenticatedPage />).instance();
    });

    describe('UnauthenticatedPage.prototype.redirectToTwitterAuthUrl', () => {

        it('should redirect to auth URL', async () => {

            expect.assertions(1);

            location.replace = () => {};

            const spy = jest.spyOn(location, 'replace');

            await unauthenticatedPage.redirectToTwitterAuthUrl();

            expect(spy).toBeCalledWith('https://auth-url.com');

            spy.mockReset();
            spy.mockRestore();
        });
    });
});
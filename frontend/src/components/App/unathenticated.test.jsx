import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import store from '../../store/mock';
import App from './';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('js-cookie', () => ({
    get: () => 'false'
}));

describe('App component when user is authenticated', () => {

    describe('App.prototype.isAuthenticated', () => {

        it('should return false', () => {

            const app = shallow(<App store={store} />).dive().instance();

            expect(app.isAuthenticated()).toBe(false);
        });
    });
});
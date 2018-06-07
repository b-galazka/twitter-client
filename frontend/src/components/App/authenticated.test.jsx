import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import store from '../../store/mock';
import App from './';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('js-cookie', () => ({
    get: () => 'true'
}));

describe('App component when user is authenticated', () => {

    let app;

    beforeEach(() => {

        app = shallow(<App store={store} />).dive().instance();
        app.props = { ...app.props };
    });

    describe('App.prototype.isAuthenticated', () => {

        it('should return true', () => {

            expect(app.isAuthenticated()).toBe(true);
        });
    });

    describe('props.logIn', () => {

        it('should be called in componentWillMount', () => {

            const spy = jest.fn();

            app.props.logIn = spy;

            app.componentWillMount();

            expect(spy).toBeCalled();
        });
    });
});
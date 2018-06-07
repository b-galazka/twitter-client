import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

import UpdateStatusPage from './';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    post: () => Promise.resolve()
}));

describe('UpdateStatusPage component; API connection success', () => {

    let updateStatusPage;

    beforeEach(() => {

        updateStatusPage = shallow(<UpdateStatusPage />).instance();
    });

    describe('UpdateStatusPage.prototype.submitForm', () => {

        const event = {
            preventDefault: () => {}
        };

        it('should call onStatusUpdated', async () => {

            expect.assertions(1);

            const spy = jest.spyOn(updateStatusPage, 'onStatusUpdated');

            updateStatusPage.shouldPreventFormSubmit = () => false;

            await updateStatusPage.submitForm(event);

            expect(spy).toHaveBeenCalled();

            spy.mockReset();
            spy.mockRestore();
        });
    });
});
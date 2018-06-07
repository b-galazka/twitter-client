import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

import UpdateStatusPage from './';

import sharedStrings from '../../shared/strings';
import strings from './strings';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => ({
    post: () => Promise.resolve()
}));

describe('UpdateStatusPage component', () => {

    let updateStatusPage;

    beforeEach(() => {

        updateStatusPage = shallow(<UpdateStatusPage />).instance();
    });

    it('should render without crash', () => {

        render(<UpdateStatusPage />, document.createElement('div'));
    });

    describe('UpdateStatusPage.prototype.updatePageTitle', () => {

        it('should update page title', () => {

            updateStatusPage.updatePageTitle();

            expect(document.title).toBe(`${sharedStrings.basePageTitle} | ${strings.pageTitle}`);
        });

        it('should be called in componentDidMount', () => {

            const spy = jest.spyOn(updateStatusPage, 'updatePageTitle');

            updateStatusPage.componentDidMount();

            expect(spy).toHaveBeenCalled();

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('UpdateStatusPage.prototype.updateStatusValue', () => {

        it('should update state', () => {

            const spy = jest.spyOn(updateStatusPage, 'setState');

            updateStatusPage.state.statusValue = '';

            updateStatusPage.updateStatusValue({
                target: { value: 'abc' }
            });

            expect(spy).toHaveBeenCalledWith({ statusValue: 'abc' });

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('UpdateStatusPage.prototype.isStatusValueValid', () => {

        it('should return true if trimmed status value is not empty', () => {

            updateStatusPage.state.statusValue = 'abc';

            expect(updateStatusPage.isStatusValueValid()).toBe(true);
        });

        it('should return false if trimmed status value is empty', () => {

            updateStatusPage.state.statusValue = '   ';

            expect(updateStatusPage.isStatusValueValid()).toBe(false);
        });
    });

    describe('UpdateStatusPage.prototype.shouldPreventFormSubmit', () => {

        it('should return true if status value is invalid', () => {

            updateStatusPage.state.statusValue = '  ';
            updateStatusPage.state.statusUpdateInProgress = false;

            expect(updateStatusPage.shouldPreventFormSubmit()).toBe(true);
        });

        it('should return true if status is being updated', () => {

            updateStatusPage.state.statusValue = 'abc';
            updateStatusPage.state.statusUpdateInProgress = true;

            expect(updateStatusPage.shouldPreventFormSubmit()).toBe(true);
        });

        it('should return false if status is not being updated and its value is valid', () => {

            updateStatusPage.state.statusValue = 'abc';
            updateStatusPage.state.statusUpdateInProgress = false;

            expect(updateStatusPage.shouldPreventFormSubmit()).toBe(false);
        });
    });

    describe('UpdateStatusPage.prototype.onStatusUpdating', () => {

        it('should update state with proper data', () => {

            const spy = jest.spyOn(updateStatusPage, 'setState');

            updateStatusPage.onStatusUpdating();

            expect(spy).toHaveBeenCalledWith({
                statusUpdateSucceeded: false,
                statusUpdateFailed: false,
                statusUpdateInProgress: true
            });

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('UpdateStatusPage.prototype.onStatusUpdated', () => {

        it('should update state with proper data', () => {

            const spy = jest.spyOn(updateStatusPage, 'setState');

            updateStatusPage.onStatusUpdated();

            expect(spy).toHaveBeenCalledWith({
                statusUpdateSucceeded: true,
                statusUpdateFailed: false,
                statusUpdateInProgress: false,
                statusValue: ''
            });

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('UpdateStatusPage.prototype.onStatusUpdateError', () => {

        it('should update state with proper data', () => {

            const spy = jest.spyOn(updateStatusPage, 'setState');

            updateStatusPage.onStatusUpdateError();

            expect(spy).toHaveBeenCalledWith({
                statusUpdateSucceeded: false,
                statusUpdateFailed: true,
                statusUpdateInProgress: false
            });

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('UpdateStatusPage.prototype.submitForm', () => {

        const event = {
            preventDefault: () => {}
        };

        it('should call event.preventDefault', () => {

            const spy = jest.fn();

            const event = {
                preventDefault: spy
            };

            updateStatusPage.submitForm(event);

            expect(spy).toHaveBeenCalled();
        });

        it('shouldn\'t submit form if shouldPreventFormSubmit returns true', () => {

            const spy = jest.spyOn(updateStatusPage, 'onStatusUpdating');

            updateStatusPage.shouldPreventFormSubmit = () => true;

            updateStatusPage.submitForm(event);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockReset();
            spy.mockRestore();
        });

        it('should call onStatusUpdating', () => {

            const spy = jest.spyOn(updateStatusPage, 'onStatusUpdating');

            updateStatusPage.shouldPreventFormSubmit = () => false;

            updateStatusPage.submitForm(event);

            expect(spy).toHaveBeenCalled();

            spy.mockReset();
            spy.mockRestore();
        });

        it('should send request to API', () => {

            const spy = jest.spyOn(axios, 'post');

            updateStatusPage.shouldPreventFormSubmit = () => false;
            updateStatusPage.state.statusValue = ' aaa ';

            updateStatusPage.submitForm(event);

            expect(spy).toHaveBeenCalledTimes(1);

            expect(spy).toHaveBeenCalledWith('/api/update-status', {
                status: updateStatusPage.state.statusValue.trim()
            });

            spy.mockReset();
            spy.mockRestore();
        });
    });
});
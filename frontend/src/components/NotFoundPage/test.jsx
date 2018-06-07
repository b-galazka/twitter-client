import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NotFoundPage from './';

import sharedStrings from '../../shared/strings';
import strings from './strings';

Enzyme.configure({ adapter: new Adapter() });

describe('NotFoundPage component', () => {

    let notFoundPage;

    beforeEach(() => {

        notFoundPage = shallow(<NotFoundPage />).instance();
    });

    it('should render without crash', () => {

        render(<NotFoundPage />, document.createElement('div'));
    });

    describe('NotFoundPage.prototype.updatePageTitle', () => {

        it('should update page title', () => {

            notFoundPage.updatePageTitle();

            expect(document.title).toBe(`${sharedStrings.basePageTitle} | ${strings.pageTitle}`);
        });

        it('should be called in componentDidMount', () => {

            const spy = jest.spyOn(notFoundPage, 'updatePageTitle');
            
            notFoundPage.componentDidMount();

            expect(spy).toHaveBeenCalled();

            spy.mockReset();
            spy.mockRestore();
        });
    });
});
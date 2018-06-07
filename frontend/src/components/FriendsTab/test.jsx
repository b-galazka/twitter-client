import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import store from '../../store/mock';
import FriendsTab from './';

describe('FriendsTab component', () => {

    let friendsTab;

    beforeEach(() => {

        friendsTab = shallow(<FriendsTab store={store} />).dive().instance();
        friendsTab.props = { ...friendsTab.props };
    });

    it('should render without crash', () => {

        render(
            <Provider store={store}>
                <FriendsTab />
            </Provider>, 
        
            document.createElement('div')
        );
    });

    describe('FriendsTab.prototype.isMoreFriendsToShow', () => {

        it('should return true if some friend is not fetched', () => {

            friendsTab.props.allFriendsFetched = false;
            friendsTab.props.friends = [];
            friendsTab.state.shownFriends = 50;

            expect(friendsTab.isMoreFriendsToShow()).toBe(true);
        });

        it('should return true if some fetched friend is not shown', () => {

            friendsTab.props.allFriendsFetched = true;
            friendsTab.props.friends = [1, 2, 3];
            friendsTab.state.shownFriends = 0;

            expect(friendsTab.isMoreFriendsToShow()).toBe(true);
        });

        it('should return false if all friends are fetched and shown', () => {

            friendsTab.props.allFriendsFetched = true;
            friendsTab.props.friends = [1, 2, 3];
            friendsTab.state.shownFriends = 3;    

            expect(friendsTab.isMoreFriendsToShow()).toBe(false);
        });
    });

    describe('FriendsTab.prototype.showMoreFriends', () => {

        it('should enlarge shown users by 50', () => {

            const spy = jest.spyOn(friendsTab, 'setState');

            friendsTab.state.shownFriends = 50;

            friendsTab.showMoreFriends();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({ shownFriends: 100 });

            spy.mockReset();
            spy.mockRestore();
        });

        it('should call fetchMoreFriends with param 200 ' +
            'if not enough friends are fetched', () => {

            const spy = jest.fn();

            friendsTab.props.allFriendsFetched = false;
            friendsTab.props.friends = [1, 2, 3];
            friendsTab.props.fetchMoreFriends = spy;
            friendsTab.state.shownFriends = 3;

            friendsTab.showMoreFriends();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(200);
        });
    });
});
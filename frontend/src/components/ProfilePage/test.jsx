import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import store from '../../store/mock';
import ProfilePage from './';

import sharedStrings from '../../shared/strings';
import strings from './strings';

Enzyme.configure({ adapter: new Adapter() });

describe('ProfilePage component', () => {

    let profilePage;

    beforeEach(() => {

        profilePage = shallow(<ProfilePage store={store} />).dive().instance();
        profilePage.props = { ...profilePage.props };
    });

    it('should render without crash', () => {

        render(
            <Provider store={store}>
                <ProfilePage />
            </Provider>,

            document.createElement('div')
        );
    });

    describe('ProfilePage.prototype.updatePageTitle', () => {

        it('should update page title', () => {

            profilePage.updatePageTitle();

            expect(document.title).toBe(`${sharedStrings.basePageTitle} | ${strings.pageTitle}`);
        });

        it('should be called in componentDidMount', () => {

            const spy = jest.spyOn(profilePage, 'updatePageTitle');

            profilePage.componentDidMount();

            expect(spy).toHaveBeenCalled();

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('ProfilePage.prototype.switchTab', () => {

        it('should return a function which calls setState() with provided param', () => {

            const spy = jest.spyOn(profilePage, 'setState');

            profilePage.switchTab('tabname')();

            expect(spy).toHaveBeenCalledWith({ activeTab: 'tabname' });

            spy.mockReset();
            spy.mockRestore();
        });
    });

    describe('ProfilePage.prototype.isAllDataFetched', () => {

        it('should return true if all data is fetched', () => {

            const { props } = profilePage;

            props.profile.fetched = true;
            props.followers.fetched = true;
            props.friends.fetched = true;
            props.tweets.fetched = true;

            expect(profilePage.isAllDataFetched()).toBe(true);
        });

        it('should return false if some required data is not fetched', () => {

            const { props } = profilePage;

            props.profile.fetched = true;
            props.followers.fetched = true;
            props.friends.fetched = false;
            props.tweets.fetched = true;

            expect(profilePage.isAllDataFetched()).toBe(false);
        });
    });

    describe('ProfilePage.prototype.isFetchingDataError', () => {

        it('should return false if fetching error hasn\'t occured', () => {

            const { props } = profilePage;

            props.profile.fetchingError = false;
            props.followers.fetchingError = false;
            props.friends.fetchingError = false;
            props.tweets.fetchingError = false;

            expect(profilePage.isFetchingDataError()).toBe(false);
        });

        it('should return true if fetching error has occured', () => {

            const { props } = profilePage;

            props.profile.fetchingError = false;
            props.followers.fetchingError = false;
            props.friends.fetchingError = true;
            props.tweets.fetchingError = false;

            expect(profilePage.isFetchingDataError()).toBe(true);
        });
    });

    describe('ProfilePage.prototype.fetchData', () => {

        it('should be called in componentDidMount', () => {

            const spy = jest.fn();

            profilePage.fetchData = spy;

            profilePage.componentDidMount();

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should call props.fetchTweets(10)', () => {

            const spy = jest.fn();
            const { props } = profilePage;

            props.fetchTweets = spy;
            props.fetchProfile = () => {};
            props.fetchFollowers = () => {};
            props.fetchFriends = () => {};

            profilePage.fetchData();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(10);
        });

        it('should call props.fetchProfile if profile is not fetched', () => {

            const spy = jest.fn();
            const { props } = profilePage;

            props.profile.fetched = false;
            props.fetchTweets = () => {};
            props.fetchProfile = spy;
            props.fetchFollowers = () => {};
            props.fetchFriends = () => {};

            profilePage.fetchData();

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should call props.fetchFollowers(5) if followers are not fetched', () => {

            const spy = jest.fn();
            const { props } = profilePage;

            props.followers.fetched = false;
            props.fetchTweets = () => {};
            props.fetchProfile = () => {};
            props.fetchFollowers = spy;
            props.fetchFriends = () => {};

            profilePage.fetchData();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(5);
        });

        it('should call props.fetchFriends(200) if friends are not fetched', () => {

            const spy = jest.fn();
            const { props } = profilePage;

            props.friends.fetched = false;
            props.fetchTweets = () => {};
            props.fetchProfile = () => {};
            props.fetchFollowers = () => {};
            props.fetchFriends = spy;

            profilePage.fetchData();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(200);
        });

        it('should call only props.fetchTweets(10) if rest of data is fetched', () => {

            const tweetsSpy = jest.fn();
            const profileSpy = jest.fn();
            const followersSpy = jest.fn();
            const friendsSpy = jest.fn();
            const { props } = profilePage;

            props.friends.fetched = true;
            props.followers.fetched = true;
            props.profile.fetched = true;
            props.fetchTweets = tweetsSpy;
            props.fetchProfile = profileSpy;
            props.fetchFollowers = followersSpy;
            props.fetchFriends = friendsSpy;

            profilePage.fetchData();

            expect(tweetsSpy).toHaveBeenCalledTimes(1);
            expect(tweetsSpy).toHaveBeenCalledWith(10);
            expect(profileSpy).toHaveBeenCalledTimes(0);
            expect(friendsSpy).toHaveBeenCalledTimes(0);
            expect(followersSpy).toHaveBeenCalledTimes(0);
        });
    });
});
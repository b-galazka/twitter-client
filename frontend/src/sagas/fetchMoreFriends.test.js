import { put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import axios from 'axios';

import {
    fetchMoreFriends,
    fetchingMoreFriendsSuccess,
    fetchingMoreFriendsFailure
} from '../actions/friends';

import { fetchMoreFriends as fetchMoreFriendsSaga } from './fetchMoreFriends';
import { nextCursorSelector } from '../sagasSelectors/friends';

jest.mock('axios', () => ({ get: () => { } }));

describe('fetchMoreFriends saga', () => {

    const count = 40;
    const nextCursor = 'abc';
    const saga = cloneableGenerator(fetchMoreFriendsSaga)({ count });

    it('should get nextCursor from store', () => {

        const { value } = saga.next();

        expect(value).toEqual(select(nextCursorSelector));
    });

    it('should call API', () => {

        const { value } = saga.next(nextCursor);
        const apiCall = call(axios.get, `/api/friends?count=${count}&cursor=${nextCursor}`);

        expect(value).toEqual(apiCall);
    });

    it('should put fetched data to store', () => {

        const sagaClone = saga.clone();
        const apiRes = { data: 'data' };
        const { value } = saga.next(apiRes);

        expect(value).toEqual(put(fetchingMoreFriendsSuccess(apiRes.data)));
    });

    it('should dispatch error action', () => {

        const sagaClone = saga.clone();
        const { value } = saga.throw();

        expect(value).toEqual(put(fetchingMoreFriendsFailure()));
    });
});
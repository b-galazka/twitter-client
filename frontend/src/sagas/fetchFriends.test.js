import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import axios from 'axios';

import {
    fetchFriends,
    fetchingFriendsFailure,
    fetchingFriendsSuccess
} from '../actions/friends';

import { fetchFriends as fetchFriendsSaga } from './fetchFriends';

jest.mock('axios', () => ({ get: () => { } }));

describe('fetchFriends saga', () => {

    const count = 40;
    const saga = cloneableGenerator(fetchFriendsSaga)({ count });

    it('should call API', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, `/api/friends?count=${count}`));
    });

    it('should put fetched data to store', () => {

        const sagaClone = saga.clone();
        const apiRes = { data: 'data' };
        const { value } = saga.next(apiRes);

        expect(value).toEqual(put(fetchingFriendsSuccess(apiRes.data)));
    });

    it('should dispatch error action', () => {

        const sagaClone = saga.clone();
        const { value } = saga.throw();

        expect(value).toEqual(put(fetchingFriendsFailure()));
    });
});
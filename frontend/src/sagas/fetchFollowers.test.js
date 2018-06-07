import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import axios from 'axios';

import {
    fetchFollowers,
    fetchingFollowersFailure,
    fetchingFollowersSuccess
} from '../actions/followers';

import { fetchFollowers as fetchFollowersSaga } from './fetchFollowers';

jest.mock('axios', () => ({ get: () => {} }));

describe('fetchFollowers saga', () => {

    const count = 40;
    const saga = cloneableGenerator(fetchFollowersSaga)({ count });

    it('should call API', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, `/api/followers?count=${count}`));
    });

    it('should put fetched data to store', () => {

        const sagaClone = saga.clone();
        const apiRes = { data: 'data' };
        const { value } = saga.next(apiRes);

        expect(value).toEqual(put(fetchingFollowersSuccess(apiRes.data)));
    });

    it('should dispatch error action', () => {

        const sagaClone = saga.clone();
        const { value } = saga.throw();

        expect(value).toEqual(put(fetchingFollowersFailure()));
    });
});
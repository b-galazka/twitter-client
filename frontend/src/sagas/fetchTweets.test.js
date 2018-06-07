import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import axios from 'axios';

import {
    fetchTweets,
    fetchingTweetsFailure,
    fetchingTweetsSuccess
} from '../actions/tweets';

import { fetchTweets as fetchTweetsSaga } from './fetchTweets';

jest.mock('axios', () => ({ get: () => { } }));

describe('fetchTweets saga', () => {

    const count = 40;
    const saga = cloneableGenerator(fetchTweetsSaga)({ count });

    it('should call API', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, `/api/tweets?count=${count}`));
    });

    it('should put fetched data to store', () => {

        const sagaClone = saga.clone();
        const apiRes = { data: 'data' };
        const { value } = saga.next(apiRes);

        expect(value).toEqual(put(fetchingTweetsSuccess(apiRes.data)));
    });

    it('should dispatch error action', () => {

        const sagaClone = saga.clone();
        const { value } = saga.throw();

        expect(value).toEqual(put(fetchingTweetsFailure()));
    });
});
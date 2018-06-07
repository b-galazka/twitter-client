import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import axios from 'axios';

import {
    fetchProfile,
    fetchingProfileFailure,
    fetchingProfileSuccess
} from '../actions/profile';

import { fetchProfile as fetchProfileSaga } from './fetchProfile';

jest.mock('axios', () => ({ get: () => { } }));

describe('fetchProfile saga', () => {

    const saga = cloneableGenerator(fetchProfileSaga)();

    it('should call API', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, '/api/profile'));
    });

    it('should put fetched data to store', () => {

        const sagaClone = saga.clone();
        const apiRes = { data: 'data' };
        const { value } = saga.next(apiRes);

        expect(value).toEqual(put(fetchingProfileSuccess(apiRes.data)));
    });

    it('should dispatch error action', () => {

        const sagaClone = saga.clone();
        const { value } = saga.throw();

        expect(value).toEqual(put(fetchingProfileFailure()));
    });
});
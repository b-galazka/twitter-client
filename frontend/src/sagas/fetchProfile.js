import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { fetchingProfileSuccess, fetchingProfileFailure } from '../actions/profile';
import { FETCHING_REQUESTED } from '../actionsTypes/profile';

export function *fetchProfile() {

    try {

        const res = yield call(axios.get, '/api/profile');

        yield put(fetchingProfileSuccess(res.data));

    } catch (err) {

        yield put(fetchingProfileFailure());
    }
}

export default function *fetchProfileWatcher() {

    yield takeLatest(FETCHING_REQUESTED, fetchProfile);
}
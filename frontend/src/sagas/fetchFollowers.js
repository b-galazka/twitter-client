import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { fetchingFollowersSuccess, fetchingFollowersFailure } from '../actions/followers';
import { FETCHING_REQUESTED } from '../actionsTypes/followers';

export function *fetchFollowers({ count }) {

    try {

        const res = yield call(axios.get, `/api/followers?count=${count}`);

        yield put(fetchingFollowersSuccess(res.data));

    } catch (err) {

        yield put(fetchingFollowersFailure());
    }
}

export default function *fetchFollowersWatcher() {

    yield takeLatest(FETCHING_REQUESTED, fetchFollowers);
}
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { fetchingTweetsSuccess, fetchingTweetsFailure } from '../actions/tweets';
import { FETCHING_REQUESTED } from '../actionsTypes/tweets';

export function *fetchTweets({ count }) {

    try {

        const res = yield call(axios.get, `/api/tweets?count=${count}`);

        yield put(fetchingTweetsSuccess(res.data));

    } catch (err) {

        yield put(fetchingTweetsFailure());
    }
}

export default function *fetchTweetsWatcher() {

    yield takeLatest(FETCHING_REQUESTED, fetchTweets);
}
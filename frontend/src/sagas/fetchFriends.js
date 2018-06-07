import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { fetchingFriendsSuccess, fetchingFriendsFailure } from '../actions/friends';
import { FETCHING_REQUESTED } from '../actionsTypes/friends';

export function *fetchFriends({ count }) {

    try {

        const res = yield call(axios.get, `/api/friends?count=${count}`);

        yield put(fetchingFriendsSuccess(res.data));

    } catch (err) {

        yield put(fetchingFriendsFailure());
    }
}

export default function *fetchFriendsWatcher() {

    yield takeLatest(FETCHING_REQUESTED, fetchFriends);
}
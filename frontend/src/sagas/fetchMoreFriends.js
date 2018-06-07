import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { fetchingMoreFriendsSuccess, fetchingMoreFriendsFailure } from '../actions/friends';
import { FETCHING_MORE_REQUESTED } from '../actionsTypes/friends';
import { nextCursorSelector } from '../sagasSelectors/friends';

export function *fetchMoreFriends({ count }) {

    try {

        const nextCursor = yield select(nextCursorSelector);

        const res = yield call(axios.get, `/api/friends?count=${count}&cursor=${nextCursor}`);

        yield put(fetchingMoreFriendsSuccess(res.data));

    } catch (err) {

        yield put(fetchingMoreFriendsFailure());
    }
}

export default function *fetchMoreFriendsWatcher() {

    yield takeLatest(FETCHING_MORE_REQUESTED, fetchMoreFriends);
}
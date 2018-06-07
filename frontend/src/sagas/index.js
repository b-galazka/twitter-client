import { all, fork } from 'redux-saga/effects';

import fetchFollowers from './fetchFollowers';
import fetchFriends from './fetchFriends';
import fetchTweets from './fetchTweets';
import fetchProfile from './fetchProfile';
import fetchMoreFriends from './fetchMoreFriends';

export default function *rootSaga() {

    yield all([
        fork(fetchFollowers),
        fork(fetchFriends),
        fork(fetchTweets),
        fork(fetchProfile),
        fork(fetchMoreFriends)
    ]);
}
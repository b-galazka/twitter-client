import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import { fetchingFollowersSuccess } from '../actions/followers';
import { fetchingFriendsSuccess } from '../actions/friends';
import { fetchingProfileSuccess } from '../actions/profile';
import { fetchingTweetsSuccess } from '../actions/tweets';
import { persons, profile, tweets } from './mockData';

const store = createStore(reducer);

store.dispatch(fetchingFollowersSuccess(persons));
store.dispatch(fetchingFriendsSuccess(persons));
store.dispatch(fetchingProfileSuccess(profile));
store.dispatch(fetchingTweetsSuccess(tweets));

export default store;
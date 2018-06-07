import { combineReducers } from 'redux';

import auth from './auth';
import followers from './followers';
import friends from './friends';
import profile from './profile';
import tweets from './tweets';

export default combineReducers({
    auth,
    followers,
    friends,
    profile,
    tweets
});
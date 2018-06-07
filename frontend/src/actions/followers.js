import {
    FETCHING_REQUESTED,
    FETCHING_SUCCEDED,
    FETCHING_FAILED
} from '../actionsTypes/followers';

export function fetchFollowers(count) {

    return {
        type: FETCHING_REQUESTED,
        count
    };
}

export function fetchingFollowersSuccess(payload) {

    return {
        type: FETCHING_SUCCEDED,
        payload
    };
}

export function fetchingFollowersFailure() {

    return {
        type: FETCHING_FAILED
    };
}
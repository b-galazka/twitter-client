import {
    FETCHING_REQUESTED,
    FETCHING_SUCCEDED,
    FETCHING_FAILED
} from '../actionsTypes/tweets';

export function fetchTweets(count) {

    return {
        type: FETCHING_REQUESTED,
        count
    };
}

export function fetchingTweetsSuccess(payload) {

    return {
        type: FETCHING_SUCCEDED,
        payload
    };
}

export function fetchingTweetsFailure() {

    return {
        type: FETCHING_FAILED
    };
}
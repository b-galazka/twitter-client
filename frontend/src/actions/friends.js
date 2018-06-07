import {
    FETCHING_REQUESTED,
    FETCHING_SUCCEDED,
    FETCHING_FAILED,
    FETCHING_MORE_REQUESTED,
    FETCHING_MORE_FAILED,
    FETCHING_MORE_SUCCEDED
} from '../actionsTypes/friends';

export function fetchFriends(count) {

    return {
        type: FETCHING_REQUESTED,
        count
    };
}

export function fetchingFriendsSuccess(payload) {

    return {
        type: FETCHING_SUCCEDED,
        payload
    };
}

export function fetchingFriendsFailure() {

    return {
        type: FETCHING_FAILED
    };
}

export function fetchMoreFriends(count) {

    return {
        type: FETCHING_MORE_REQUESTED,
        count
    };
}

export function fetchingMoreFriendsSuccess(payload) {

    return {
        type: FETCHING_MORE_SUCCEDED,
        payload
    };
}

export function fetchingMoreFriendsFailure() {

    return {
        type: FETCHING_MORE_FAILED
    };
}
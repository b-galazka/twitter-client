import {
    FETCHING_REQUESTED,
    FETCHING_SUCCEDED,
    FETCHING_FAILED
} from '../actionsTypes/profile';

export function fetchProfile() {

    return {
        type: FETCHING_REQUESTED
    };
}

export function fetchingProfileSuccess(payload) {

    return {
        type: FETCHING_SUCCEDED,
        payload
    };
}

export function fetchingProfileFailure() {

    return {
        type: FETCHING_FAILED
    };
}
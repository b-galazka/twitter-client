import {
    FETCHING_REQUESTED,
    FETCHING_SUCCEDED,
    FETCHING_FAILED
} from '../actionsTypes/tweets';

const initialState = {
    fetching: false,
    fetched: false,
    fetchingError: false,
    data: null
};

export default function tweetsReducer(state = initialState, action) {

    switch (action.type) {

        case FETCHING_REQUESTED: {

            return {
                ...state,
                fetching: true,
                fetched: false,
                fetchingError: false
            };
        }

        case FETCHING_SUCCEDED: {

            return {
                ...state,
                fetching: false,
                fetched: true,
                fetchingError: false,
                data: action.payload
            };
        }

        case FETCHING_FAILED: {

            return {
                ...state,
                fetching: false,
                fetched: false,
                fetchingError: true
            };
        }

        default: {

            return state;
        }
    }
}
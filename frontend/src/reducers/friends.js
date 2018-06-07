import {
    FETCHING_REQUESTED,
    FETCHING_SUCCEDED,
    FETCHING_FAILED,
    FETCHING_MORE_REQUESTED,
    FETCHING_MORE_SUCCEDED,
    FETCHING_MORE_FAILED
} from '../actionsTypes/friends';

const initialState = {
    fetching: false,
    fetched: false,
    fetchingError: false,
    fetchingMore: false,
    fetchedMore: false,
    fetchingMoreError: false,
    data: null
};

export default function friendsReducer(state = initialState, action) {

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

        case FETCHING_MORE_REQUESTED: {

            return {
                ...state,
                fetchingMore: true,
                fetchedMore: false,
                fetchingMoreError: false
            }
        }

        case FETCHING_MORE_SUCCEDED: {

            const { payload } = action;

            return {
                ...state,
                fetchingMore: false,
                fetchedMore: true,
                fetchingMoreError: false,

                data: {
                    next_cursor: payload.next_cursor,
                    next_cursor_str: payload.next_cursor_str,
                    previous_cursor: payload.previous_cursor,
                    previous_cursor_str: payload.previous_cursor_str,
                    users: [...state.data.users, ...payload.users]
                }
            }
        }

        case FETCHING_MORE_FAILED: {

            return {
                ...state,
                fetchingMore: false,
                fetchedMore: false,
                fetchingMoreError: true
            }
        }

        default: {

            return state;
        }
    }
}
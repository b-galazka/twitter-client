import { LOGIN, LOGOUT } from '../actionsTypes/auth';

const initialState = {
    authenticated: false
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {

        case LOGIN: {

            return {
                ...state,
                authenticated: true
            };
        }

        case LOGOUT: {

            return {
                authenticated: false
            };
        }

        default: {

            return state;
        }
    }
}
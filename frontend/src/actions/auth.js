import cookies from 'js-cookie';
import axios from 'axios';

import { LOGIN, LOGOUT } from '../actionsTypes/auth';

export function logIn() {

    return {
        type: LOGIN
    };
}

export function logOut() {

    cookies.remove('authenticated');
    axios.get('/api/logout');

    return {
        type: LOGOUT
    };
}
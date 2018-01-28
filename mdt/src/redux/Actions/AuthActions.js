import axios from 'axios';
import Config from "../../utils/config";

export const ACTION_TYPES = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL'
};

export const Logins = (user) => dispatch => {
console.log('Actions logins', user);
    return axios({
        url: Config.apiUrl + 'oauth/token',
        method: 'post',
        data: user,
        headers: {'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'},
    }).then((result) => {
        console.log(result);
        return dispatch({
            type: ACTION_TYPES.USER_LOGIN,
            payload: result
        });
    }).catch(error => {
        console.log(error);
        dispatch({type: ACTION_TYPES.USER_LOGIN_FAIL});
    });
};


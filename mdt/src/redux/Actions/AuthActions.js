import axios from 'axios';
import Config from "../../utils/config";

export const ACTION_TYPES = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL'
};

export const getToken = (user) => dispatch => {
    // console.log('Actions Logins', user);

    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.post['Cache-Control'] = 'no-cache';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const data = `grant_type=${user.grant_type}&client_id=${user.client_id}&client_secret=${user.client_secret}&username=${user.username}&password=${user.password}`;


    return axios.post(Config.apiUrl + 'oauth/token', data ).then((response) => {
        console.log('Logins', response.data);

        return dispatch({
            type: ACTION_TYPES.USER_LOGIN,
            payload: response.data
        });
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        dispatch({type: ACTION_TYPES.USER_LOGIN_FAIL});
    });
};


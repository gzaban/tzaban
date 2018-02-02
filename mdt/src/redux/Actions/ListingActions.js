import axios from 'axios';
import Config from "../../utils/config";
import {Alert} from 'react-native';

export const LISTING_ACTION_TYPES = {
    GET_ACCOUNTS_LISTING_SUCCEED: 'GET_ACCOUNTS_LISTING_SUCCEED',
    GET_ACCOUNTS_LISTING_FAIL: 'GET_ACCOUNTS_LISTING_FAIL'
};

export const getAccountsListing = (longitude, latitude ,page) => dispatch => {

    return axios.get(Config.apiUrl + `deploy/listing/paging/accounts?latitude=${latitude}&longitude=${longitude}&page=${page}` ).then((response) => {
       //  console.log('GET_ACCOUNTS_LISTING:', response.data.mainData);

        return dispatch({
            type: LISTING_ACTION_TYPES.GET_ACCOUNTS_LISTING_SUCCEED,
            payload: response.data.mainData
        });
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            Alert.alert(
                'Login Failed',
                error.response.data.toString(),
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            )
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            Alert.alert(
                'Login Failed',
                error.request && error.request.error_description.toString(),
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            )
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        dispatch({type: LISTING_ACTION_TYPES.GET_ACCOUNTS_LISTING_FAIL});
    });
};




/*
export function accounts() {
    dispatcher.dispatch({
        type: "ACCOUNTS"
    });
}

export function sites(accountId) {
    dispatcher.dispatch({
        type: "SITES",
        accountId: accountId
    });
}

export function siteTopology(siteId) {
    dispatcher.dispatch({
        type: "SITE_TOPOLOGY",
        siteId: siteId
    });
}

export function bridges(siteId) {
    dispatcher.dispatch({
        type: "BRIDGES",
        siteId: siteId
    });
}

export function devices(panelId) {
    dispatcher.dispatch({
        type: "DEVICES",
        panelId: panelId
    });
}*/

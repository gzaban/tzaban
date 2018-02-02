import {LISTING_ACTION_TYPES} from '../Actions/ListingActions';

const initialState = {
    accountsList: []
};

const listingReducer = function (state = initialState, action){
    switch(action.type) {
        case LISTING_ACTION_TYPES.GET_ACCOUNTS_LISTING_SUCCEED: {
            const accounts = action.payload.accounts;
            return Object.assign({}, state, {...state, accountsList: accounts});
        }
        default: {
            return state;
        }
    }
};

export default listingReducer;
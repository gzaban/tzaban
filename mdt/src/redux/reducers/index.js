import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './UserReducer';
import listingReducer from './ListingReducer';

// Combine Reducers
const reducers = combineReducers({
    userState: userReducer,
    listingState: listingReducer,
    form: formReducer,
});

export default reducers;
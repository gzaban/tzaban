import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './UserReducer';

// Combine Reducers
const reducers = combineReducers({
    userState: UserReducer,
    form: formReducer,
});

export default reducers;
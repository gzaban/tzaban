import {ACTION_TYPES} from '../Actions/AuthActions';


const initialState = {
    "access_token": null,
    "expires_in": null,
    "refresh_token": null,
    "token_type": "bearer",
};

const userReducer = function (state = initialState, action){
    switch(action.type) {
        case ACTION_TYPES.USER_LOGIN: {
            state = Object.assign({}, state, action.payload);
           // console.log('USER_LOGIN:', state);
            return state;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
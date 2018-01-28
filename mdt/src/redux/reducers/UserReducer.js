import {ACTION_TYPES} from '../Actions/AuthActions';



const initialState = {};

const userReducer = function (state = initialState, action){
    switch(action.type) {
        case ACTION_TYPES.USER_LOGIN: {
            return state;
        }
        default: {
            return state;
        }
    }
};

export default userReducer;


const ACTION_TYPES = {
    USER_LOGIN: 'USER_LOGIN'
};

const initialState = {

};

const userReducer = function (state = initialState, action){
    switch(action.type) {
        case ACTION_TYPES.USER_LOGIN: {
            return Object.assign({}, state, { isLoggedIn: true });
        }
    }
};

export default userReducer;
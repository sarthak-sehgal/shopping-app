import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    uid: null
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
            break;
        case actionTypes.AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null
            }
            break;
        case actionTypes.AUTH_SET_UID:
            return {
                ...state,
                uid: action.uid
            }
            break;
        case actionTypes.AUTH_REMOVE_UID:
            return {
                ...state,
                uid: null
            }
            break;
    }
    return state;
};

export default reducer;
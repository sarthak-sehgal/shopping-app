import * as actionTypes from '../actions/actionTypes';

const initialState = {
    
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                state,
            }
            break;
        case actionTypes.SIGN_UP:
            return {
                state,
            }
            break;
    }
    return state;
};

export default reducer;
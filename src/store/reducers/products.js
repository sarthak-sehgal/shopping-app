import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
            break;
    }
    return state;
};

export default reducer;
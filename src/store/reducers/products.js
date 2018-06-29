import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    searchResults: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
                searchResults: action.products
            }
            break;
        case actionTypes.SEARCH_PRODUCTS:
            let searchResults = [...state.products];
            searchResults = searchResults.filter(product => {
                if(action.searchQuery.trim() === '')
                    return product;
                let result = false;
                action.searchQuery.split(" ").map(query => {
                    if(query.trim() !== '') {
                        if(product.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || product.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
                        result = result || true;
                    }
                })
                if(result)
                    return product;
            });
            return {
                ...state,
                searchResults: searchResults
            }
            break;
    }
    return state;
};

export default reducer;
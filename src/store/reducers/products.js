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
        case actionTypes.SEARCH_PRODUCTS:
            let searchResults = [...state.products];
            searchResults = searchResults.filter(product => {
                if (action.searchQuery.trim() === '')
                    return product;
                let result = false;
                action.searchQuery.split(" ").map(query => {
                    if (query.trim() !== '') {
                        if (product.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || product.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
                            result = result || true;
                    }
                })
                if (result)
                    return product;
            });
            return {
                ...state,
                searchResults: searchResults
            }
        case actionTypes.REMOVE_PRODUCT_IN_STORE: {
            let updatedProducts = [...state.searchResults];
            updatedProducts = updatedProducts.filter(product => {
                return product.key !== action.key;
            });
            return {
                ...state,
                searchResults: updatedProducts
            }
        }
        case actionTypes.ADD_PRODUCT_IN_STORE: {
            let updatedProducts = [...state.searchResults];
            let productDetails = {
                name: action.details.name,
                description: action.details.description,
                price: action.details.price
            };
            updatedProducts.push(productDetails);
            return {
                ...state,
                searchResults: updatedProducts
            }
        }
    }
    return state;
};

export default reducer;
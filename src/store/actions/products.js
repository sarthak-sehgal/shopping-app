import * as actionTypes from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addProduct = (productDetails) => {
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then(token => {
                fetch("https://native-shopping-app.firebaseio.com/products.json?auth=" + token, {
                    method: "POST",
                    body: JSON.stringify({
                        name: productDetails.name,
                        description: productDetails.description,
                        price: productDetails.price
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .catch(error => {
                        console.log(err);
                        dispatch(uiStopLoading());
                        alert("Failed to add product! Please try again.");
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        if (parsedRes.error) {
                            console.log(parsedRes);
                            dispatch(uiStopLoading());
                            alert("Failed to add product! Please try again.");
                        } else {
                            dispatch(uiStopLoading());
                            alert("Product added!");
                        }
                    });
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
                alert("Failed to add product! Please try again.");
            })
    }
};

export const setProducts = (products) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    }
};

export const getProducts = () => {
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then(token => {
                fetch("https://native-shopping-app.firebaseio.com/products.json?auth=" + token)
                    .catch(err => {
                        console.log(err);
                        dispatch(uiStopLoading());
                        alert("Oops! Something went wrong. Failed to load products.");
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        const products = [];
                        for (let key in parsedRes) {
                            products.push({
                                ...parsedRes[key],
                                key: key
                            });
                        };
                        dispatch(setProducts(products));
                        dispatch(uiStopLoading());
                    })
            })
    }
};

export const searchProducts = (query) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS,
        searchQuery: query
    }
};

export const deleteProduct = (key) => {
    return dispatch => {
        dispatch(removeProductInStore(key));
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then(token => {
                fetch("https://native-shopping-app.firebaseio.com/products/" + key + ".json?auth=" + token, {
                    method: "DELETE"
                })
                    .catch(err => {
                        dispatch(uiStopLoading());
                        alert("Something went wrong, sorry :/");
                        console.log(err);
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        dispatch(uiStopLoading());
                        alert("Product removed!");
                    });
            })
    };
};

export const removeProductInStore = (key) => {
    return {
        type: actionTypes.REMOVE_PRODUCT_IN_STORE,
        key: key
    }
}
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
                        id: productDetails.name.replace(/ /g, ''),
                        name: productDetails.name,
                        tags: productDetails.tags.split(" ").filter(item => item !== ""),
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
}
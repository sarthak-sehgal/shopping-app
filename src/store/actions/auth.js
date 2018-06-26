import * as actionTypes from './actionTypes';
import startMain from '../../screens/StartMain/StartMain';
import {AsyncStorage} from 'react-native';

export const login = (authData) => {
    return dispatch => {
        dispatch(authLogin(authData));
    }
};

export const signUp = (authData) => {
    return dispatch => {
        dispatch(authSignUp(authData));
    }
};

export const authLogin = (authData) => {
    return dispatch => {
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBfJb3j_EzNwrJPGVtCj77QiC_D-k6y53w", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(error => {
            console.log(err);
            alert("Authentication failed! Please try again.");
        })
        .then(res => res.json())
        .then(parsedRes => {
            if(parsedRes.error) {
                alert("Authentication failed! Please try again.");
                console.log(parsedRes);
            } else {
                // fetch("https://native-shopping-app.firebaseio.com/users.json", {
                //     method: "POST",
                //     body: JSON.stringify({

                //     })
                // })
                console.log(parsedRes);
                dispatch(authStoreToken(parsedRes.idToken));
                startMain();
            }
        });
    };
};

export const authSignUp = (authData) => {
    return dispatch => {
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBfJb3j_EzNwrJPGVtCj77QiC_D-k6y53w", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(error => {
            console.log(err);
            alert("Authentication failed! Please try again.");
        })
        .then(res => res.json())
        .then(parsedRes => {
            if(parsedRes.error) {
                alert("Authentication failed! Please try again.");
                console.log(parsedRes);
            } else {
                // fetch("https://native-shopping-app.firebaseio.com/users.json", {
                //     method: "POST",
                //     body: JSON.stringify({

                //     })
                // })
                console.log(parsedRes);
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
                startMain();
            }
        });
    };
};

export const authStoreToken = (token, expiry) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        expiryDate = now.getTime() + expiry*1000;
        AsyncStorage.setItem("shopping-auth-token", token);
        AsyncStorage.setItem("shopping-auth-expiry", expiryDate.toString());
    }
};

export const authSetToken = token => {
    return {
        type: actionTypes.AUTH_SET_TOKEN,
        token: token
    }
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if(!token) {
                let fetchedToken;
                AsyncStorage.getItem("shopping-auth-token")
                .catch(err => reject())
                .then(tokenFromStorage => {
                    if(!tokenFromStorage) {
                        reject();
                        return;
                    }
                    fetchedToken = tokenFromStorage;
                    return AsyncStorage.getItem("shopping-auth-expiry");
                })
                .then(expiry => {
                    const parsedExpiry = new Date(parseInt(expiry));
                    const now = new Date();
                    if(parsedExpiry > now) {
                        dispatch(authSetToken(fetchedToken));
                        resolve(fetchedToken);
                    } else {
                        reject();
                    }
                })
                .catch(err => reject())
            } else {
                resolve(token);
            }
        });
        promise.catch(err => {
            dispatch(authClearStorage());
        });
        return promise;
    }
};

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => startMain())
        .catch(err => console.log("Failed to fetch token!"));
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("shopping-auth-token");
        AsyncStorage.removeItem("shopping-auth-expiry");
    }
}
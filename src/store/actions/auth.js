import * as actionTypes from './actionTypes';
import startMain from '../../screens/StartMain/StartMain';
import { AsyncStorage } from 'react-native';
import App from '../../../App';
import { uiStartLoading, uiStopLoading } from './index';

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
        dispatch(uiStartLoading());
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBfJb3j_EzNwrJPGVtCj77QiC_D-k6y53w", {
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
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert("Authentication failed! Please try again.");
                    console.log(parsedRes);
                    dispatch(uiStopLoading());
                } else {
                    dispatch(authStoreToken(
                        parsedRes.idToken,
                        parsedRes.expiresIn,
                        parsedRes.refreshToken));
                    dispatch(uiStopLoading());                    
                    startMain();
                }
            });
    };
};

export const authSignUp = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());
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
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert("Authentication failed! Please try again.");
                    console.log(parsedRes);
                    dispatch(uiStopLoading());
                } else {
                    authStoreTokenDetails = { ...parsedRes };
                    fetch("https://native-shopping-app.firebaseio.com/users.json", {
                        method: "POST",
                        body: JSON.stringify({
                            uid: parsedRes.localId,
                            email: authData.email,
                            address: authData.address,
                            phone: authData.phone
                        })
                    })
                        .then(res => res.json())
                        .then(parsedRes => {
                            if (parsedRes.error) {
                                alert("Authentication failed! Please try again.");
                                dispatch(uiStopLoading());
                            } else {
                                dispatch(authStoreToken(
                                    authStoreTokenDetails.idToken,
                                    authStoreTokenDetails.expiresIn,
                                    authStoreTokenDetails.refreshToken));
                                dispatch(uiStopLoading());
                                startMain();
                            }
                        })
                        .catch(err => {
                            alert("Authentication failed! Please try again.");
                            dispatch(uiStopLoading());

                        });
                }
            });
    };
};

export const authStoreToken = (token, expiry, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        expiryDate = now.getTime() + expiry * 1000;
        AsyncStorage.setItem("shopping-auth-token", token);
        AsyncStorage.setItem("shopping-auth-expiry", expiryDate.toString());
        AsyncStorage.setItem("shopping-auth-refreshToken", refreshToken);
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
            if (!token) {
                let fetchedToken;
                AsyncStorage.getItem("shopping-auth-token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        fetchedToken = tokenFromStorage;
                        return AsyncStorage.getItem("shopping-auth-expiry");
                    })
                    .then(expiry => {
                        const parsedExpiry = new Date(parseInt(expiry));
                        const now = new Date();
                        if (parsedExpiry > now) {
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
        return promise.catch(err => {
            return AsyncStorage.getItem("shopping-auth-refreshToken")
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyBfJb3j_EzNwrJPGVtCj77QiC_D-k6y53w", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                    })
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (parsedRes.id_token) {
                        console.log("Refresh token worked!");
                        dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
                        return parsedRes.id_token;
                    } else {
                        dispatch(authClearStorage());
                    }
                })
                .then(token => {
                    if (!token) {
                        throw (new Error())
                    } else {
                        return token;
                    }
                });
        });
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
        return AsyncStorage.removeItem("shopping-auth-refreshToken");
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                App();
            });
        dispatch(authRemoveToken());
    }
};

export const authRemoveToken = () => {
    return {
        type: actionTypes.AUTH_REMOVE_TOKEN
    }
}
import * as actionTypes from './actionTypes';
import startMain from '../../screens/StartMain/StartMain';

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
                startMain();
            }
        });
    };
};

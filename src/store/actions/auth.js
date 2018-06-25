import * as actionTypes from './actionTypes';

export const login = () => {
    return {
        type: actionTypes.LOGIN
    };
};

export const signUp = () => {
    return {
        type: actionTypes.SIGN_UP
    };
};

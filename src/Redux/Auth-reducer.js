import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'Auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'Auth/SET_CAPTCHA_URL';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha:null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captcha:action.captchaURL,
            };
        default:
            return state;

    }
};
export const setAuthUserData = (id, email, login, isAuth) =>
    ({type: SET_USER_DATA, data: {id, email, login, isAuth}});
export const setCaptchaUrl = (captchaURL) =>
    ({type: SET_CAPTCHA_URL,captchaURL});

export const getAuth = () => async(dispatch) => {
    let response=await AuthAPI.me()
            if (response.data.resultCode === 0) {
                let {email, id, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
}
export const login = (email, password, rememberMe,captcha) => async (dispatch) => {
    let response=await AuthAPI.postLogin(email, password, rememberMe,captcha)
                if (response.data.resultCode === 0) {
                    dispatch(getAuth());
                    dispatch(setCaptchaUrl(null));
                } else {
                    if(response.data.resultCode === 10){
                        dispatch(getCaptcha());
                    } else{
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit('login', {_error: message}))
                }}}
export const logout = () => async (dispatch) => {
    let response=await AuthAPI.logOut()
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }}

export const getCaptcha = () => async (dispatch) => {
    let response=await AuthAPI.getCaptcha()
        dispatch(setCaptchaUrl(response.data.url));
    }

export default AuthReducer;
import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'Auth/SET_USER_DATA';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,

            };

        default:
            return state;

    }
};
export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth}});

export const getAuth = () => async(dispatch) => {
    let response=await AuthAPI.me()
            if (response.data.resultCode === 0) {
                let {email, id, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    let response=await AuthAPI.postLogin(email, password, rememberMe)
                if (response.data.resultCode === 0) {
                    dispatch(getAuth());
                } else {
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                    dispatch(stopSubmit('login', {_error: message}))
                }}
export const logout = () => async (dispatch) => {
    let response=await AuthAPI.logOut()
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }}

export default AuthReducer;
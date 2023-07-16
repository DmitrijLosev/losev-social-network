import {ResultCodeCaptchaEnum, ResultCodeEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form"
import {AuthApi} from "../api/auth-api";
import {InferActionType, ThunkCommonType} from "./redux-store";

let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha:null as null | string
};
const AuthReducer = (state = initialState, action:ActionsType):initialStateType => {
    switch (action.type) {
        case 'Auth/SET_USER_DATA':
            return {
                ...state,
                ...action.data
            };
        case 'Auth/SET_CAPTCHA_URL':
            return {
                ...state,
                captcha:action.captchaURL
            };
        default:
            return state;

    }
};

export const actions= {
setAuthUserData:(id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: 'Auth/SET_USER_DATA', data: {id, email, login, isAuth}} as const),
setCaptchaUrl:(captchaURL: string | null)=> ({type: 'Auth/SET_CAPTCHA_URL', captchaURL} as const)
}

export const getAuth = ():ThunkCommonType<ActionsType> => async(dispatch) => {
    let data=await AuthApi.me()
            if (data.resultCode === ResultCodeEnum.Success) {
                let {email, id, login} = data.data;
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
}
export const login = (email:string, password:string, rememberMe:boolean,captcha:string | null)
    :ThunkCommonType<ActionsType | FormAction> => async (dispatch) => {
    let data=await AuthApi.postLogin(email, password, rememberMe,captcha)
                if (data.resultCode === ResultCodeEnum.Success) {
                    dispatch(getAuth());
                    dispatch(actions.setCaptchaUrl(null));
                } else {
                    if(data.resultCode === ResultCodeCaptchaEnum.Captcha){
                        dispatch(getCaptcha());
                    } else{
                    let message =data.messages && data.messages.length > 0 ? data.messages : ["Some error"]
                    dispatch(stopSubmit('login', {_error: message}))
                }}}
export const logout = ():ThunkCommonType<ActionsType> => async (dispatch) => {
    let data=await AuthApi.logOut()
                if (data.resultCode === ResultCodeEnum.Success) {
                    dispatch(actions.setAuthUserData(null, null, null, false))
                }}

export const getCaptcha = ():ThunkCommonType<ActionsType> => async (dispatch) => {
    let data=await AuthApi.getCaptcha()
        dispatch(actions.setCaptchaUrl(data.url))
    }

export default AuthReducer;

export type initialStateType=typeof initialState;
export type ActionsType = InferActionType<typeof actions>
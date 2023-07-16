import {CommonResponseType, instance, ResultCodeCaptchaEnum} from "./api";

type MeType = {
    id: number
    email: string
    login: string
}
type GetCaptchaType={
    url:string
}

export const AuthApi = {
    me() {
        return instance.get<CommonResponseType<MeType>>(`auth/me`)
            .then (res=>res.data)
    },
    postLogin(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<CommonResponseType<{},ResultCodeCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res=>res.data)
    },
    logOut() {
        return instance.delete(`auth/login`)
            .then (res=>res.data) as Promise<CommonResponseType<{}>>
    },
    getCaptcha() {
        return instance.get<GetCaptchaType>(`security/get-captcha-url`)
            .then (res=>res.data)
    }
};



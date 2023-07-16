import axios from "axios";


export enum ResultCodeEnum {
    Success,
    Error
}
export enum ResultCodeCaptchaEnum {
    Captcha=10
}

export type CommonResponseType<A,B={}>={
    data:A
    resultCode:ResultCodeEnum | B
    messages:Array<string> | null
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c0e1aeee-b02c-4c2b-a1ae-8791ba220fd4"
    }
})



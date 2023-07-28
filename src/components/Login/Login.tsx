import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {FieldForm, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useSelector,useDispatch} from "react-redux";
import {login} from "../../Redux/Auth-reducer";
import s from "./../Common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../Redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType} from "../../Redux/Auth-reducer";


const LoginForm:React.FC<Props & InjectedFormProps<LoginFormType,Props>> =
    ({handleSubmit,error,captcha}) => {
    return (
        <form onSubmit={handleSubmit}>
            {FieldForm<LoginFormNameTypeKeysType>('E-mail','email','',Input,[required],'')}
            {FieldForm<LoginFormNameTypeKeysType>('Password','password','password',Input,[required],'')}
            {FieldForm<LoginFormNameTypeKeysType>(undefined,'rememberMe','Checkbox',Input,[],'Remember me')}
            {error && <div className={s.formSummuryError}>
                {error}
            </div>}
            {captcha && <img src={captcha}/>}
            {captcha && FieldForm<LoginFormNameTypeKeysType>('','captcha','',Input,[required],'')}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm=
    reduxForm<LoginFormType,Props>({form: 'login'})(LoginForm)



export const Login:React.FC = (props) => {

const isAuth=useSelector((state:AppStateType)=>state.auth.isAuth)
    const id=useSelector((state:AppStateType)=>state.auth.id)
    const captcha=useSelector((state:AppStateType)=>state.auth.captcha)
    const dispatch=
        useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>();
    let onSubmit = (formData:LoginFormType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    };
    if (isAuth) {
        return <Navigate to={"/Profile/"+id}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={captcha}/>
    </div>
}


type Props={
    captcha:string | null
}

export type LoginFormType={
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type LoginFormNameTypeKeysType=keyof LoginFormType

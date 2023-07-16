import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {FieldForm, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/Auth-reducer";
import s from "./../Common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../Redux/redux-store";


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

const LoginReduxForm= reduxForm<LoginFormType,Props>({form: 'login'})(LoginForm)



const Login:React.FC<PropsType> = (props) => {


    let onSubmit = (formData:LoginFormType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };
    if (props.isAuth) {
        return <Navigate to={"/Profile/"+props.id}/>
    }



    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
    </div>
}



let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        id:state.auth.id,
        captcha:state.auth.captcha
    }
}

export default connect<MapStatePropsType,DispatchStatePropsType,OwnPropsType,AppStateType>
(mapStateToProps, {login})(Login)


type Props={
    captcha:string | null
}

type PropsType=MapStatePropsType & DispatchStatePropsType & OwnPropsType

type MapStatePropsType={
    isAuth:boolean
    id:number | null
    captcha:string | null }
type DispatchStatePropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
};
type OwnPropsType={}

export type LoginFormType={
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type LoginFormNameTypeKeysType=keyof LoginFormType

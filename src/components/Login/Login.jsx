import React from "react";
import {reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {FieldForm, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/Auth-reducer";
import s from "./../Common/FormsControls/FormsControls.module.css"

const LoginForm = ({handleSubmit,error,captcha}) => {
    return (
        <form onSubmit={handleSubmit}>
            {FieldForm('E-mail','email','',Input,[required],'')}
            {FieldForm('Password','password','password',Input,[required],'')}
            {FieldForm('','rememberMe','Checkbox',Input,[],'Remember me')}
            {error && <div className={s.formSummuryError}>
                {error}
            </div>}
            {captcha && <img src={captcha}/>}
            {captcha && FieldForm('','captcha','',Input,[required],'')}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props) => {

    let onSubmit = (formData) => {
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



let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id:state.auth.id,
        captcha:state.auth.captcha
    }
}

export default connect(mapStateToProps, {login} )(Login)

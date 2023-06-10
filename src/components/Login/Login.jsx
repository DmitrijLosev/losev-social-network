import React from "react";
import {Field, reduxForm} from "redux-form";
import {Navigate} from "react-router-dom";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/Auth-reducer";
import s from "./../Common/FormsControls/FormsControls.module.css"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'E-mail'} name={'email'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={Input} type={'Checkbox'}/>Remember me
            </div>
            {props.error && <div className={s.formSummuryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props) => {

    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };
    if (props.isAuth) {
        return <Navigate to={"/Profile/"+props.id}/>
    }



    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}



let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id:state.auth.id
    }
}

export default connect(mapStateToProps, {login} )(Login)

import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForNavigate = (state) => ({
    isAuth: state.auth.isAuth
});
export const withAuthNavigate = (Component) => {

    let AuthNavigateComponent = (props) => {
        if (!props.isAuth) return <Navigate to={"/login"}/>
        return <Component {...props}/>
    }
    let ConnectedNavigateComponent=connect(mapStateToPropsForNavigate)(AuthNavigateComponent);
    return ConnectedNavigateComponent


}
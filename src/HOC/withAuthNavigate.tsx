import {Navigate} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

type MapStatePropsType={
    isAuth:boolean
}

let mapStateToPropsForNavigate = (state:AppStateType):MapStatePropsType => ({
    isAuth: state.auth.isAuth
});
export function withAuthNavigate<WCP extends MapStatePropsType> (WrappedComponent:ComponentType<WCP>) {

    const AuthNavigateComponent:React.FC<MapStatePropsType>=(props) => {
        let {isAuth, ...restProps}=props;
        if (!isAuth) return <Navigate to={"/login"}/>
        return <WrappedComponent {...restProps as WCP}/>
    }
    return connect<MapStatePropsType, {}, WCP, AppStateType>
    (mapStateToPropsForNavigate)(AuthNavigateComponent)

}
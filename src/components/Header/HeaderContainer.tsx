import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../Redux/Auth-reducer";
import {AppStateType} from "../../Redux/redux-store";


type PropsType=MapStatePropsType & DispatchStatePropsType

type MapStatePropsType=ReturnType<typeof mapStateToProps>
type DispatchStatePropsType = {
    logout:()=>void
};
class HeaderContainer extends React.Component<PropsType> {


    render() {
        return <>
            <Header {...this.props}/>
        </>
    }
}


let mapStateToProps = (state:AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login:state.auth.login
    }
}


export default connect<MapStatePropsType,DispatchStatePropsType,{},AppStateType>
(mapStateToProps, {logout})(HeaderContainer);
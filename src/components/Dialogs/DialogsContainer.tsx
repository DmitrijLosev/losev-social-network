import React, {ComponentType} from "react"
import {actions, InitialStateType} from '../../Redux/Dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from 'react-redux'
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";

export type DispatchStatePropsType={
    addMessage:(NewMessage:string)=>void
}
export type MapStatePropsType={
    dialogState:InitialStateType
}
let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        dialogState: state.DialogPage
    }
}


export default compose<ComponentType>(
    connect<MapStatePropsType,DispatchStatePropsType,{},AppStateType>(mapStateToProps,
        {addMessage:actions.addMessage}),
    withAuthNavigate)(Dialogs)

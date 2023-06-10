import React from 'react'
import {addMessage} from '../../Redux/Dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from 'react-redux'
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogState: state.DialogPage
    }
}


export default compose(
    connect(mapStateToProps, {addMessage}),
    withAuthNavigate)(Dialogs)

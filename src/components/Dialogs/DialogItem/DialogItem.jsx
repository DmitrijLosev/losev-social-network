import React from 'react'
import {NavLink} from "react-router-dom";
import s from './DialogIdem.module.css'

const DialogItem = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/Dialogs/" + props.id}>
                <img className={s.dialogava} src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB13YESkl_2gefSgE_NiufVwfDZksoS96wLg&usqp=CAU'></img>
                {props.name}</NavLink>
        </div>
    )
}

export default DialogItem
import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../../Redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {ActionsType, logout} from "../../Redux/Auth-reducer";

export const Header:React.FC = (props) => {

    const isAuth=useSelector((state:AppStateType)=>state.auth.isAuth)
    const login=useSelector((state:AppStateType)=>state.auth.login)
    const dispatch=
        useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>()
const onLogout=()=>{
        dispatch(logout())
}

    return (<header className={s.header}>
        <img
            src='https://images-platform.99static.com/fWHlmE4WZ91utqcADiDqL-Yajk0=/354x0:1120x766/500x500/top/smart/99designs-contests-attachments/66/66399/attachment_66399324'></img>
        <div className={s.loginblock}>
            {isAuth ?
                <div> {login} - <button onClick={onLogout}>Logout</button></div> :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>

    </header>)
}


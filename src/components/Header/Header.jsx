import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (<header className={s.header}>
        <img
            src='https://images-platform.99static.com/fWHlmE4WZ91utqcADiDqL-Yajk0=/354x0:1120x766/500x500/top/smart/99designs-contests-attachments/66/66399/attachment_66399324'></img>
        <div className={s.loginblock}>
            {props.isAuth ?
                <div> {props.login} - <button onClick={props.logout}>Logout</button></div> :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>

    </header>)
}

export default Header
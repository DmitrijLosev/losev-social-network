import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';


const Navbar:React.FC = (props) => {

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/Profile' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Dialogs' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Users' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    Users
                </NavLink></div>
            <div className={s.item}>
                <NavLink to='/News' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Music' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Settings' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    Settings
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/chat' className={({isActive})=>isActive ? s.ActiveLink : ''}>
                    <div className={s.itemchat}>ChatWebSocket</div>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
import React from "react";
import s from './Users.module.css'
import UsersPhoto from './../../assets/images/Users.png';
import {NavLink} from "react-router-dom";



let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span key={p.id} className={`${s.pagenumber} ${props.currentPage === p ? s.selected : ''}`}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>


        {props.users.map(u => <div key={u.id}>
               <span>
                   <div>
                       <NavLink to={"/profile/" + u.id}>
                       <img src={u.photos.small != null ? u.photos.small : UsersPhoto} className={s.userFoto}/>
                   </NavLink>
                   </div>
                   <div>
                   {u.followed ?
                       <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                           props.followUser(u.id)
                       }}>Unfollow</button> :
                       <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                           props.unfollowUser(u.id);
                       }}>Follow</button>}

               </div>
               </span>
                <span>
                   <div>
                   {u.name}
               </div>
                   <div>
                   {u.status}
               </div></span>
                <span>
                   <div>
                       {"u.location.country"}
                   </div>
                       <div>
                           {"u.location.city"}
               </div>
               </span>
            </div>
        )
        }

    </div>
}


export default Users;
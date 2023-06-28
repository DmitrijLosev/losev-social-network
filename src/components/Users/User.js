import {NavLink} from "react-router-dom";
import UsersPhoto from "../../assets/images/Users.png";
import s from "./User.module.css";
import React from "react";

const User = ({user, followingInProgress, followUser, unfollowUser}) => {
    return <div>
               <span>
                   <div>
                       <NavLink to={"/profile/" + user.id}>
                       <img src={user.photos.small != null ? user.photos.small : UsersPhoto} className={s.userFoto}
                            alt={'Photo did not find'}/>
                   </NavLink>
                   </div>
                   <div>
                   {user.followed ?
                       <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                           followUser(user.id)
                       }}>Unfollow</button> :
                       <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                           unfollowUser(user.id);
                       }}>Follow</button>}

               </div>
               </span>
        <span>
                   <div>
                   USER NAME:{user.name}
               </div>
             <div>
                   USER ID:{user.id}
               </div>
                   <div>
                   {!user.status ? 'NO STATUS' : 'STATUS:  '+ user.status}
               </div></span>
        <span>
               </span>
    </div>
}
export default User;
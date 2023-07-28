import {NavLink} from "react-router-dom";
import UsersPhoto from "../../assets/images/Users.png";
import s from "./User.module.css";
import React from "react";
import {UserType} from "../../types/types";

type Props={
    user:UserType
    followingInProgress:Array<number>
    onFollowUser:(id:number)=>void
    onUnfollowUser:(id:number)=>void
}
export const User:React.FC<Props> = ({user, followingInProgress, onFollowUser, onUnfollowUser}) => {
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
                           onFollowUser(user.id)
                       }}>Unfollow</button> :
                       <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                           onUnfollowUser(user.id);
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

import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type Props={
    totalUsersCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    users:Array<UserType>
    followingInProgress:Array<number>
    followUser:(id:number)=>void
    unfollowUser:(id:number)=>void
}


let Users:React.FC<Props> = (props) => { return <div>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>

        {props.users.map(user => <User key={user.id} user={user} followingInProgress={props.followingInProgress}
                                       followUser={props.followUser} unfollowUser={props.unfollowUser}/>)}
    </div>
}


export default Users;
import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";



let Users = (props) => { return <div>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>

        {props.users.map(user => <User key={user.id} user={user} followingInProgress={props.followingInProgress}
                                       followUser={props.followUser} unfollowUser={props.unfollowUser}/>)}
    </div>
}


export default Users;
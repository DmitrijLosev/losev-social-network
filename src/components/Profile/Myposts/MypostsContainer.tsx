import React from 'react';
import Myposts from "./Myposts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {actions} from "../../../Redux/Profile-reducer";


export type MapStatePropsType=ReturnType<typeof mapStateToProps>
export type MapDispatchStatePropsType={
    addPost:(NewPostText:string)=>void
}

let mapStateToProps=(state:AppStateType)=>{
    return{
        posts:state.ProfilePage.posts
    }
}


const MyPostsContainer=connect<MapStatePropsType,MapDispatchStatePropsType, {},AppStateType>
(mapStateToProps, {addPost:actions.addPost})(Myposts);

export default MyPostsContainer;

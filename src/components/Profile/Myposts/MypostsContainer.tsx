import React from 'react';
import Myposts from "./Myposts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {actions} from "../../../Redux/Profile-reducer";


export type MapStatePropsType=ReturnType<typeof mapStateToProps>
export type MapDispatchStatePropsType={
    addPost:(NewPostText:string)=>void
    deleteChoosedPost:(id:number)=>void
    likeOrDislikePost:(id:number)=>void
}

let mapStateToProps=(state:AppStateType)=>{
    return{
        posts:state.ProfilePage.posts,
        photo:state.ProfilePage.profile?.photos.small,
        idAuth:state.auth.id,
        idProfile:state.ProfilePage.profile?.userId
    }
}


const MyPostsContainer=connect<MapStatePropsType,MapDispatchStatePropsType, {},AppStateType>
(mapStateToProps, {addPost:actions.addPost, deleteChoosedPost:actions.deleteChoosedPost,
    likeOrDislikePost:actions.likeOrDislikePost})(Myposts);

export default MyPostsContainer;

import React from 'react';
import {addPost} from "../../../Redux/Profile-reducer";
import Myposts from "./Myposts";
import {connect} from "react-redux";

let mapStateToProps=(state)=>{
    return{
        posts:state.ProfilePage.posts
    }
}


const MyPostsContainer=connect(mapStateToProps, {addPost})(Myposts);

export default MyPostsContainer;

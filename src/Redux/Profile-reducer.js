import {ProfileAPI} from "../api/api";

const ADD_POST = 'ProfilePage/ADD-POST';
const SET_USER_PROFILE = 'ProfilePage/SET_USER_PROFILE';
const SET_STATUS = 'ProfilePage/SET_STATUS';

let initialState = {
    posts: [
        {id: 1, post: 'Hey, how are u?', likesCount: 13},
        {id: 2, post: 'It is my first post!', likesCount: 22},
        {id: 3, post: 'HAHAHAHAH', likesCount: 77},
        {id: 4, post: 'BLALBLAL', likesCount: 11},
        {id: 5, post: 'YOYOYO', likesCount: 3}],
    profile: null,
    status:''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 7, post:action.NewPostText, likesCount: 0}],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;

    }
}

export const addPost = (NewPostText) => ({type: ADD_POST, NewPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const setProfile=(userId)=> async (dispatch)=>{
        let response=await ProfileAPI.getProfile(userId)
                dispatch(setUserProfile(response.data))
}

export const getUserStatus=(userId)=> async (dispatch)=>{
        let response=await ProfileAPI.getUserStatus(userId)
                dispatch(setStatus(response.data));
}
export const updateUserStatus=(status)=>async (dispatch)=>{
        let response=await ProfileAPI.updateUserStatus(status)
                if (response.data.resultCode === 0) {
                dispatch(setStatus(status));}
}
export default profileReducer;
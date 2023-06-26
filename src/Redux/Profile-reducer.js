import {ProfileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ProfilePage/ADD-POST';
const SET_USER_PROFILE = 'ProfilePage/SET_USER_PROFILE';
const SET_STATUS = 'ProfilePage/SET_STATUS';
const SET_PROFILE_PHOTO = 'ProfilePage/SET_PROFILE_PHOTO';
const CHANGE_EDIT_MODE_PROFILE_DATA='CHANGE_EDIT_MODE_PROFILE_DATA'

let initialState = {
    posts: [
        {id: 1, post: 'Hey, how are u?', likesCount: 13},
        {id: 2, post: 'It is my first post!', likesCount: 22},
        {id: 3, post: 'HAHAHAHAH', likesCount: 77},
        {id: 4, post: 'BLALBLAL', likesCount: 11},
        {id: 5, post: 'YOYOYO', likesCount: 3}],
    profile: null,
    status:'',
    editModeOfProfileData:false
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
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profile:{...state.profile,photos:action.photos}
            }
        case CHANGE_EDIT_MODE_PROFILE_DATA:
            return {
                ...state,
                editModeOfProfileData:action.edit
            }
        default:
            return state;

    }
}

export const addPost = (NewPostText) => ({type: ADD_POST, NewPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setProfilePhotoSuccess = (photos) => ({type: SET_PROFILE_PHOTO, photos});
export const changeEditModeOfProfileData = (edit) => ({type: CHANGE_EDIT_MODE_PROFILE_DATA, edit})


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
export const setProfilePhoto=(file)=>async (dispatch)=>{
    let response=await ProfileAPI.putPhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhotoSuccess(response.data.data.photos));}
}
export const sendProfileData=(Data)=>async (dispatch,getState)=>{
    const userId=getState().auth.id;
    const response=await ProfileAPI.putProfile(Data)
    if (response.data.resultCode === 0) {
        dispatch(setProfile(userId));
        dispatch(changeEditModeOfProfileData(false))
    }
    else {
        let message = response.data.messages.length > 0 ? response.data.messages: "Some error"
        dispatch(stopSubmit('profileData', {_error: message}))
    }
}
export default profileReducer;
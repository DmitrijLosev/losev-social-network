import {ResultCodeEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {ProfileAPI} from "../api/profile-api";
import {InferActionType, ThunkCommonType} from "./redux-store";
import {getAuth} from "./Auth-reducer";


let initialState = {
    posts: [
        {id: 1, post: 'Hey, how are u?', likesCount: 13, likedPost: false},
        {id: 2, post: 'It is my first post!', likesCount: 22, likedPost: true},
        {id: 3, post: 'HAHAHAHAH', likesCount: 77, likedPost: false},
        {id: 4, post: 'BLALBLAL', likesCount: 11, likedPost: true},
        {id: 5, post: 'YOYOYO', likesCount: 3, likedPost: false}] as Array<PostsType>,
    profile: null as null | ProfileType,
    status: "" as string | "",
    editModeOfProfileData: false,
    updateStatusErrorMessage: null as null | Array<string>,
};

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ProfilePage/ADD-POST':
            return {
                ...state,
                posts: [...state.posts, {
                    id:state.posts.length===0 ? 0 : state.posts[state.posts.length - 1].id + 1,
                    post: action.NewPostText,
                    likesCount: Math.floor(Math.random() * (100)) + 1,
                    likedPost: false
                }],
            };
        case 'ProfilePage/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'ProfilePage/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'ProfilePage/SET_PROFILE_PHOTO':
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case 'ProfilePage/CHANGE_EDIT_MODE_PROFILE_DATA':
            return {
                ...state,
                editModeOfProfileData: action.edit
            }
        case 'ProfilePage/UPDATE_STATUS_ERROR':
            return {
                ...state,
                updateStatusErrorMessage: action.message
            }
        case 'ProfilePage/SET_DELETED_POST_ID':
            return {
                ...state,
                posts: [...state.posts.filter(p => p.id !== action.id)]
            }
        case 'ProfilePage/SET_LIKE_OR_DISLIKE':
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return {
                            ...post,
                            likesCount: post.likedPost ? post.likesCount - 1 : post.likesCount + 1,
                            likedPost: !post.likedPost,
                        };
                    }
                    return post;
                }),
            }
        default:
            return state;

    }
}

export const actions = {
    addPost: (NewPostText: string) => ({type: 'ProfilePage/ADD-POST', NewPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'ProfilePage/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'ProfilePage/SET_STATUS', status} as const),
    setProfilePhotoSuccess: (photos: PhotosType) => ({type: 'ProfilePage/SET_PROFILE_PHOTO', photos} as const),
    changeEditModeOfProfileData: (edit: boolean) => ({
        type: 'ProfilePage/CHANGE_EDIT_MODE_PROFILE_DATA',
        edit
    } as const),
    updateStatusError: (message: Array<string> | null) => ({type: 'ProfilePage/UPDATE_STATUS_ERROR', message} as const),
    deleteChoosedPost: (id: number) => ({type: 'ProfilePage/SET_DELETED_POST_ID', id} as const),
    likeOrDislikePost: (id: number) => ({type: 'ProfilePage/SET_LIKE_OR_DISLIKE', id} as const)
}

export const setProfile = (userId: number): ThunkCommonType<ActionsType> => async (dispatch) => {
    let data = await ProfileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkCommonType<ActionsType> => async (dispatch) => {
    let data = await ProfileAPI.getUserStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateUserStatus = (status: string): ThunkCommonType<ActionsType> => async (dispatch) => {
    let data = await ProfileAPI.putUserStatus(status)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status));
        dispatch(actions.updateStatusError(null));
    } else {
        let message = data.messages && data.messages.length > 0 ? data.messages : ["Some error"]
        dispatch(actions.updateStatusError(message));
    }
}
export const setProfilePhoto = (file: File): ThunkCommonType<ActionsType> => async (dispatch) => {
    let data = await ProfileAPI.putPhoto(file)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setProfilePhotoSuccess(data.data.photos));
    }
}
export const sendProfileData = (Data: ProfileType): ThunkCommonType<ActionsType | FormAction> => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await ProfileAPI.putProfile(Data)
    if (data.resultCode === ResultCodeEnum.Success) {
        if (userId != null) {
            dispatch(setProfile(userId));
            dispatch(actions.changeEditModeOfProfileData(false))
        } else {
            dispatch(getAuth())
        }
    } else {
        let message = data.messages && data.messages.length > 0 ? data.messages : ["Some error"]
        dispatch(stopSubmit('profileData', {_error: message}))
    }
}
export default profileReducer;

export type initialStateType = typeof initialState
export type ActionsType = InferActionType<typeof actions>

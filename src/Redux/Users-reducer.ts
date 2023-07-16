import {ResultCodeEnum} from "../api/api";
import {UsersAPI} from "../api/users-api";
import {updateObjectInArray} from "../utils/Object-helpers";
import {UserType} from "../types/types";
import {InferActionType, ThunkCommonType} from "./redux-store";
import {Dispatch} from "react";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 30,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

const UsersReducer = (state = initialState, action:ActionsType): InitialStateType => {
    switch (action.type) {
        case 'UsersPage/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            };
        case 'UsersPage/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            };
        case 'UsersPage/SET_USERS':
            return {...state, users: [...action.users]}
        case 'UsersPage/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'UsersPage/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};


export const actions = {
    follow: (userID: number) => ({type: 'UsersPage/FOLLOW', userID} as const),
    unfollow: (userID: number) => ({type: 'UsersPage/UNFOLLOW', userID} as const),
    setUsers: (users: Array<UserType>) => ({type: 'UsersPage/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'UsersPage/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) =>
        ({type:'UsersPage/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId
    } as const)
}

export const getUsers = (currentPage: number, pageSize: number):ThunkCommonType<ActionsType> =>
    async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await UsersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

const followOrUnfollow = async (dispatch:Dispatch<ActionsType>, userId: number, apiMethod: apiMethodTypes,
                                ActionCreator:(userId:number)=>ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(ActionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const followUser = (userId: number):ThunkCommonType<ActionsType> => (dispatch) => {
    followOrUnfollow(dispatch, userId, UsersAPI.deleteFollow.bind(UsersAPI), actions.unfollow);
}
export const unfollowUser = (userId: number):ThunkCommonType<ActionsType> => (dispatch) => {
    followOrUnfollow(dispatch, userId, UsersAPI.postFollow.bind(UsersAPI), actions.follow);
}
export default UsersReducer;

export type InitialStateType = typeof initialState
export type ActionsType = InferActionType<typeof actions>
type apiMethodTypes=typeof UsersAPI.deleteFollow | typeof UsersAPI.postFollow
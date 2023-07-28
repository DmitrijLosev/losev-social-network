import {AppStateType} from "./redux-store";

export const getUsersSelector=(state:AppStateType)=>{ return state.UsersPage.users}
export const getPageSizeSelector=(state:AppStateType)=>{ return state.UsersPage.pageSize}
export const getTotalUsersCountSelector=(state:AppStateType)=>{ return state.UsersPage.totalUsersCount}
export const getCurrentPageSelector=(state:AppStateType)=>{ return state.UsersPage.currentPage}
export const getFollowingInProgressSelector=(state:AppStateType)=>{ return state.UsersPage.followingInProgress}
export const getIsFetchingSelector=(state:AppStateType)=>{ return state.UsersPage.isFetching}
export const getFilterSelector=(state:AppStateType)=>{ return state.UsersPage.filter}

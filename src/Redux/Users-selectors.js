export const getUsersSelector=(state)=>{ return state.UsersPage.users}
export const getPageSizeSelector=(state)=>{ return state.UsersPage.pageSize}
export const getTotalUsersCountSelector=(state)=>{ return state.UsersPage.totalUsersCount}
export const getCurrentPageSelector=(state)=>{ return state.UsersPage.currentPage}
export const getFollowingInProgressSelector=(state)=>{ return state.UsersPage.followingInProgress}
export const getIsFetchingSelector=(state)=>{ return state.UsersPage.isFetching}
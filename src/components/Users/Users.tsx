import React, {useEffect} from "react";
import Paginator from "../Common/Paginator/Paginator";
import {User} from "./User";
import {UsersUseFormChanger} from "./UsersUseFormChanger";
import {ActionsType, FilterType, followUser, getUsers, unfollowUser} from "../../Redux/Users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageSelector,
    getFilterSelector,
    getFollowingInProgressSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../Redux/Users-selectors";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../Redux/redux-store";
import {useLocation, useNavigate} from "react-router-dom";
import {NumberParam, StringParam, useQueryParam} from "use-query-params";




export const Users: React.FC = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const users = useSelector(getUsersSelector)
    const followingInProgress = useSelector(getFollowingInProgressSelector)
    const filter = useSelector(getFilterSelector)
    const dispatch =
        useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>();
    const navigate = useNavigate();
    const location=useLocation();
    const valuesForForm={searchName:filter.term,UsersShowProperty: String(filter.friend)}
    const [term, setTerm]=useQueryParam("term",StringParam)
    const [friend, setFriend]=useQueryParam("friend",StringParam)
    const [page, setPage]=useQueryParam("page",NumberParam)

    useEffect(() => {

        let actualPage=!!page ? page : currentPage;
        let actualFilter=filter;
        if (!!term) actualFilter={...actualFilter,term:term};
        if (!!friend) actualFilter={...actualFilter,friend:friend === "true" ? true :
                friend === "false" ? false : null}
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])


    useEffect(() => {

        if (filter.term==="") {setTerm(undefined)} else {setTerm(filter.term)}
        setFriend(String(filter.friend))
        setPage(currentPage)
    }, [filter,currentPage])


    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const onFollowUser = (userId: number) => {
        dispatch(followUser(userId))
    }
    const onUnfollowUser = (userId: number) => {
        dispatch(unfollowUser(userId))
    }

    return <div>
        <div><UsersUseFormChanger onFilterChanged={onFilterChanged} values={valuesForForm}/></div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageChanged={onPageChanged}/>

        {users.map(user => <User key={user.id} user={user} followingInProgress={followingInProgress}
                                 onFollowUser={onFollowUser} onUnfollowUser={onUnfollowUser}/>)}
    </div>
}



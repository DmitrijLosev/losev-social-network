import React, {ComponentType} from "react";
import {actions, followUser, getUsers, unfollowUser} from "../../Redux/Users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getFriendSelector, getIsFetchingSelector,
    getPageSizeSelector, getTermSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../Redux/Users-selectors";
import {AppStateType} from "../../Redux/redux-store";

type MapPropsType=ReturnType<typeof mapStateToProps>
type DispatchPropsType={
    getUsers:(currentPage:number,pageSize:number,term:string,friend:boolean | null)=>void
    followUser:(id:number)=>void
    unfollowUser:(id:number)=>void
    setUsersSearchParams: (term: string, friend: boolean | null) =>void
}


type PropsType=MapPropsType & DispatchPropsType
class UsersContainer extends React.Component<PropsType> {


    componentDidMount() {
        let {currentPage,pageSize,term, friend, getUsers}=this.props;
        getUsers(currentPage,pageSize,term,friend)};

    onPageChanged = (pageNumber:number) => {
        let {getUsers,pageSize,term, friend}=this.props;
        getUsers(pageNumber,pageSize,term,friend)}
    componentDidUpdate(prevProps: PropsType) {
        let {getUsers,pageSize,term, friend}=this.props;
        if (prevProps.term!==this.props.term || prevProps.friend!==this.props.friend) {
            getUsers(1,pageSize,term,friend)}
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users {...this.props}
                   onPageChanged={this.onPageChanged}/>
        </>
    }
}

let mapStateToProps = (state:AppStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        isFetching:getIsFetchingSelector(state),
        friend:getFriendSelector(state),
        term:getTermSelector(state)
    }
}
export default compose<ComponentType>(
        withAuthNavigate,
    connect<MapPropsType,DispatchPropsType, {},AppStateType>
    (mapStateToProps, {getUsers,followUser,
        unfollowUser,setUsersSearchParams:actions.setUsersSearchParams}))(UsersContainer);
import React from "react";
import {getUsers, followUser,unfollowUser} from "../../Redux/Users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../Redux/Users-selectors";

class UsersContainer extends React.Component {


    componentDidMount() {this.props.getUsers(this.props.currentPage,this.props.pageSize)};

    onPageChanged = (pageNumber) => {this.props.getUsers(pageNumber,this.props.pageSize)}

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users {...this.props}
                   onPageChanged={this.onPageChanged}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        isFetching:getIsFetchingSelector(state)
    }
}
export default compose(
        withAuthNavigate,
    connect(mapStateToProps, {getUsers,followUser,unfollowUser},
        ))(UsersContainer);
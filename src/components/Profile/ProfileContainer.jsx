import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getUserStatus, setProfile, updateUserStatus} from "../../Redux/Profile-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {withRouter} from "../../HOC/withRouter";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.id
        }
        this.props.setProfile(userId);
        this.props.getUserStatus(userId);
    }


    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}

let mapStateToProps = (state) => {
        return {

            profile: state.ProfilePage.profile,
            status: state.ProfilePage.status,
            id: state.auth.id
        }
};
export default compose(
    connect(mapStateToProps, {setProfile,getUserStatus,updateUserStatus}),
    withRouter,withAuthNavigate

)(ProfileContainer);



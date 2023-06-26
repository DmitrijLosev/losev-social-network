import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    changeEditModeOfProfileData,
    getUserStatus, sendProfileData,
    setProfile,
    setProfilePhoto,
    updateUserStatus
} from "../../Redux/Profile-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {withRouter} from "../../HOC/withRouter";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    changeProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.id;
        }
        this.props.setProfile(userId);
        this.props.getUserStatus(userId)
    }

    componentDidMount() {this.changeProfile();}
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.changeProfile();
        }
    }


    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     isOwner={!this.props.router.params.userId || this.props.router.params.userId==this.props.id}
                     editModeOfProfileData={this.props.editModeOfProfileData}
                     changeEditModeOfProfileData={this.props.changeEditModeOfProfileData}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {

        profile: state.ProfilePage.profile,
        status: state.ProfilePage.status,
        id: state.auth.id,
        editModeOfProfileData: state.ProfilePage.editModeOfProfileData
    }
};
export default compose(
    connect(mapStateToProps, {setProfile, getUserStatus, updateUserStatus,setProfilePhoto,
        changeEditModeOfProfileData,sendProfileData}),
    withRouter, withAuthNavigate
)(ProfileContainer);



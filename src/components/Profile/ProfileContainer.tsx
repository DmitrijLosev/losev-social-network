import React, {ComponentType} from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {actions} from "../../Redux/Profile-reducer";
import {
    getUserStatus, sendProfileData,
    setProfile,
    setProfilePhoto,
    updateUserStatus
} from "../../Redux/Profile-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {ParamsType, withRouter} from "../../HOC/withRouter";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

export type PropsType=MapStatePropsType & DispatchPropsType & OwnPropsType
type MapStatePropsType=ReturnType<typeof mapStateToProps>
type DispatchPropsType={
    setProfile:(userId:number)=>void
    getUserStatus:(userId:number) =>void
    updateUserStatus:(status:string)=>void
    setProfilePhoto:(file:File) =>void
    changeEditModeOfProfileData:(edit:boolean)=>void
    sendProfileData:(Data:ProfileType)=>void
}
type OwnPropsType=ParamsType
class ProfileContainer extends React.Component<PropsType> {

    changeProfile() {
        let userId  = +this.props.router.params.userId;
        if (!userId && this.props.id) {
            userId = this.props.id;
        }
        this.props.setProfile(userId);
        this.props.getUserStatus(userId)
    }

    componentDidMount() {this.changeProfile()}
    componentDidUpdate(prevProps:PropsType) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.changeProfile()
        }
    }


    render() {

        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId || +this.props.router.params.userId==this.props.id}/>
        )
    }
}

let mapStateToProps = (state:AppStateType) => {
    return {

        profile: state.ProfilePage.profile,
        status: state.ProfilePage.status,
        id: state.auth.id,
        editModeOfProfileData: state.ProfilePage.editModeOfProfileData,
        updateStatusErrorMessage: state.ProfilePage.updateStatusErrorMessage
    }
};
export default compose<ComponentType>(
    connect<MapStatePropsType,DispatchPropsType,OwnPropsType,AppStateType>
    (mapStateToProps, {setProfile, getUserStatus, updateUserStatus,setProfilePhoto,
        changeEditModeOfProfileData:actions.changeEditModeOfProfileData,sendProfileData}),
    withRouter, withAuthNavigate
)(ProfileContainer);



import React from 'react';
import s from './Profile.module.css';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateUserStatus={props.updateUserStatus} isOwner={props.isOwner}
                         setProfilePhoto={props.setProfilePhoto}
                         editModeOfProfileData={props.editModeOfProfileData}
                         changeEditModeOfProfileData={props.changeEditModeOfProfileData}
                         sendProfileData={props.sendProfileData}/>
            <MypostsContainer/>
        </div>);
}

export default Profile
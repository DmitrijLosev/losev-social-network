import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import UsersPhoto from "../../../assets/images/Users.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const addProfilePhotoFile=(e)=>{
        if (e.currentTarget.files[0]) {
            props.setProfilePhoto(e.currentTarget.files[0]);
        }
    }

    return (
        <div>
            <div>
                <img className={s.profileinfoimg}
                     src='https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/12/11/14/happy.jpg'>
                </img>
            </div>
            <div className={s.profile}>
                <div>
                    <img src={!props.profile.photos.large ? UsersPhoto : props.profile.photos.large} className={s.mainfoto}/>
                    {props.isOwner && <input type="file" onChange={addProfilePhotoFile}/>}
                </div>
                <div>
                    <div>
                        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                    </div>
                    <div>NICKNAME: {props.profile.fullName}</div>
                    <div>Information about me: {props.profile.aboutMe}</div>
                    <div>Looking for a job:{props.profile.lookingForAJob ? 'yes' : 'no'}</div>
                    <div>What am I looking for? : {props.profile.lookingForAJobDescription}</div>
                    <div>Contacts:</div>
                    <div>facebook: {props.profile.contacts.facebook}</div>
                    <div>website: {props.profile.contacts.website}</div>
                    <div>twitter: {props.profile.contacts.twitter}</div>
                    <div>vk: {props.profile.contacts.vk}</div>
                    <div>instagram: {props.profile.contacts.instagram}</div>
                    <div>youtube: {props.profile.contacts.youtube}</div>
                    <div>mainLink: {props.profile.contacts.mainLink}</div>
                    <div>github: {props.profile.contacts.github}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import UsersPhoto from "../../../assets/images/Users.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const addProfilePhotoFile = (e) => {
        if (e.currentTarget.files[0]) {
            props.setProfilePhoto(e.currentTarget.files[0]);
        }
    }

    const onSubmit =(formData)=>{
        props.sendProfileData(formData);
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
                    <img src={!props.profile.photos.large ? UsersPhoto : props.profile.photos.large}
                         className={s.mainfoto}/>
                    {props.isOwner && <div className={s.statuscomment}>
                        change profile photo<input type="file" onChange={addProfilePhotoFile}/></div>}
                </div>
                <div>
                    <div>
                        <ProfileStatusWithHooks updateStatusErrorMessage={props.updateStatusErrorMessage}
                                                status={props.status} updateUserStatus={props.updateUserStatus}
                                                isOwner={props.isOwner}/>
                    </div>

                    {props.editModeOfProfileData ? <ProfileDataForm onSubmit={onSubmit} initialValues={props.profile}/>
                        : <ProfileData profile={props.profile} isOwner={props.isOwner}
                                       changeEditModeOfProfileData={props.changeEditModeOfProfileData}/>}

                </div>
            </div>
        </div>
    );
}

const ProfileData = ({profile,isOwner,changeEditModeOfProfileData}) => {

    const onChangeEditModeOfProfileData = ()=>{
       changeEditModeOfProfileData(true);
    }

    return <div>
        {isOwner && <button onClick={onChangeEditModeOfProfileData}>Format Profile Information</button>}
        <div><b>Full Name</b>: {profile.fullName}</div>
        <div><b>About me</b>: {profile.AboutMe}</div>
        <div><b>Looking for a job</b>:{profile.lookingForAJob ? 'yes' : 'no'}</div>
        <div><b>About my skills</b>: {profile.lookingForAJobDescription}</div>
        <div><b>Contacts</b>:</div>
        <div className={s.contacts}>
            {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
        </div>
    </div>

}

const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b> :{contactValue}</div>
}
export default ProfileInfo;
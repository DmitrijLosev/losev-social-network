import React from 'react';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {PropsType} from "./ProfileContainer";

export type Props= PropsType & {
    isOwner:boolean
}

const Profile:React.FC<Props> = (props) => {

    return (
        <div>
            <ProfileInfo {...props}/>
            <MypostsContainer/>
        </div>);
}

export default Profile
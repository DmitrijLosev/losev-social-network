import React from 'react';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo'


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo {...props}/>
            <MypostsContainer/>
        </div>);
}

export default Profile
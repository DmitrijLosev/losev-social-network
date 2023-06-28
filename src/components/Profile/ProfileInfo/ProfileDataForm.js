import React from "react";
import s from "./ProfileInfo.module.css";
import {FieldForm, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";




const ProfileData = ({initialValues,handleSubmit,error}) => {

    return <form onSubmit={handleSubmit}>
        {error && <div className={s.formSummuryError}>
            {error}
        </div>}
        <div><b>Full Name</b>: {FieldForm('Full Name','fullName','',Input)}</div>
        <div><b>About me</b>: {FieldForm('About me','AboutMe','',Input)}</div>
        <div><b>Looking for a job</b>: {FieldForm('','lookingForAJob','Checkbox',Input)}</div>
        <div><b>About my skills</b>:  {FieldForm('About my skills','lookingForAJobDescription',
            '',Textarea)}</div>
        <div><b>Contacts</b>:</div>
        <div className={s.contacts}>
            {Object.keys(initialValues.contacts).map(key => {
                return <div key={key}><b>{key}</b> :{FieldForm(key, "contacts."+key,'',Input)}</div>
            })}
        </div>
        <div className={s.button}>
        <button>Save Profile Information</button>
        </div>
    </form>
}

const ProfileDataForm=reduxForm({form: 'profileData'})(ProfileData);

export default ProfileDataForm;
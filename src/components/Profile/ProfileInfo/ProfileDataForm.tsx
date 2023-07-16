import React from "react";
import s from "./ProfileInfo.module.css";
import {FieldForm, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator} from "../../../utils/validators/validators";
import {ContactsType, ProfileType} from "../../../types/types";



let maxLength100=maxLengthCreator(100);
type PropsType={
    initialValues:ProfileType
}
const ProfileData:React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType> =
    ({initialValues,handleSubmit,error}) => {

    return <form onSubmit={handleSubmit}>
        {error && <div className={s.formSummuryError}>
            {error}
        </div>}
        <div><b>Full Name</b>: {FieldForm<ProfileFormNameType>('Full Name','fullName','',Input,
            [maxLength100])}</div>
        <div><b>Looking for a job</b>: {FieldForm<ProfileFormNameType>('','lookingForAJob','Checkbox',
            Input,[maxLength100])}</div>
        <div><b>About my skills</b>:  {FieldForm<ProfileFormNameType>('About my skills','lookingForAJobDescription',
            '',Textarea,[maxLength100])}</div>
        <div><b>Contacts</b>:</div>
        <div className={s.contacts}>
            {Object.keys(initialValues.contacts).map((key:string) => {
                return <div key={key}><b>{key}</b>
                    :{FieldForm<ContactsNameType>(key, "contacts."+key as keyof ContactsType,'',Input,
                    [maxLength100])}</div>
            })}
        </div>
        <div className={s.button}>
        <button>Save Profile Information</button>
        </div>
    </form>
}

const ProfileDataForm=reduxForm<ProfileType,PropsType>
({form: 'profileData'})(ProfileData);

export default ProfileDataForm;

type ProfileFormNameType=Extract<keyof ProfileType, string>
type ContactsNameType=Extract<keyof ContactsType, string>
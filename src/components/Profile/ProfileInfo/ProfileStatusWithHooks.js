import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [EditMode, setEditMode] = useState(false);
    let [status,setStatus]=useState(props.status)

    useEffect(()=>setStatus(props.status),[props.status])

    const activateEditMode = () => {
        props.isOwner &&
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }
     const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };

    return (
        <div className={s.status}><b>STATUS:</b>
            {props.isOwner && <div className={s.statuscomment}>change status on double click</div>}
            {!EditMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'NO STATUS'}</span>
                </div> :
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                           value={status}
                    />
                </div>}
        </div>

    )

}

export default ProfileStatusWithHooks;

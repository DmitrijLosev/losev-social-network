import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';

type PropsType={
    status:string
    updateUserStatus:(NewStatus:string)=>void
}
type StateType={
    editMode: boolean
    status: string
}

class ProfileStatusWithClass extends React.Component<PropsType,StateType> {


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateUserStatus(this.state.status);
    }
    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div className={s.status}>STATUS:
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'NO STATUS'}</span>
                    </div> :
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>}
            </div>

        )
    }
}

export default ProfileStatusWithClass;

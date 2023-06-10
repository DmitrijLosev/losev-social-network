import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


let maxLength10=maxLengthCreator(10);
const Dialogs = (props) => {


    let dialogsElements = props.dialogState.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);

    let messagesElements = props.dialogState.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    let onSubmit = (formData) => {
        props.addMessage(formData.NewMessage);
    };

    const NewMessageForm = (props) => {
        return (<form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder='Enter your message' name={'NewMessage'} component={Textarea}
                           validate={[required,maxLength10 ]}/>
                </div>
                <div>
                    <button>Send message</button>
                </div>
            </form>
        )
    }
    const NewMessageReduxForm = reduxForm({form:'Message'})(NewMessageForm)


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <NewMessageReduxForm onSubmit={onSubmit}/>
                </div>
            </div>

        </div>
    );
}

export default Dialogs
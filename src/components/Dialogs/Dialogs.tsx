import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {InjectedFormProps, reduxForm} from "redux-form";
import {FieldForm, Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {DialogsType, MessagesType} from "../../types/types";
import {DispatchStatePropsType, MapStatePropsType} from "./DialogsContainer";



let maxLength10=maxLengthCreator(10);
const Dialogs:React.FC<MapStatePropsType & DispatchStatePropsType> = (props) => {


    let dialogsElements =
        props.dialogState.dialogs.map((d:DialogsType) => <DialogItem key={d.id} id={d.id} name={d.name}/>);

    let messagesElements
        = props.dialogState.messages.map((m:MessagesType) => <Message key={m.id} id={m.id} message={m.message}/>);

    let onSubmit = (formData:MessageFormType) => {
        props.addMessage(formData.NewMessage);
    };

    const NewMessageForm:React.FC<InjectedFormProps<MessageFormType>> = (props) => {
        return (<form onSubmit={props.handleSubmit}>
                {FieldForm<keyof MessageFormType>('Enter your message','NewMessage','',Textarea,
                    [required,maxLength10 ],'')}
                <div>
                    <button>Send message</button>
                </div>
            </form>
        )
    }
    const NewMessageReduxForm = reduxForm<MessageFormType>({form:'Message'})(NewMessageForm)


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

type MessageFormType={NewMessage:string}
import React, {useEffect, useRef, useState} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from "../../components/Users/User.module.css";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageWithID,
    sendNewChatMessage,
    startChatMessageListening,
    stopChatMessageListening
} from "../../Redux/Chat-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../Redux/redux-store";
import {ActionsType} from "../../Redux/Chat-reducer";
import {ChatMessageType} from "../../api/chat-api";


const ChatPage: React.FC<{}> = React.memo(props => {
        return (
            <div>
                <Chat/>
            </div>
        )
    }
)
const Chat: React.FC = () => {

    const dispatch = useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>()
    useEffect(() => {
        dispatch(startChatMessageListening())
        return () => {
            dispatch(stopChatMessageListening())
        }
    }, [dispatch])

    return (
        <div>
            <div style={{backgroundColor: 'lightgrey', padding: '10px'}}>
                <ChatMessages/>
            </div>
            <AddMessageForm/>
        </div>

    )
}

const ChatMessages: React.FC<{}> = () => {

    let ChatMessages = useSelector((state: AppStateType) =>
        state.chat.chatMessages)
    const [isAutoScroll,setIsAutoScroll]=useState(false)
const scrollHandler=(e:React.UIEvent<HTMLDivElement, UIEvent>)=>{
const element=e.currentTarget
    if (Math.abs((element.scrollHeight-element.scrollTop)-element.clientHeight)<300) {
        !isAutoScroll && setIsAutoScroll(true)
    } else {
        isAutoScroll && setIsAutoScroll(false)
    }
}
    const messageAnchorRef=useRef<HTMLDivElement>(null)
useEffect(
    ()=>{
        if (isAutoScroll) {
        messageAnchorRef.current?.scrollIntoView({behavior:"smooth"})}
    },[ChatMessages]
)
    return (
        <div style={{overflowY: "auto", height: "450px"}} onScroll={scrollHandler}>
            {ChatMessages.map((message: ChatMessageWithID) =>
                <ChatMessage key={message.id} message={message}/>
            )}
            <div ref={messageAnchorRef}></div>
        </div>

    )
}
const ChatMessage: React.FC<{ message: ChatMessageType }> = React.memo(({message})=> {

    return (
        <div>
            <img src={message.photo} style={{width: '20px', height: '20px'}}/><b>{message.userName}</b>
            <span style={{paddingLeft: '10px'}}>{new Date().getHours()}</span>:<span>{ new Date().getMinutes()}</span>:
            <span>{new Date().getSeconds()}</span>
            <span style={{paddingLeft: '10px'}}>{new Date().getDate()}</span>/<span>{new Date().getMonth()}</span>/
            <span>{new Date().getFullYear()}</span>
            <br/>
            {message.message}
            <hr/>
        </div>

    )
}
)

const AddMessageForm: React.FC<{}> = () => {

const statusWSConnection=useSelector((state:AppStateType)=>state.chat.connectionWSStatus)
    const dispatch = useDispatch<ThunkDispatch<AppStateType, unknown, ActionsType>>()
    const schema = yup.object({
        NewChatMessage: yup.string().max(100).required(),
    })
    const {
        register, handleSubmit,
        formState: {errors}, reset
    } = useForm<{ NewChatMessage: string }>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (SubmitFormData: { NewChatMessage: string }) => {
        if (!!SubmitFormData.NewChatMessage) {
            dispatch(sendNewChatMessage(SubmitFormData.NewChatMessage))
        }
        reset()
    }

    const checkKeyDown = (e:React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter" && e.ctrlKey && statusWSConnection) handleSubmit(onSubmit)()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}  onKeyDown={(e) => checkKeyDown(e)}>
            <textarea {...register("NewChatMessage")} placeholder={"New Chat Message"} />
            <div><input type="submit" disabled={!statusWSConnection} value="Send Chat Message"/></div>
            <p className={s.error}>{errors.NewChatMessage?.message}</p>
        </form>
    )
}

export default ChatPage


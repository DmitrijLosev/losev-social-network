import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from "../../components/Users/User.module.css";
import * as yup from "yup";


const ChatPage: React.FC<{}> = React.memo(props => {
        return (
            <div>
                <Chat/>
            </div>
        )
    }
)
const Chat: React.FC = () => {

    const [wsChanel, SetWSChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
            let ws: WebSocket
            const closeHandler = () => {
                setTimeout(CreateWSConnection, 3000)
            }

            function CreateWSConnection() {
                ws?.removeEventListener('close', closeHandler)
                ws?.close()
                ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
                ws.addEventListener('close', closeHandler)
                SetWSChannel(ws)
            }

            CreateWSConnection()
            return () => {
                ws.removeEventListener('close', closeHandler)
                ws.close()
            }
        }, []
    )


    return (
        <div>
            <div style={{backgroundColor: 'lightgrey', padding: '10px'}}>
                <ChatMessages wsChanel={wsChanel}/>
            </div>
            <AddMessageForm wsChanel={wsChanel}/>
        </div>

    )
}

const ChatMessages: React.FC<{ wsChanel: WebSocket | null }> = ({wsChanel}) => {

    const [ChatMessages, setChatMessages] = useState<ChatMessageType[]>([])

    const messageHandler = (e: MessageEvent) => {
        let newEntryChatMessages = JSON.parse(e.data)
        setChatMessages((prevChatMessages) => [...prevChatMessages, ...newEntryChatMessages])
    }

    useEffect(() => {
        wsChanel?.addEventListener('message', messageHandler)
        return () => wsChanel?.removeEventListener('message', messageHandler)
    }, [wsChanel])

    return (
        <div style={{overflowY: "auto", height: "450px"}}>
            {ChatMessages.map((message: ChatMessageType, index: number) =>
                <ChatMessage key={index} message={message}/>
            )}
        </div>

    )
}
const ChatMessage: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img src={message.photo} style={{width: '20px', height: '20px'}}/><b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>

    )
}


const AddMessageForm: React.FC<{ wsChanel: WebSocket | null }> = ({wsChanel}) => {

    const [isWSConnected, setConnectedWSStatus] = useState<boolean>(false)
    const openHandler = () => setConnectedWSStatus(true)

    useEffect(() => {
        wsChanel?.addEventListener('open', openHandler)
        return () => {
            wsChanel?.removeEventListener('open', openHandler)
        }
    }, [wsChanel])


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
            wsChanel?.send(SubmitFormData.NewChatMessage)
        }
        reset()
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("NewChatMessage")} placeholder={"New Chat Message"}/>
            <div><input type="submit" disabled={!isWSConnected || wsChanel === null} value="Send Chat Message"/></div>
            <p className={s.error}>{errors.NewChatMessage?.message}</p>
        </form>
    )
}

export default ChatPage

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

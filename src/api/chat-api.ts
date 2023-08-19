let subscribers = {
    "newMessage":[] as Array<NewMessagesSubscriberType>,
    "statusWSChanged":[] as Array<StatusWSChangedSubscriberType>
}

let ws: WebSocket | null= null
const closeHandler = () => {
    notifyStatusWsChanged(false)
    setTimeout(CreateWSConnection, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newEntryChatMessages = JSON.parse(e.data)
    subscribers["newMessage"].forEach(s => s(newEntryChatMessages))
}
const openHandler = () => {
    notifyStatusWsChanged(true)
}
const resetWSConnection=()=>{
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
}
const notifyStatusWsChanged=(statusWs:boolean)=>{
    subscribers["statusWSChanged"].forEach
    (s=>s(statusWs))
}
function CreateWSConnection() {
    resetWSConnection()
    ws?.close()
    notifyStatusWsChanged(false)
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
}


export const chatAPI = {

    start(){
        CreateWSConnection()
    },
    stop(){
        ws?.close()
        resetWSConnection()
        notifyStatusWsChanged(false)
        subscribers["newMessage"]=[]
        subscribers["statusWSChanged"]=[]
    },
    subscribeGetMessage(callback: NewMessagesSubscriberType) {
        subscribers["newMessage"].push(callback)
    },
    subscribeStatusWSChanged(callback: StatusWSChangedSubscriberType) {
        subscribers["statusWSChanged"].push(callback)
    },
    unsubscribeGetMessage(callback: NewMessagesSubscriberType) {
        subscribers["newMessage"] = subscribers["newMessage"]
            .filter(s => s !== callback)
    },
    unsubscribeStatusWSChanged(callback: StatusWSChangedSubscriberType) {
        subscribers["statusWSChanged"] = subscribers["statusWSChanged"]
            .filter(s => s !== callback)
    },
    send(newChatMessage: string) {
        ws?.send(newChatMessage)
    }
}
type NewMessagesSubscriberType = (chatMessages: ChatMessageType[]) => void
type StatusWSChangedSubscriberType = (statusWSConnection:boolean) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

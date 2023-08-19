import {InferActionType, ThunkCommonType} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "react";
import {v1} from "uuid"




let initialState = {
    chatMessages: [] as ChatMessageWithID[],
    connectionWSStatus:false
};
const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'Chat/SET_CHAT_MESSAGES':
            return {
                ...state,
                chatMessages: [...state.chatMessages, ...action.newChatMessages.map
                (m=>({...m, id: v1()}))]
                    .filter((m,index,array) =>index>=array.length-50)
            };
        case 'Chat/SET_CONNECTION_WS_STATUS':
            return {
                ...state,
                connectionWSStatus:action.connectionWSStatus
            };
        case 'Chat/RESET_CHAT_MESSAGES':
            return {
                ...state,
                chatMessages:[]
            };
        default:
            return state;
    }
}

export const actions = {
    setChatMessages: (newChatMessages: ChatMessageType[]) =>
        ({type: 'Chat/SET_CHAT_MESSAGES', newChatMessages} as const),
    changeConnectionWSStatus: (connectionWSStatus: boolean) =>
        ({type: 'Chat/SET_CONNECTION_WS_STATUS', connectionWSStatus} as const),
    resetChatMessages: () =>
        ({type: 'Chat/RESET_CHAT_MESSAGES'} as const),
}

let _newMessageHandler: (((chatMessages: ChatMessageType[]) => void) | null) = null
const newMessageHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (chatMessages) => {
            dispatch(actions.setChatMessages(chatMessages))
        }
    }
    return _newMessageHandler
}

let _statusWsChangedHandler: (((statusWSConnection:boolean) => void) | null) = null
const statusWsChangeCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_statusWsChangedHandler===null) {
        _statusWsChangedHandler = (statusWSConnection:boolean) => {
            dispatch(actions.changeConnectionWSStatus(statusWSConnection))
        }
    }
    return _statusWsChangedHandler
}
export const startChatMessageListening = (): ThunkCommonType<ActionsType> =>
    async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribeGetMessage(newMessageHandlerCreator(dispatch))
        chatAPI.subscribeStatusWSChanged(statusWsChangeCreator(dispatch))
    }
export const stopChatMessageListening = (): ThunkCommonType<ActionsType> =>
    async (dispatch) => {
        chatAPI.stop()
        chatAPI.unsubscribeGetMessage(newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribeStatusWSChanged(statusWsChangeCreator(dispatch))
        dispatch(actions.resetChatMessages())
    }
export const sendNewChatMessage = (newChatMessage: string): ThunkCommonType<ActionsType> =>
    async (dispatch) => {
        chatAPI.send(newChatMessage)
    }

export default chatReducer;

export type ChatMessageWithID = ChatMessageType & {id:string}
export type initialStateType = typeof initialState;
export type ActionsType = InferActionType<typeof actions>
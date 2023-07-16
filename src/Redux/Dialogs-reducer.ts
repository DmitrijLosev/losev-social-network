import {DialogsType, MessagesType} from "../types/types";
import {InferActionType} from "./redux-store";


let initialState = {
    dialogs: [
        {id: 1, name: 'Tanja'},
        {id: 2, name: 'Alesja'},
        {id: 3, name: 'Nikita'},
        {id: 4, name: 'Dima'},
        {id: 5, name: 'Igor'},
        {id: 6, name: 'Maksim'}] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'HI!'},
        {id: 2, message: 'I love u, dady!'},
        {id: 3, message: 'How are u?'},
        {id: 4, message: 'Where are u?'},
        {id: 5, message: 'IT is cool!'},
        {id: 6, message: 'I found a mega note for u!'}] as Array<MessagesType>
};


export const actions = {
    addMessage:(NewMessage: string)=> ({type: 'DialogPage/ADD-MESSAGE', NewMessage} as const)
}

const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {

    switch (action.type) {
        case 'DialogPage/ADD-MESSAGE':
            return  {
                ...state,
                messages: [...state.messages, {id:state.messages[state.messages.length-1].id+1, message: action.NewMessage}]
            };
        default:
            return state;
    }
}

export default dialogsReducer;

export type InitialStateType=typeof initialState
export type ActionsType = InferActionType<typeof actions>
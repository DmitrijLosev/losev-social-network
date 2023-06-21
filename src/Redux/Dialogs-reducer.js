const ADD_MESSAGE = 'DialogPage/ADD-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Tanja'},
        {id: 2, name: 'Alesja'},
        {id: 3, name: 'Nikita'},
        {id: 4, name: 'Dima'},
        {id: 5, name: 'Igor'},
        {id: 6, name: 'Maksim'}],
    messages: [
        {id: 1, message: 'HI!'},
        {id: 2, message: 'I love u, dady!'},
        {id: 3, message: 'How are u?'},
        {id: 4, message: 'Where are u?'},
        {id: 5, message: 'IT-KAMASUTRA is cool!'},
        {id: 6, message: 'I found a mega note for u!'}],
};
export const addMessage = (NewMessage) => ({type: ADD_MESSAGE, NewMessage});

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return  {
                ...state,
                messages: [...state.messages, {id: 7, message: action.NewMessage}]
            };
        default:
            return state;
    }
}

export default dialogsReducer;
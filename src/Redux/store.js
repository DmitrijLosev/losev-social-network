import profileReducer from './Profile-reducer'
import dialogsReducer from './Dialogs-reducer'
import navbarReducer from './Navbar-reducer';

let store = {
    _state: {
        DialogPage: {
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
            newMessageBody: ''
        },
        ProfilePage: {
            posts: [
                {id: 1, post: 'Hey, how are u?', likesCount: 13},
                {id: 2, post: 'It is my first post!', likesCount: 22},
                {id: 3, post: 'HAHAHAHAH', likesCount: 77},
                {id: 4, post: 'BLALBLAL', likesCount: 11},
                {id: 5, post: 'YOYOYO', likesCount: 3}],
            newPostText: 'Say something'

        },
        NavbarPage: {
            friends: [
                {id: 1, name: 'Maksim'},
                {id: 2, name: 'Igor'},
                {id: 3, name: 'Sasha'}],
        }
    },
    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.ProfilePage = profileReducer(this._state.ProfilePage, action);
        this._state.NavbarPage = navbarReducer(this._state.NavbarPage, action);
        this._state.DialogPage = dialogsReducer(this._state.DialogPage, action);
        this._callSubscriber(this._state);
    }
}

window.store = store;
export default store;
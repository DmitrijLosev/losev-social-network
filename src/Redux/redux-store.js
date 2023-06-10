import {createStore, combineReducers, applyMiddleware} from 'redux'
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import navbarReducer from "./Navbar-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./App-reducer";


let reducers = combineReducers({
    auth:authReducer,
    ProfilePage:profileReducer,
    DialogPage:dialogsReducer,
    NavbarPage:navbarReducer,
    UsersPage:usersReducer,
    form:formReducer,
    app:appReducer


});
let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
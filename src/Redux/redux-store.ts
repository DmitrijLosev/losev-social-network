import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux'
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import navbarReducer from "./Navbar-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./App-reducer";
import chatReducer from "./Chat-reducer";



let rootReducer = combineReducers({
    auth:authReducer,
    ProfilePage:profileReducer,
    DialogPage:dialogsReducer,
    NavbarPage:navbarReducer,
    UsersPage:usersReducer,
    form:formReducer,
    app:appReducer,
    chat:chatReducer
});

export type AppStateType=ReturnType<typeof rootReducer>

export type InferActionType<T>= T extends {[key:string] : (...args:any[])=>infer U } ? U:never

export type ThunkCommonType<A extends Action>= ThunkAction<void, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store
export default store
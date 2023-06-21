import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;
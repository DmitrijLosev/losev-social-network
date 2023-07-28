import React, {ComponentType} from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends'
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {globalError, GlobalErrorType, initializeApp} from "./Redux/App-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./Redux/redux-store";
import {withSuspense} from "./HOC/withSuspense";
import {Login} from "./components/Login/Login";
import {Header} from "./components/Header/Header";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import {QueryParamProvider} from "use-query-params";


const DialogsContainer = React.lazy(
    () => import("./components/Dialogs/DialogsContainer"))
const UsersPage = React.lazy(
    () => import("./components/Users/UsersPage"));

type MapStatePropsType=ReturnType<typeof MapStateToProps>
type MapDispatchPropsType={
    globalError:(globalErrorText:GlobalErrorType)=>void
    initializeApp:()=>void
}

type PropsType=MapStatePropsType & MapDispatchPropsType

class App extends React.Component<PropsType> {

    catchAllUnhandledErrors=(event: PromiseRejectionEvent)=>{
        let globalErrorText=event.reason
        this.props.globalError(globalErrorText)}

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.InitializationComplete) {return <Preloader/>}
        return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {this.props.globalErrorText && <div className='globalError'><b>{this.props.globalErrorText.code}</b>
                        {this.props.globalErrorText.name}:{this.props.globalErrorText.message}</div>}
                    <Routes>
                        <Route path="/" element={<Navigate to={"/profile"}/>}/>
                        <Route path="/dialogs/*" element={withSuspense(DialogsContainer)}/>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/news/*" element={<News/>}/>
                        <Route path="/music/*" element={<Music/>}/>
                        <Route path="/settings/*" element={<Settings/>}/>
                        <Route path="/friends/*" element={<Friends/>}/>
                        <Route path="/users/*" element={withSuspense(UsersPage)}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        );

    }
}
let MapStateToProps=(state:AppStateType)=>{
    return {
        InitializationComplete: state.app.InitializationComplete,
        globalErrorText:state.app.globalErrorText
    }
}
const ContainerApp = compose<ComponentType>(
    connect<MapStatePropsType,MapDispatchPropsType, {},AppStateType>(MapStateToProps,{initializeApp,globalError})
)(App);

const SocialNetworkApp:React.FC=()=>{

    return <BrowserRouter  basename="/losev-social-network" >
        <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Provider store={store}>
            <ContainerApp />
        </Provider>
        </QueryParamProvider>
    </BrowserRouter>
}
export default SocialNetworkApp;



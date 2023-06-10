import React from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends'
import {Route, Routes} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./HOC/withRouter";
import {initializeApp} from "./Redux/App-reducer";
import Preloader from "./components/Common/Preloader/Preloader";


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }
    render() {

        if (!this.props.InitializationComplete) {return <Preloader/>}
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/news/*" element={<News/>}/>
                        <Route path="/music/*" element={<Music/>}/>
                        <Route path="/settings/*" element={<Settings/>}/>
                        <Route path="/friends/*" element={<Friends/>}/>
                        <Route path="/users/*" element={<UsersContainer/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );

    }
}
let MapStateToProps=(state)=>{
    return {
        InitializationComplete: state.app.InitializationComplete
    }
}
export default compose(
    withRouter,
    connect(MapStateToProps,{initializeApp})
)(App);
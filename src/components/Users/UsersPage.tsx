import React from "react";
import {useSelector} from "react-redux";
import {Users} from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {getIsFetchingSelector} from "../../Redux/Users-selectors";
import {AppStateType} from "../../Redux/redux-store";
import {Navigate} from "react-router-dom";

const UsersPage: React.FC = (props) => {
    let isAuth = useSelector
    ((state: AppStateType) => state.auth.isAuth)
    let isFetching = useSelector(getIsFetchingSelector)
    return( <div>
        {!isAuth&&<Navigate to={"/login"}/>}
        {isFetching&&<Preloader/>}
        <Users />
        </div> )
    }
export default UsersPage
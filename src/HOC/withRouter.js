import React from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom"

export const withRouter = (Component) => {

    let WithUrlDataContainerComponent = (props) => {
        let params = useParams();
        let location = useLocation();
        let navigation = useNavigate();
        return <Component {...props} router={{params, location, navigation}}/>
    }
    return WithUrlDataContainerComponent;
}
import React, {ComponentType} from "react";
import {useLocation, useParams} from "react-router-dom"


export type ParamsType={
    router:{
        params: { userId:string }
    }
}
export function withRouter<WP extends ParamsType> (Component:ComponentType<WP>) {

    let WithUrlDataContainerComponent:React.FC<Omit<WP,"ParamsType">> = (props) => {
        let params = useParams();
        let location = useLocation();

        return <Component {...props as WP} router={{params,location}}/>
    }
    return WithUrlDataContainerComponent;
}


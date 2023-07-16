import React from 'react'
import s from './Message.module.css'
import {MessagesType} from "../../../types/types";

const Message:React.FC<MessagesType> = React.memo(props => {

    return (
        <div>
            {props.message}
        </div>
    );
}
);

export default Message
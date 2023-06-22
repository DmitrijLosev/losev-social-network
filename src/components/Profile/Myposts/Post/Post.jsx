import s from './Post.module.css';
import React from "react";

const Post = React.memo(props => {
        return (

            <div>
                <div className={s.item}>
                    <img
                        src='data:image/jpeg;base64,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'></img>
                    {props.message}
                    <div><span>like {props.like}</span></div>
                </div>
            </div>
        );
    }
);


export default Post;
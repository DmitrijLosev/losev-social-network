import s from './Post.module.css';
import React from "react";
import UserMock from './../../../../assets/images/UserMock.png'

type PropsType = {
    post: string
    like: number
    photo: string | null | undefined
    id: number
    deleteChoosedPost: (id: number) => void
    likedPost: boolean
    likeOrDislikePost: (id: number) => void
    idAuth:number|null
    idProfile:number | null | undefined
}

const Post: React.FC<PropsType> = React.memo(props => {

        const deletePost = (event: React.MouseEvent<HTMLButtonElement>) => {
            props.deleteChoosedPost(props.id);
        }

        const onClickLikePost = (event: React.MouseEvent<HTMLButtonElement>) => {
            props.likeOrDislikePost(props.id)
        }

        return (

            <div>
                <div className={s.item}>
                    <img
                        src={props.idAuth===props.idProfile&&props.photo ? props.photo : UserMock}></img>
                    <b>{props.post}</b>
                    <button
                        key={props.id}
                        onClick={deletePost}>
                        Delete post
                    </button>
                    <div><span>
                            <span className={props.likedPost ? s.liked : ''}>likes {props.like} </span>
                        <button
                        key={props.id}
                            onClick={onClickLikePost}>
                            {!props.likedPost ? "Like post" : "Dislike post"}
                </button>
                    </span></div>
                </div>
            </div>
        );
    }
);


export default Post;

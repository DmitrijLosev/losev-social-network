import React from 'react';
import s from './Myposts.module.css';
import Post from './Post/Post'
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {FieldForm, Textarea} from "../../Common/FormsControls/FormsControls";
import {MapDispatchStatePropsType, MapStatePropsType} from "./MypostsContainer";

let maxLength15=maxLengthCreator(15)

const Myposts:React.FC<MapStatePropsType&MapDispatchStatePropsType> = (props) => {

    let postsElements = props.posts.map(p =>
        <Post key={p.id} message={p.post} like={p.likesCount}/>)

    const onSubmit=(formData:formDataNewPostType)=>{
        props.addPost(formData.NewPostText)}

    const NewPostForm:React.FC<InjectedFormProps<formDataNewPostType > >=(props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
                {FieldForm<keyof formDataNewPostType>('New Post','NewPostText','',Textarea,
                    [required,maxLength15])}
            <div>
                <button>Add post</button>
            </div>
        </form>)
    };

const NewPostReduxForm=
    reduxForm<formDataNewPostType>({form:'NewPost'})(NewPostForm);



    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <NewPostReduxForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default Myposts;

type formDataNewPostType={
    NewPostText:string
}

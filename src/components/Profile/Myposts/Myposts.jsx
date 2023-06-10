import React from 'react';
import s from './Myposts.module.css';
import Post from './Post/Post.jsx'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {Textarea} from "../../Common/FormsControls/FormsControls";

let maxLength15=maxLengthCreator(15)
const Myposts = (props) => {

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.post} like={p.likesCount}/>)

    const onSubmit=(formData)=>{
        props.addPost(formData.NewPostText)}

    const NewPostForm=(props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='New Post' name='NewPostText' component={Textarea}
                       validate={[required,maxLength15 ]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>)
    };

const NewPostReduxForm=reduxForm({form:'NewPost'})(NewPostForm);



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

import ProfileReducer, {addPost, deletePost} from "./Profile-reducer";

let state={
    posts: [
        {id: 1, post: 'Hey, how are u?', likesCount: 13},
        {id: 2, post: 'It is my first post!', likesCount: 22},
        {id: 3, post: 'HAHAHAHAH', likesCount: 77},
        {id: 4, post: 'BLALBLAL', likesCount: 11},
        {id: 5, post: 'YOYOYO', likesCount: 3}]};

it('should lenght after post delete id 10', function () {
    let action = deletePost(10)
    let newState = ProfileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})
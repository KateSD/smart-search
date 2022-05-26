import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const loadPosts = createAsyncThunk(
    "posts/load",
    async (dispatch, getState) => {
        return await fetch("http://localhost:5001/getPosts")
            .then((res) => res.json())
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: null
    },
    reducers:{
        edit(state, action){
            const {id, title, body}=action.payload
            const currentPost = state.posts.find(post=>post.id===id)
            if(currentPost){
                currentPost.title=title
                currentPost.body=body
                currentPost.userId=1
                currentPost.isSelected=true
            }
        }
    },
    extraReducers: {
        [loadPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.posts = action.payload
        },
        [loadPosts.rejected]: (state, action) => {
            state.status = 'failed'
        },
    }
})

export const {edit} = postsSlice.actions
export default postsSlice.reducer;

export const selectAllPosts = state=> state.posts
export const selectPostById = (state, postId)=> state.posts.find(post=>post.id===postId)

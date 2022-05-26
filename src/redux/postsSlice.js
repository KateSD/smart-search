import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

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


export default postsSlice.reducer;

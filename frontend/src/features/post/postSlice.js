import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts: [],
    post: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    msg: '',
}

export const getPosts = createAsyncThunk('auth/getAll', async (_, thunkAPI) => {
    try {
        return await postService.getPosts();
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const createPost = createAsyncThunk('auth/create', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.createPost(postData, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const deletePost = createAsyncThunk('auth/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.deletePost(id, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.msg = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = [...state.posts, action.payload]
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(post => post._id !== action.payload._id);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
    }
})

export const { reset } = postSlice.actions;
export default postSlice.reducer;

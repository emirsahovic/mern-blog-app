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
    }
})

export const { reset } = postSlice.actions;
export default postSlice.reducer;

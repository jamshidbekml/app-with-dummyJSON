import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage, withToken } from '../../utils'
import axios from 'axios'
import { IPost, PostsResponse } from '../../types'

interface State {
	postsLoading: boolean
	postsError?: any
	posts: PostsResponse
	singlePostLoading: boolean
	singlePostError?: any
	singlePost?: IPost
}

const initialState: State = {
	postsLoading: false,
	postsError: undefined,
	posts: { posts: [], limit: 0, skip: 0, total: 0 },
	singlePostLoading: false,
	singlePostError: undefined,
	singlePost: undefined
}

export const fetchPosts = createAsyncThunk('post/all', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get(`/posts?limit=5&skip=0`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchMorePosts = createAsyncThunk('posts/more', async (page: number, thunkAPI) => {
	try {
		const { data } = await axios.get(`/posts?limit=5&skip=${page * 5}`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchSinglePost = createAsyncThunk('post/single', async (id: number, thunkAPI) => {
	try {
		const { data } = await axios.get(`/posts/${id}`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			state.postsLoading = true
			state.postsError = undefined
		})
		builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsResponse>) => {
			state.postsLoading = false
			state.posts = action.payload
		})
		builder.addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
			state.postsLoading = false
			state.postsError = action.payload
		})
		builder.addCase(fetchMorePosts.fulfilled, (state, action: PayloadAction<PostsResponse>) => {
			state.posts.posts = [...state.posts.posts, ...action.payload.posts]
			state.posts.limit = action.payload.limit
			state.posts.skip = action.payload.skip
			state.posts.total = action.payload.total
		})
		builder.addCase(fetchMorePosts.rejected, (state, action: PayloadAction<any>) => {
			state.postsError = action.payload
		})
		builder.addCase(fetchSinglePost.pending, state => {
			state.singlePostLoading = true
			state.singlePostError = undefined
		})
		builder.addCase(fetchSinglePost.fulfilled, (state, action: PayloadAction<IPost>) => {
			state.singlePostLoading = false
			state.singlePost = action.payload
		})
		builder.addCase(fetchSinglePost.rejected, (state, action: PayloadAction<any>) => {
			state.singlePostLoading = false
			state.singlePostError = action.payload
		})
	}
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage, withToken } from '../../utils'
import axios from 'axios'
import { IUser, PostsResponse, TodosResponse, UsersResponse } from '../../types'

interface State {
	usersLoading: boolean
	usersError?: any
	users: UsersResponse
	singleUser?: IUser
	singleUserLoading: boolean
	singleUserError?: any
	loading: boolean
	error?: any
	me: any
	userPosts: PostsResponse
	userTodos: TodosResponse
}

const initialState: State = {
	usersLoading: false,
	usersError: undefined,
	users: { users: [], limit: 0, total: 0, skip: 0 },
	userPosts: { posts: [], limit: 0, skip: 0, total: 0 },
	userTodos: { todos: [], limit: 0, total: 0, skip: 0 },
	singleUser: undefined,
	singleUserLoading: false,
	singleUserError: undefined,
	loading: false,
	error: undefined,
	me: JSON.parse(localStorage.getItem('user') || '{}')
}

export const fetchUsers = createAsyncThunk('user/all', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/users?limit=5&skip=0')

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchMoreUsers = createAsyncThunk('user/more', async (page: number, thunkAPI) => {
	try {
		const { data } = await axios.get(`/users?limit=5&skip=${page * 5}`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchSingleUser = createAsyncThunk('user/single', async (id: number, thunkAPI) => {
	try {
		const { data } = await axios.get(`/users/${id}`)
		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const getMe = createAsyncThunk('user/me', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/user/me', withToken())

		localStorage.setItem('user', data)
		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchUserPosts = createAsyncThunk('user/posts', async (id: string, thunkAPI) => {
	try {
		const { data } = await axios.get(`/users/${id}/posts`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchUserTodos = createAsyncThunk('user/todos', async (id: string, thunkAPI) => {
	try {
		const { data } = await axios.get(`/users/${id}/todos`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchUsers.pending, state => {
			state.usersLoading = true
			state.usersError = undefined
		})
		builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
			state.usersLoading = false
			state.users = action.payload
		})
		builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
			state.usersLoading = false
			state.usersError = action.payload
		})
		builder.addCase(fetchMoreUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
			state.users.users = [...state.users.users, ...action.payload.users]
			state.users.limit = action.payload.limit
			state.users.skip = action.payload.skip
			state.users.total = action.payload.total
		})
		builder.addCase(fetchMoreUsers.rejected, (state, action: PayloadAction<any>) => {
			state.usersLoading = false
			state.usersError = action.payload
		})
		builder.addCase(fetchSingleUser.pending, state => {
			state.singleUserLoading = true
			state.singleUserError = undefined
		})
		builder.addCase(fetchSingleUser.fulfilled, (state, action: PayloadAction<any>) => {
			state.singleUserLoading = false
			state.singleUser = action.payload
		})
		builder.addCase(fetchSingleUser.rejected, (state, action: PayloadAction<any>) => {
			state.singleUserLoading = false
			state.singleUserError = action.payload
		})
		builder.addCase(getMe.pending, state => {
			state.loading = true
			state.error = undefined
		})
		builder.addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
			state.loading = false
			state.me = action.payload
		})
		builder.addCase(getMe.rejected, (state, action: PayloadAction<any>) => {
			state.loading = false
			state.error = action.payload
		})
		builder.addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<any>) => {
			state.userPosts = action.payload
		})
		builder.addCase(fetchUserTodos.fulfilled, (state, action: PayloadAction<any>) => {
			state.userTodos = action.payload
		})
	}
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer

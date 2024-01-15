import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../utils'
import axios from 'axios'

const initialState = {
	todosLoading: false,
	todosError: undefined,
	todos: [],
	singleTodoLoading: false,
	singleTodoError: undefined,
	singleTodo: undefined,
	randomTodoLoading: false,
	randomTodoError: undefined,
	randomTodo: undefined
}

export const fetchTodos = createAsyncThunk('todo/all', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/todos')

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchSingleTodo = createAsyncThunk('todo/single', async (id: number, thunkAPI) => {
	try {
		const { data } = await axios.get(`/todod/${id}`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const getRandomTodo = createAsyncThunk('todo/random', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/todos/random')

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

const todosSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchTodos.pending, state => {
			state.todosLoading = true
			state.todosError = undefined
		})
		builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<any>) => {
			state.todosLoading = false
			state.todos = action.payload
		})
		builder.addCase(fetchTodos.rejected, (state, action: PayloadAction<any>) => {
			state.todosLoading = false
			state.todosError = action.payload
		})
		builder.addCase(fetchSingleTodo.pending, state => {
			state.singleTodoLoading = true
			state.singleTodoError = undefined
		})
		builder.addCase(fetchSingleTodo.fulfilled, (state, action: PayloadAction<any>) => {
			state.singleTodoLoading = false
			state.singleTodo = action.payload
		})
		builder.addCase(fetchSingleTodo.rejected, (state, action: PayloadAction<any>) => {
			state.singleTodoLoading = false
			state.singleTodoError = action.payload
		})
		builder.addCase(getRandomTodo.pending, state => {
			state.randomTodoLoading = true
			state.randomTodoError = undefined
		})
		builder.addCase(getRandomTodo.fulfilled, (state, action: PayloadAction<any>) => {
			state.randomTodoLoading = false
			state.randomTodo = action.payload
		})
		builder.addCase(getRandomTodo.rejected, (state, action: PayloadAction<any>) => {
			state.randomTodoLoading = false
			state.randomTodoError = action.payload
		})
	}
})

export const todosActions = todosSlice.actions
export const todosReducer = todosSlice.reducer

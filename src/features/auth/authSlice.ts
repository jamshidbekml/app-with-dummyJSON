import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../utils'
import axios from 'axios'

const initialState = {
	loading: false,
	error: undefined,
	token: localStorage.getItem('token') || ''
}

export const login = createAsyncThunk('auth', async (options: { username: string; password: string }, thunkAPI) => {
	try {
		const { data } = await axios.post(`/auth/login`, options)
		localStorage.setItem('token', data.token)
		return data.token
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout() {
			localStorage.clear()
		}
	},
	extraReducers: builder => {
		builder.addCase(login.pending, state => {
			state.loading = true
			state.error = undefined
		})
		builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
			state.loading = false
			state.token = action.payload
		})
		builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
			state.loading = false
			state.error = action.payload
		})
	}
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer

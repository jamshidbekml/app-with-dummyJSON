import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth/authSlice'
import { usersReducer } from '../features/user/usersSlice'
import { postsReducer } from '../features/posts/postsSlice'
import { todosReducer } from '../features/todos/todosSlice'
import { productsReducer } from '../features/products/productsSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	users: usersReducer,
	posts: postsReducer,
	todos: todosReducer,
	products: productsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

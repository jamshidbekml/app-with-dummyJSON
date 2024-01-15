import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useMemo } from 'react'
import { login } from '../features/auth/authSlice'
import {
	fetchUsers,
	fetchSingleUser,
	fetchMoreUsers,
	fetchUserPosts,
	fetchUserTodos
} from '../features/user/usersSlice'
import { fetchMorePosts, fetchPosts, fetchSinglePost } from '../features/posts/postsSlice'
import { fetchTodos, fetchSingleTodo, getRandomTodo } from '../features/todos/todosSlice'
import {
	fetchProducts,
	fetchProductCategories,
	fetchProductsByCategory,
	fetchSingleProduct,
	fetchMoreProducts
} from '../features/products/productsSlice'

const actions = {
	login,
	fetchUsers,
	fetchSingleUser,
	fetchPosts,
	fetchMorePosts,
	fetchSinglePost,
	fetchTodos,
	fetchSingleTodo,
	getRandomTodo,
	fetchProducts,
	fetchProductCategories,
	fetchProductsByCategory,
	fetchSingleProduct,
	fetchMoreProducts,
	fetchMoreUsers,
	fetchUserPosts,
	fetchUserTodos
}

const useActions = function () {
	const dispatch = useDispatch()
	return useMemo(() => {
		return bindActionCreators(actions, dispatch)
	}, [dispatch])
}

export default useActions

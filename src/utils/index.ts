import axios from 'axios'
import { toast } from 'react-toastify'

export function getErrorMessage(e: any) {
	const { response = {} } = e
	const { data = {} } = response
	const { message = 'Internal server error!' } = data
	return message
}

export const notify = (message: string, type: string) => {
	if (type === 'success') {
		return toast.success(message, {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: 4000
		})
	} else if (type === 'error') {
		return toast.error(message, {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: 4000
		})
	}
}

export function withToken() {
	const { token } = JSON.parse(localStorage.getItem('user') || '{}')
	return {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token || ''}`
		}
	}
}

axios.defaults.baseURL = 'https://dummyjson.com'

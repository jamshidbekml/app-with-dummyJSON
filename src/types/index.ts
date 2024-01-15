export interface IPost {
	id: number
	title: string
	body: string
	userId: number
	tags: string[]
	reactions: number
}

export interface PostsResponse {
	posts: IPost[]
	total: number
	skip: number
	limit: number
}

export interface IProduct {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: string[]
}

export interface ProductsResponse {
	products: IProduct[]
	total: number
	skip: number
	limit: number
}

export interface IUser {
	id: number
	firstName: string
	lastName: string
	maidenName: string
	age: number
	gender: string
	email: string
	phone: string
	username: string
	password: string
	birthDate: string
	image: string
	bloodGroup: string
	height: number
	weight: number
	eyeColor: string
	hair: {
		color: string
		type: string
	}
	domain: string
	ip: string
	address: {
		address: string
		city: string
		coordinates: {
			lat: number
			lng: number
		}
		postalCode: string
		state: string
	}
	macAddress: string
	university: string
	bank: {
		cardExpire: string
		cardNumber: string
		cardType: string
		currency: string
		iban: string
	}
	company: {
		address: {
			address: string
			city: string
			coordinates: {
				lat: number
				lng: number
			}
			postalCode: '37076'
			state: 'TN'
		}
		department: string
		name: string
		title: string
	}
	ein: string
	ssn: string
	userAgent: string
}

export interface UsersResponse {
	users: IUser[]
	total: number
	skip: number
	limit: number
}

export interface ITodo {
	id: number
	todo: string
	completed: boolean
	userId: number
}

export interface TodosResponse {
	todos: ITodo[]
	total: number
	skip: number
	limit: number
}

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../utils'
import axios from 'axios'
import { IProduct, ProductsResponse } from '../../types'

interface State {
	productsLoading: boolean
	productsError?: any
	products: ProductsResponse
	singleProductLoading: boolean
	singleProductError?: any
	singleProduct?: IProduct
	productsByCategoryLoading: boolean
	productsByCategoryError?: any
	productsByCategory?: ProductsResponse
	productCategoriesLoading: boolean
	productCategoriesError?: any
	productCategories: string[]
}

const initialState: State = {
	productsLoading: false,
	productsError: undefined,
	products: { products: [], limit: 0, skip: 0, total: 0 },
	singleProductLoading: false,
	singleProductError: undefined,
	singleProduct: undefined,
	productsByCategoryLoading: false,
	productsByCategoryError: undefined,
	productsByCategory: { products: [], limit: 0, skip: 0, total: 0 },
	productCategoriesLoading: false,
	productCategoriesError: undefined,
	productCategories: []
}

export const fetchProducts = createAsyncThunk('product/all', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/products?limit=8&skip=0')

		return data
	} catch (e) {
		const messsage = getErrorMessage(e)
		return thunkAPI.rejectWithValue(messsage)
	}
})

export const fetchMoreProducts = createAsyncThunk('product/more', async (page: number, thunkAPI) => {
	try {
		console.log(page)

		const { data } = await axios.get(`/products?limit=8&skip=${page * 8}`)

		return data
	} catch (e) {
		const messsage = getErrorMessage(e)
		return thunkAPI.rejectWithValue(messsage)
	}
})

export const fetchSingleProduct = createAsyncThunk('product/single', async (id: number, thunkAPI) => {
	try {
		const { data } = await axios.get(`/products/${id}`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchProductsByCategory = createAsyncThunk('product/by-category', async (category: string, thunkAPI) => {
	try {
		const { data } = await axios.get(`/products/category/${category}`)

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

export const fetchProductCategories = createAsyncThunk('product/categories', async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/product/categories')

		return data
	} catch (e) {
		const message = getErrorMessage(e)
		return thunkAPI.rejectWithValue(message)
	}
})

const productsSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, state => {
			state.productsLoading = true
			state.productsError = undefined
		})
		builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
			state.productsLoading = false
			state.products = action.payload
		})
		builder.addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
			state.productsLoading = false
			state.productsError = action.payload
		})
		builder.addCase(fetchMoreProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
			state.products.products = [...state.products.products, ...action.payload.products]
			state.products.limit = action.payload.limit
			state.products.skip = action.payload.skip
			state.products.total = action.payload.total
		})
		builder.addCase(fetchMoreProducts.rejected, (state, action: PayloadAction<any>) => {
			state.productsLoading = false
			state.productsError = action.payload
		})
		builder.addCase(fetchSingleProduct.pending, state => {
			state.singleProductLoading = true
			state.singleProductError = undefined
		})
		builder.addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
			state.singleProductLoading = false
			state.singleProduct = action.payload
		})
		builder.addCase(fetchSingleProduct.rejected, (state, action: PayloadAction<any>) => {
			state.singleProductLoading = false
			state.singleProductError = action.payload
		})
		builder.addCase(fetchProductsByCategory.pending, state => {
			state.productsByCategoryLoading = true
			state.productsByCategoryError = undefined
		})
		builder.addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
			state.productsByCategoryLoading = false
			state.products = action.payload
		})
		builder.addCase(fetchProductsByCategory.rejected, (state, action: PayloadAction<any>) => {
			state.productsByCategoryLoading = false
			state.productsByCategoryError = action.payload
		})
		builder.addCase(fetchProductCategories.pending, state => {
			state.productCategoriesLoading = true
			state.productCategoriesError = undefined
		})
		builder.addCase(fetchProductCategories.fulfilled, (state, action: PayloadAction<any>) => {
			state.productCategoriesLoading = false
			state.productCategories = action.payload
		})
		builder.addCase(fetchProductCategories.rejected, (state, action: PayloadAction<any>) => {
			state.productCategoriesLoading = false
			state.productCategoriesError = action.payload
		})
	}
})

export const productsActions = productsSlice.actions
export const productsReducer = productsSlice.reducer

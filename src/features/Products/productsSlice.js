import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsAPI from "../../api/products/productsApi";

export const getProducts = createAsyncThunk(
	"products/getProducts",
	async () => {
		const products = await productsAPI.getProducts();
		return products.data;
	}
);

export const getProduct = createAsyncThunk(
	"products/getProduct",
	async (id) => {
		const product = await productsAPI.getProduct(id);
		return product.data;
	}
);

export const getProductsByCategory = createAsyncThunk(
	"products/getProductsByCategory",
	async (category) => {
		const products = await productsAPI.getProductsByCategory(category);
		return products.data;
	}
);

const initialState = {
	products: [],
	loadingProducts: false,
	product: {},
	loadingProduct: false,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: {
		[getProducts.pending]: (state) => {
			state.loadingProducts = true;
		},

		[getProducts.fulfilled]: (state, action) => {
			state.products = action.payload;
			state.loadingProducts = false;
		},

		[getProduct.pending]: (state) => {
			state.loadingProduct = true;
		},

		[getProduct.fulfilled]: (state, action) => {
			state.product = action.payload;
			state.loadingProduct = false;
		},

		[getProductsByCategory.pending]: (state) => {
			state.loadingProducts = true;
		},

		[getProductsByCategory.fulfilled]: (state, action) => {
			state.products = action.payload;
			state.loadingProducts = false;
		},
	},
});

export const { filterProductsByPrice, searchProductsByTitle } =
	productsSlice.actions;
export default productsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../features/Products/productsSlice";
import CartReducer from "../features/Cart/CartSlice";
import UserReducer from "../store/UserSlice";

const store = configureStore({
	reducer: {
		products: ProductsReducer,
		cart: CartReducer,
		user: UserReducer,
	},
});

export default store;

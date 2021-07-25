import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const quantity = action.payload.quantity;
			console.log(quantity);
			const id = action.payload.id;

			const indexProduct = state.findIndex((product) => product.id === id);

			// Product existed
			if (indexProduct !== -1) {
				if (!quantity) {
					state[indexProduct].quantity += 1;
				} else {
					state[indexProduct].quantity += quantity;
				}
			}
			// Product does not exist
			else {
				state.push({ ...action.payload, quantity: 1 });
			}
		},

		removeFromCart: (state, action) => {
			return state.filter((product) => {
				return product.id !== action.payload;
			});
		},

		increaseQuantity: (state, action) => {
			const id = action.payload;

			const indexProduct = state.findIndex((product) => product.id === id);

			state[indexProduct].quantity += 1;
		},

		decreaseQuantity: (state, action) => {
			const id = action.payload;

			const indexProduct = state.findIndex((product) => product.id === id);

			state[indexProduct].quantity -= 1;

			// Remove product if quantity < 1
			if (state[indexProduct].quantity < 1) {
				state.splice(indexProduct, 1);
			}
		},

		emptyCart: (state) => [],
	},
});

export const {
	addToCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	emptyCart,
} = CartSlice.actions;
export default CartSlice.reducer;

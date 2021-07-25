import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserActive: (state, action) => {
			state.user = action.payload;
		},
		setUserInActive: (state) => {
			state.user = null;
		},

		setUserPhone: (state, action) => {
			state.user.phone = action.payload;
		},

		setUserUsername: (state, action) => {
			state.user.username = action.payload;
		},
	},
});

export const { setUserActive, setUserInActive, setUserPhone, setUserUsername } =
	UserSlice.actions;
export default UserSlice.reducer;

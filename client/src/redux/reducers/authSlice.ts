import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TAuth = {
	accessToken: string;
};

const initialState: TAuth = {
	accessToken: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string>) => {
			const { payload } = action;
			console.log("token store updated");
			return { ...state, accessToken: payload };
		},
		removeAccessToken: (state) => {
			return { ...state, accessToken: "" };
		},
	},
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;

export const authReducer = authSlice.reducer;

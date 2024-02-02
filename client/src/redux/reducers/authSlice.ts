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
			return { ...state, accessToken: payload };
		},
	},
});

export const { setAccessToken } = authSlice.actions;

export const authReducer = authSlice.reducer;

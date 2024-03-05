import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserProfile } from "./userSlice";

// type TModalProfile=Omit<TUserProfile,'uid'>
const initialState: TUserProfile = {
	name: "",
	email: "",
	email_verified: false,
	profilePicUrl: "",
	status: "",
	uid: "",
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModalProfile: (state, action: PayloadAction<TUserProfile>) => {
			const { payload } = action;
			console.log("setUser triggered!!!");
			return { ...state, ...payload };
		},

		removeModalProfile: (state) => {
			return { ...state, ...initialState };
		},
	},
});

export const { setModalProfile, removeModalProfile } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

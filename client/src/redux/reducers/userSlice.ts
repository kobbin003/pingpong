import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TUserProfile = {
	name: string | null;
	email: string | null;
	email_verified: boolean;
	profilePicUrl: string | null;
	status: string | null;
	uid: string;
};
const initialState: TUserProfile = {
	name: "",
	email: "",
	email_verified: false,
	profilePicUrl: "",
	status: "",
	uid: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TUserProfile>) => {
			const { payload } = action;
			return { ...state, ...payload };
		},
		updateUser: (state, action: PayloadAction<Partial<TUserProfile>>) => {
			const { payload } = action;
			console.log("updateUserS", payload);
			return { ...state, ...payload };
		},

		removeUser: () => {
			return initialState;
		},
	},
});

export const { setUser, updateUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

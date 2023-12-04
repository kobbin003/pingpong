import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserType = {
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	uid: string;
	// firestoreUserDocId?: string;
	// currency: string;
};

const initialState: UserType = {
	displayName: "",
	email: "",
	phoneNumber: "",
	photoURL: "",
	uid: "",
	// firestoreUserDocId: "",
	// currency: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserType>) => {
			const { payload } = action;
			return { ...state, ...payload };
		},
		updateUser: (state, action: PayloadAction<Partial<UserType>>) => {
			const { payload } = action;
			console.log("updateUserS", payload);
			return { ...state, ...payload };
		},
		removeUser: () => {
			return initialState;
		},
	},
});

export const { setUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;

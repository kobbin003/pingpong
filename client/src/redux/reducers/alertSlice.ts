import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AlertsType = {
	errorMessage: string;
	successMessage: string;
	isLoading: boolean;
};

const initialState: AlertsType = {
	errorMessage: "",
	successMessage: "",
	isLoading: false,
};

export const alertSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		setErrorMsg: (state, action: PayloadAction<string>) => {
			console.log("setsuccesmessage called");
			state.errorMessage = action.payload;
		},
		setSuccessMsg: (state, action: PayloadAction<string>) => {
			state.successMessage = action.payload;
		},
		emptyErrorMsg: (state) => {
			state.errorMessage = "";
		},
		emptySuccessMsg: (state) => {
			state.successMessage = "";
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const {
	setErrorMsg,
	setSuccessMsg,
	emptyErrorMsg,
	emptySuccessMsg,
	setIsLoading,
} = alertSlice.actions;

export const alertReducer = alertSlice.reducer;

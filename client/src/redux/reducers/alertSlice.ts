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
			return { ...state, errorMessage: action.payload };
		},
		setSuccessMsg: (state, action: PayloadAction<string>) => {
			return { ...state, successMessage: action.payload };
		},
		emptyErrorMsg: (state) => {
			return { ...state, errorMessage: "" };
		},
		emptySuccessMsg: (state) => {
			return { ...state, successMessage: "" };
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			return { ...state, isLoading: action.payload };
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

import {
	BaseQueryFn,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
import { TError } from "../types/error";

// Define a service using a base URL and expected endpoints
export const welcomeApi = createApi({
	reducerPath: "welcomeApi",
	// baseQuery: fetchBaseQuery({ baseUrl: VITE_BASE_URL }),
	baseQuery: fetchBaseQuery({ baseUrl: VITE_BASE_URL }) as BaseQueryFn<
		string | FetchArgs,
		unknown,
		TError,
		{}
	>,
	endpoints: (builder) => ({
		getWelcome: builder.query<any, void>({
			query: () => ({ url: "/welcome" }),
			// keepUnusedDataFor: 10,

			// query: () => `welcome`,
		}),
	}),
});

export const { useGetWelcomeQuery, useLazyGetWelcomeQuery } = welcomeApi;

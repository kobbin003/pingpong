import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
// import { BASE_URL } from "../utils/env";

// Define a service using a base URL and expected endpoints
export const welcomeApi = createApi({
	reducerPath: "welcomeApi",
	baseQuery: fetchBaseQuery({ baseUrl: VITE_BASE_URL }),
	endpoints: (builder) => ({
		getWelcome: builder.query<any, void>({
			query: () => `welcome`,
		}),
	}),
});

export const { useGetWelcomeQuery } = welcomeApi;

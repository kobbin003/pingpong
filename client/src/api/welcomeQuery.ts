import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const welcomeApi = createApi({
	reducerPath: "welcomeApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (builder) => ({
		getWelcome: builder.query<any, void>({
			query: () => `welcome`,
		}),
	}),
});

export const { useGetWelcomeQuery } = welcomeApi;

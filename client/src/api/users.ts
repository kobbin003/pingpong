import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUserServer } from "../types/user";
import { VITE_SERVER_BASE_URL } from "../utils/env";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_SERVER_BASE_URL}/users` }),
	// tagTypes: ["user"],
	endpoints: (builder) => ({
		getUserProfile: builder.query<TUserServer, { accessToken: string }>({
			query: ({ accessToken }) => ({
				url: "profile",
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
		getUserByEmail: builder.query<TUserServer, { email: string }>({
			// query:()=>({})
			query: ({ email }) => ({ url: `/email?email=${email}` }),
			// providesTags: ["user"],
			keepUnusedDataFor: 1,
		}),
	}),
});

export const { useGetUserProfileQuery, useLazyGetUserByEmailQuery } = usersApi;

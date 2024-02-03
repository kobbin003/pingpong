import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUserServer } from "../types/user";
import { VITE_BASE_URL } from "../utils/env";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}/users` }),
	endpoints: (builder) => ({
		getUserProfile: builder.query<TUserServer, { accessToken: string }>({
			query: ({ accessToken }) => ({
				url: "profile",
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
	}),
});

export const { useGetUserProfileQuery } = usersApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUserServer } from "../types/user";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/users/" }),
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

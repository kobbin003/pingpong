import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
import { TChat } from "../types/chat";
import { TMessage } from "../types/message";

// Define a service using a base URL and expected endpoints
export const messageApi = createApi({
	reducerPath: "messageApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}/messages` }),
	endpoints: (builder) => ({
		createPost: builder.mutation<
			TMessage,
			{ accessToken: string; message: string; chatId: string }
		>({
			query: ({ accessToken, message, chatId }) => ({
				url: `?chatId=${chatId}`,
				// TODO chatId here.....
				method: "POST",
				body: { message },
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
	}),
});

export const { useCreatePostMutation } = messageApi;

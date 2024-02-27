import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
import { TMessage } from "../types/message";
import { MsgListItem } from "../context/SocketProvider";

// Define a service using a base URL and expected endpoints
export const messageApi = createApi({
	reducerPath: "messageApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}/messages` }),
	// tagTypes: ["message"],
	endpoints: (builder) => ({
		createPost: builder.mutation<
			TMessage,
			{ accessToken: string; message: string; chatId: string }
		>({
			query: ({ accessToken, message, chatId }) => ({
				url: `?chatId=${chatId}`,
				method: "POST",
				body: { message },
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
			// invalidatesTags: ["message"],
		}),
		createMultiplePost: builder.mutation<
			TMessage[],
			{ accessToken: string; messages: MsgListItem[]; chatId: string }
		>({
			query: ({ accessToken, messages, chatId }) => ({
				url: `multiple?chatId=${chatId}`,
				method: "POST",
				body: { messages },
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
			// invalidatesTags: ["message"],
		}),
		getUnreadMessages: builder.query<
			TMessage[],
			{ accessToken: string; chatId: string }
		>({
			query: ({ accessToken, chatId }) => ({
				url: `unread?chatId=${chatId}`,
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
	}),
});

export const {
	useCreatePostMutation,
	useCreateMultiplePostMutation,
	useGetUnreadMessagesQuery,
} = messageApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
import { TChat } from "../types/chat";
import { TMessage } from "../types/message";

// Define a service using a base URL and expected endpoints
export const chatsApi = createApi({
	reducerPath: "chatsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}/chats` }),
	tagTypes: ["message"],
	endpoints: (builder) => ({
		getUserChats: builder.query<TChat[], { accessToken: string }>({
			query: ({ accessToken }) => ({
				url: "",
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
		getMessageByChatId: builder.query<
			TMessage[],
			{ accessToken: string; chatId: string; offset: number; limit: number }
		>({
			query: ({ accessToken, chatId, offset, limit }) => ({
				url: `/${chatId}/messages?offset=${offset}&limit=${limit}`,
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
			keepUnusedDataFor: 1,
		}),
	}),
});

export const { useGetUserChatsQuery, useGetMessageByChatIdQuery } = chatsApi;

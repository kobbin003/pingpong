import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
import { TChat } from "../types/chat";
import { TMessage } from "../types/message";

// Define a service using a base URL and expected endpoints
export const chatsApi = createApi({
	reducerPath: "chatsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}/chats` }),
	endpoints: (builder) => ({
		getUserChats: builder.query<TChat[], { accessToken: string }>({
			query: ({ accessToken }) => ({
				url: "",
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
		getMessageByChatId: builder.query<
			TMessage[],
			{ accessToken: string; chatId: string }
		>({
			query: ({ accessToken, chatId }) => ({
				url: `/${chatId}/messages`,
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
		}),
	}),
});

export const { useGetUserChatsQuery, useGetMessageByChatIdQuery } = chatsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_SERVER_BASE_URL } from "../utils/env";
import { TRelation } from "../types/relation";

export const relationsApi = createApi({
	reducerPath: "relationsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_SERVER_BASE_URL}/relations/` }),
	tagTypes: ["Relations"],

	endpoints: (builder) => ({
		getRelationByStatus: builder.query<
			TRelation[],
			{ accessToken: string; status: string }
		>({
			query: ({ accessToken, status }) => ({
				url: `friends?status=${status}`,
				headers: { Authorization: `Bearer ${accessToken}` },
			}),

			providesTags: (_result, _error, { status }) => [
				{ type: "Relations", id: status },
			],
			// providesTags: ["Relations"],
			keepUnusedDataFor: 1,
		}),
		sendRequest: builder.mutation<
			TRelation,
			{ accessToken: string; recipientId: string }
		>({
			query: ({ accessToken, recipientId }) => ({
				url: `request`,
				method: "POST",
				body: {
					recipientId,
				},
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
			invalidatesTags: ["Relations"],
		}),
		handleFriendRequest: builder.mutation<
			TRelation,
			{ accessToken: string; relationId: string; isAccepted: boolean }
		>({
			query: ({ accessToken, relationId, isAccepted }) => ({
				method: "POST",
				url: isAccepted ? `accept/${relationId}` : `decline/${relationId}`,
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
			invalidatesTags: [
				{ type: "Relations", id: "accepted" },
				{ type: "Relations", id: "pending" },
			],
		}),
	}),
});

export const {
	useGetRelationByStatusQuery,
	useSendRequestMutation,
	// useAcceptRequestMutation,
	// useRejectRequestMutation,
	useHandleFriendRequestMutation,
} = relationsApi;

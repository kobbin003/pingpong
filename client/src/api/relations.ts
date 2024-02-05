import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VITE_BASE_URL } from "../utils/env";
import { TRelation } from "../types/relation";

export const relationsApi = createApi({
	reducerPath: "relationsApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}/relations/` }),
	endpoints: (builder) => ({
		getRelationByStatus: builder.query<
			TRelation[],
			{ accessToken: string; status: string }
		>({
			query: ({ accessToken, status }) => ({
				url: `friends?status=${status}`,
				headers: { Authorization: `Bearer ${accessToken}` },
			}),
			keepUnusedDataFor: 10,
		}),
	}),
});

export const { useGetRelationByStatusQuery } = relationsApi;

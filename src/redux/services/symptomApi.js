// --- FILE: /redux/services/symptomApi.js ---

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const symptomApi = createApi({
    reducerPath: 'symptomApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/symptoms`,
        credentials: 'include'
    }),
    prepareHeaders: (headers, { body }) => {
        // Skip setting content-type if it's FormData
        if (!(body instanceof FormData)) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    },
    tagTypes: ['SymptomReport'],
    endpoints: (builder) => ({
        // --- GPT Recommendation (POST) ---
        getGptRecommendation: builder.query({
            query: (body) => ({
                url: '/gpt',
                method: 'POST',
                body,
            }),
        }),

        // --- Save symptom report (POST) ---
        saveSymptomReport: builder.mutation({
            query: (body) => ({
                url: '/save',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SymptomReport'],
        }),

        // --- Get symptom history by pet ID (GET) ---
        getSymptomHistory: builder.query({
            query: (petId) => `/history/${petId}`,
            providesTags: ['SymptomReport'],
        }),
    }),
});

export const {
    useLazyGetGptRecommendationQuery,
    useSaveSymptomReportMutation,
    useGetSymptomHistoryQuery,
} = symptomApi;

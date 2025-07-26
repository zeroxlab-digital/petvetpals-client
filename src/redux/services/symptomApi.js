import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const symptomApi = createApi({
  reducerPath: 'symptomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/symptoms`,
    credentials: 'include',
  }),
  prepareHeaders: (headers, { body }) => {
    if (!(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
  tagTypes: ['SymptomReport'],
  endpoints: (builder) => ({
    // ✅ FIXED: GPT call should be a mutation
    getGptRecommendation: builder.mutation({
      query: (body) => ({
        url: '/gpt',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SymptomReport']
    }),

    saveSymptomReport: builder.mutation({
      query: (body) => ({
        url: '/save',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SymptomReport'],
    }),

    getSymptomHistory: builder.query({
      query: (petId) => `/history/${petId}`,
      providesTags: ['SymptomReport'],
    }),
  }),
});

export const {
  useGetSymptomHistoryQuery,
  useGetGptRecommendationMutation,
  useSaveSymptomReportMutation,
} = symptomApi;

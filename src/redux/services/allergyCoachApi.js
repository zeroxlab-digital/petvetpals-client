import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allergyCoachApi = createApi({
    reducerPath: 'allergyCoachApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/allergy-itch-coach`,
        credentials: 'include'
    }),
    prepareHeaders: (headers, { body }) => {
        if(!(body instanceof FormData)) {
            headers.set('Content-Type', 'applicationjson')
        }
        return headers;
    },
    tagTypes: ['AllergyCoach'],
    endpoints: (builder) => ({
        getAllergyCoachResponse: builder.mutation({
            query: (body) => ({
                url: '/gpt',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['AllergyCoach']
        }),
        saveAllergyReport: builder.mutation({
            query: ({ pet, episode }) => ({
                url: '/save',
                method: 'POST',
                body: { pet, episode }
            }),
            invalidatesTags: ['AllergyCoach']
        }),
        getAllergyItchReportHistory: builder.query({
            query: (petId) => `/history/${petId}`,
            providesTags: ['AllergyCoach'],
        })
    })
})

export const { useGetAllergyCoachResponseMutation, useSaveAllergyReportMutation, useGetAllergyItchReportHistoryQuery } = allergyCoachApi;
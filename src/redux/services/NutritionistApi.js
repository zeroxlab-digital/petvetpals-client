import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nutritionistApi = createApi({
    reducerPath: 'nutritionistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/nutritionist`,
        credentials: 'include'
    }),
    prepareHeaders: (headers, { body }) => {
        if(!(body instanceof FormData)) {
            headers.set('Content-Type', 'applicationjson')
        }
        return headers;
    },
    tagTypes: ['Nutritionist'],
    endpoints: (builder) => ({
        getNutritionistGpt: builder.mutation({
            query: (body) => ({
                url: '/ask-nutritionist',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Nutritionist']
        })
    })
})

export const { useGetNutritionistGptMutation } = nutritionistApi;
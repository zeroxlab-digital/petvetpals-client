import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
    reducerPath: "petApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/pet`,
        credentials: 'include'
    }),
    tagTypes: ["Pet"],
    endpoints: (build) => ({
        getPets: build.query({
            query: () => "/get-pets",
            providesTags: ["Pet"]
        })
    })
})

export const { useGetPetsQuery } = petApi;
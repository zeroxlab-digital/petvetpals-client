import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const vetApi = createApi({
    reducerPath: "vetApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/vet`,
        credentials: "include"
    }),
    tagTypes: ["Vet"],
    endpoints: (build) => ({
        loginVet: build.mutation({
            query: (vet) => ({
                url: "/login",
                method: "POST",
                body: vet
            }),
            invalidatesTags: "Vet"
        }),
        registerVet: build.mutation({
            query: (vet) => ({
                url: "/register",
                method: "POST",
                body: vet
            }),
            invalidatesTags: "Vet"
        }),
        getVetProfile: build.query({
            query: () => "/get-vet-profile",
            providesTags: "Vet"
        }),
        getAppointments: build.query({
            query: () => "/get-appointments",
            providesTags: "Vet"
        })
    })
})

export const { useLoginVetMutation, useRegisterVetMutation, useGetVetProfileQuery, useGetAppointmentsQuery } = vetApi;
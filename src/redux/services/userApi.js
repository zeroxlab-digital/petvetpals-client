import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/user`,
        credentials: 'include'
    }),
    tagTypes: ["User"],
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (user) => ({
                url: '/register',
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        signInUser: build.mutation({
            query: (user) => ({
                url: '/signin',
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        getUserDetails: build.query({
            query: () => '/user-details',
            providesTags: ["User"]
        }),
        updateUserDetails: build.mutation({
            query: (userProfile) => ({
                url: '/user-details',
                method: "PATCH",
                body: userProfile
            }),
            invalidatesTags: ["User"]
        })
    })
})

export const { useRegisterUserMutation, useGetUserDetailsQuery, useUpdateUserDetailsMutation } = userApi;
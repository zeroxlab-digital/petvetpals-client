import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
    reducerPath: "petApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/pet`,
        credentials: 'include'
    }),
    prepareHeaders: (headers, { body }) => {
        // Skip setting content-type if it's FormData
        if (!(body instanceof FormData)) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    },
    tagTypes: ["Pet"],
    endpoints: (build) => ({
        getPets: build.query({
            query: () => "/get-pets",
            providesTags: ["Pet"]
        }),
        addPet: build.mutation({
            query: (data) => ({
                url: '/add-pet',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Pet"]
        }),
        updateAPet: build.mutation({
            query: ({ id, formData }) => ({
                url: `/update-pet/${id}`,
                method: "PATCH",
                body: formData
            }),
            invalidatesTags: ["Pet"]
        }),
        getMedications: build.query({
            query: ({ petId }) => ({
                url: '/medications/get-medications',
                params: { petId }
            }),
            providesTags: ["Pet"]
        })
    })
})

export const { useGetPetsQuery, useAddPetMutation, useUpdateAPetMutation, useGetMedicationsQuery } = petApi;
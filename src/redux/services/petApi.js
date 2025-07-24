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
        }),
        addMedication: build.mutation({
            query: ({ petId, medicationData }) => ({
                url: '/medications/add-medication',
                method: "POST",
                params: { petId },
                body: { ...medicationData }
            }),
            invalidatesTags: ["Pet"]
        }),
        updateMedication: build.mutation({
            query: ({ medicationId, medicationData }) => ({
                url: `/medications/update-medication`,
                method: "PATCH",
                params: { id: medicationId },
                body: { ...medicationData }
            }),
            invalidatesTags: ["Pet"]
        }),
        deleteMedication: build.mutation({
            query: ({ medicationId }) => ({
                url: '/medications/delete-medication',
                method: "DELETE",
                params: { id: medicationId }
            }),
            invalidatesTags: ["Pet"]
        }),
        getMedicalHistory: build.query({
            query: ({ petId }) => ({
                url: '/health-record/get-medical-history',
                params: { petId }
            }),
            providesTags: ["Pet"]
        }),
        addMedicalHistory: build.mutation({
            query: ({ petId, medicalHistoryData }) => ({
                url: '/health-record/add-medical-history',
                method: "POST",
                params: { petId },
                body: {...medicalHistoryData}
            }),
            invalidatesTags: ["Pet"]
        }),
        getVaccinations: build.query({
            query: ({ petId }) => ({
                url: '/health-record/get-vaccinations',
                params: { petId }
            }),
            providesTags: ["Pet"]
        }),
        addVaccination: build.mutation({
            query: ({ petId, vaccinationData }) => ({
                url: '/health-record/add-vaccination',
                method: "POST",
                params: { petId },
                body: {...vaccinationData}
            }),
            invalidatesTags: ["Pet"]
        }),
        getAllergiesConditions: build.query({
            query: ({ petId}) => ({
                url: '/health-record/get-allergies-conditions',
                params: { petId }
            }),
            providesTags: ["Pet"]
        }),
        addAllergyCondition: build.mutation({
            query: ({ petId, data}) => ({
                url: '/health-record/add-allergy-condition',
                method: "POST",
                params: { petId },
                body: data
            })
        }),
        deleteAllergyCondition: build.mutation({
            query: ({ id, type }) => ({
                url: `/health-record/delete-allergy-condition`,
                params: { id },
                method: "DELETE",
                body: { type } // type can be 'allergy' or 'condition'
            })
        })
    })
})

export const { useGetPetsQuery, useAddPetMutation, useUpdateAPetMutation, useGetMedicationsQuery, useAddMedicationMutation, useUpdateMedicationMutation, useDeleteMedicationMutation, useGetMedicalHistoryQuery, useAddMedicalHistoryMutation, useGetVaccinationsQuery, useAddVaccinationMutation, useAddAllergyConditionMutation, useGetAllergiesConditionsQuery, useDeleteAllergyConditionMutation } = petApi;
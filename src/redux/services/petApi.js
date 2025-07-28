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
        getScheduledReminders: build.query({
            query: ({ petId }) => ({
                url: '/medications/get-scheduled-reminders',
                params: { petId }
            }),
            providesTags: ["Pet"]
        }),
        addMedScheduleReminder: build.mutation({
            query: ({ petId, formData }) => ({
                url: '/medications/add-schedule-reminder',
                method: 'POST',
                params: { petId },
                body: { ...formData },
            }),
            invalidatesTags: ['Pet'],
        }),
        deleteMedScheduledReminder: build.mutation({
            query: ({ id }) => ({
                url: '/medications/delete-scheduled-reminder',
                method: "DELETE",
                params: { id }
            }),
            invalidatesTags: ["Pet"]
        }),
        markGivenMedScheduledReminder: build.mutation({
            query: ({ id }) => ({
                url: '/medications/markgiven-scheduled-reminder',
                method: "PATCH",
                params: { id }
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
                body: { ...medicalHistoryData }
            }),
            invalidatesTags: ["Pet"]
        }),
        updateMedicalHistory: build.mutation({
            query: ({ recordId, medicalHistoryData }) => ({
                url: '/health-record/update-medical-history',
                method: "PATCH",
                params: { id: recordId },
                body: { ...medicalHistoryData }
            }),
            invalidatesTags: ["Pet"]
        }),
        deleteMedicalHistory: build.mutation({
            query: ({ medicalHistoryId }) => ({
                url: '/health-record/delete-medical-history',
                method: "DELETE",
                params: { id: medicalHistoryId }
            }),
            invalidatesTags: ["Pet"]
        })
        ,
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
                body: { ...vaccinationData }
            }),
            invalidatesTags: ["Pet"]
        }),
        updateVaccination: build.mutation({
            query: ({ vaccinationId, vaccinationData }) => ({
                url: '/health-record/update-vaccination',
                method: "PATCH",
                params: { id: vaccinationId },
                body: { ...vaccinationData }
            }),
            invalidatesTags: ["Pet"]
        }),
        deleteVaccination: build.mutation({
            query: ({ vaccinationId }) => ({
                url: '/health-record/delete-vaccination',
                method: "DELETE",
                params: { id: vaccinationId }
            }),
            invalidatesTags: ["Pet"]
        })
        ,
        getAllergiesConditions: build.query({
            query: ({ petId }) => ({
                url: '/health-record/get-allergies-conditions',
                params: { petId }
            }),
            providesTags: ["Pet"]
        }),
        addAllergyCondition: build.mutation({
            query: ({ petId, data }) => ({
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
                body: { type }
            })
        })
    })
})

export const { useGetPetsQuery, useAddPetMutation, useUpdateAPetMutation, useGetMedicationsQuery, useAddMedicationMutation, useUpdateMedicationMutation, useDeleteMedicationMutation, useGetScheduledRemindersQuery, useAddMedScheduleReminderMutation, useDeleteMedScheduledReminderMutation, useMarkGivenMedScheduledReminderMutation, useGetMedicalHistoryQuery, useAddMedicalHistoryMutation, useUpdateMedicalHistoryMutation, useDeleteMedicalHistoryMutation, useGetVaccinationsQuery, useAddVaccinationMutation, useUpdateVaccinationMutation, useDeleteVaccinationMutation, useAddAllergyConditionMutation, useGetAllergiesConditionsQuery, useDeleteAllergyConditionMutation } = petApi;
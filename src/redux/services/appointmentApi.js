import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
    reducerPath: "appointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/appointment`,
        credentials: "include" // This enables sending authentication cookies
    }),
    tagTypes: ["Appointment"],
    endpoints: (build) => ({
        getAppointments: build.query({
            query: () => "/view-appointments",
            providesTags: ["Appointment"]
        }),
        bookAppointment: build.mutation({
            query: ({id, date}) => ({
                url: `/book-appointment/${id}`,
                method: "POST",
                body: { date }
            }),
            invalidatesTags: ["Appointment"]
        }),
        updateAppointment: build.mutation({
            query: ({ id, ...updatedFields }) => ({
                url: `/update-appointment/${id}`,
                method: "PATCH",
                body: updatedFields
            }),
            invalidatesTags: ["Appointment"]
        }),
        deleteAppointment: build.mutation({
            query: (id) => ({
                url: `/delete-appointment/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Appointment"]
        })
    })
})

export const { useGetAppointmentsQuery, useBookAppointmentMutation, useUpdateAppointmentMutation, useDeleteAppointmentMutation } = appointmentApi;
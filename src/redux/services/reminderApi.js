import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reminderApi = createApi({
    reducerPath: 'reminderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE}/api/reminder`,
        credentials: 'include',
    }),
    prepareHeaders: (headers, { body }) => {
        if(!(body instanceof FormData)) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    },
    tagTypes: ['Reminder'],
    endpoints: (build) => ({
        scheduleReminder: build.mutation({
            query: (data) => ({
                url: '/schedule-reminder',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Reminder']
        })
    })
})

export const { useScheduleReminderMutation } = reminderApi;
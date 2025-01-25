import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "authUser",
    initialState: { authUser: null, appointments: [] },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setAppointments: (state, action) => {
            console.log("Current state:", state.appointments)
            console.log("Payload recieved:", action.payload)
            state.appointments.push(action.payload);
        }
    }
})
export const { setAuthUser, setAppointments } = userSlice.actions;

export default userSlice.reducer;
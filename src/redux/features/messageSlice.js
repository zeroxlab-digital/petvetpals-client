import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: { clickedParticipant: null, messages: [] },
    reducers: {
        setClickedParticipant: (state, action) => {
            state.clickedParticipant = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    }
})
export const { setClickedParticipant, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
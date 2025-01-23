import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "authUser",
    initialState: { authUser: null },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    }
})
export const { setAuthUser } = userSlice.actions;

export default userSlice.reducer;
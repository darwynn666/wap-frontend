import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {userDisplayIgnored:[]},
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUsersDisplayIgnored: (state, action) => {
            state.value.userDisplayIgnored=action.payload
        }
    },
})

export const { setUsersDisplayIgnored } = settingsSlice.actions
export default settingsSlice.reducer
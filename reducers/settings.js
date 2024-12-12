import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        usersDisplayIgnored:[],
        placesDisplayIgnored:[],
    },
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUsersDisplayIgnored: (state, action) => {
            state.value.usersDisplayIgnored=action.payload
        },
        setPlacesDisplayIgnored: (state, action) => {
            state.value.placesDisplayIgnored=action.payload
        }
    },
})

export const { setUsersDisplayIgnored,setPlacesDisplayIgnored } = settingsSlice.actions
export default settingsSlice.reducer
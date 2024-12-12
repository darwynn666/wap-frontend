import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        usersDisplayIgnored:[],
        placesDisplayIgnored:[],
        parksDisplayIgnored:[]
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
        },
        setParksDisplayIgnored: (state, action) => {
            state.value.parksDisplayIgnored=action.payload
        }
    },
})

export const { setUsersDisplayIgnored,setPlacesDisplayIgnored,setParksDisplayIgnored } = settingsSlice.actions
export default settingsSlice.reducer
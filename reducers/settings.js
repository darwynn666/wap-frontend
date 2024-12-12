import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {usersFilters:[]},
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { setSettings,setSettingsStatus } = settingsSlice.actions
export default settingsSlice.reducer
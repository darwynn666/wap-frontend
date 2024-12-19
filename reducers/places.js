import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

export const placesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPlace: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setPlace  } = placesSlice.actions
export default placesSlice.reducer
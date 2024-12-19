import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

export const newplaceSlice = createSlice({
    name: 'newplace',
    initialState,
    reducers: {
        setTriggerNewPlace: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setTriggerNewPlace  } = newplaceSlice.actions
export default newplaceSlice.reducer
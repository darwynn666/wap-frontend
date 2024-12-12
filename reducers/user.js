import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        setUserStatus: (state, action) => {
            state.value.status = action.payload
        },
    },
})

export const { setUser,setUserStatus } = userSlice.actions
export default userSlice.reducer
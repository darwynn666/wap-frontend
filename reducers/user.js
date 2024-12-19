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
            // console.log(state.value)
        },
        setUserStatus: (state, action) => {
            state.value.status = action.payload
        },
        setUserInfos: (state, action) => { // update user.infos : EXCEPT { photo, photo_public_id }
            state.value.infos.firstname = action.payload.firstname
            state.value.infos.lastname = action.payload.lastname
            state.value.infos.email = action.payload.email
            state.value.infos.telephone = action.payload.telephone
            state.value.infos.isDogSitter = action.payload.isDogSitter
            state.value.infos.isSearchingDogSitter = action.payload.isSearchingDogSitter
        },
        setUserInfosPhoto: (state, action) => { // update user.infos : ONLY { photo, photo_public_id }
            state.value.infos.photo = action.payload.photo
            state.value.infos.photo_public_id = action.payload.photo_public_id
        },
        setUserDogs: (state, action) => {
            state.value.dogs = action.payload
        },
        setUserFriends: (state, action) => {
            state.value.friends = action.payload
        },
        setUserCoordinates: (state, action) => {
            state.value.currentLocation = action.payload
        },
        logout: (state, action) => {
            state.value.token = null
            state.value.status = 'pause'
        }
    },
})

export const { setUser, setUserStatus, setUserInfos, setUserInfosPhoto, setUserDogs, setUserFriends, setUserCoordinates, logout } = userSlice.actions
export default userSlice.reducer
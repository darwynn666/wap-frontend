import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    usersDisplayIgnored: [],
    placesDisplayIgnored: [],
    mapDisplayIgnored:"standard",
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUsersDisplayIgnored: (state, action) => {
      state.value.usersDisplayIgnored = action.payload;
    },
    setPlacesDisplayIgnored: (state, action) => {
      state.value.placesDisplayIgnored = action.payload;
    },
    setMapDisplayIgnored: (state, action) => {
      state.value.mapDisplayIgnored = action.payload;
    },
  },
});

export const {
  setUsersDisplayIgnored,
  setPlacesDisplayIgnored,
  setMapDisplayIgnored,
} = settingsSlice.actions;
export default settingsSlice.reducer;

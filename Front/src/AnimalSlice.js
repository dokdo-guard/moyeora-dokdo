import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    animalName: "",
  },
};

export const AnimalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default AnimalSlice.reducer;
export const { setName } = AnimalSlice.actions;

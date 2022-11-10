import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import animalReducer from "./AnimalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    animal: animalReducer,
  },
});

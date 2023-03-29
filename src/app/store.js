import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/slices/videoSlice"

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

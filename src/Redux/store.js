import { configureStore } from "@reduxjs/toolkit";
import { userSlice, searchSlice } from "../Redux/UserSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search: searchSlice.reducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import videoSlice from "./videoSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        video: videoSlice
    }
})
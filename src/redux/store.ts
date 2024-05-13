import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./reducer/_session";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
});

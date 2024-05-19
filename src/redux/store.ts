import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./reducer/_session";
import toggleReducer from "./reducer/_toggle";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        toggle: toggleReducer,
    },
});

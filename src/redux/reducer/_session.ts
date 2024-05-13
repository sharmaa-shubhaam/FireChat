import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";

interface SessionProviderProps {
    hasSession: boolean;
    user: {
        _id: string;
        email: string;
        profilePic: string;
    };
}

const initialState: SessionProviderProps = {
    hasSession: false,
    user: {
        _id: "",
        email: "",
        profilePic: "",
    },
};

const sessionReducer = createSlice({
    name: "session",
    initialState,
    reducers: {
        createSession: (_, { payload }: PayloadAction<SessionProviderProps>) => payload,
    },
});

export const { createSession } = sessionReducer.actions;
export const session = (state: RootState) => state.session;

export default sessionReducer.reducer;

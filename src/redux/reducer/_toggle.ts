import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";

interface InitialStatePayload {
    sidebar?: boolean;
    profile?: boolean;
    newChat?: boolean;
}

type PayloadType = "sidebar" | "profile" | "newChat";

const initialState: InitialStatePayload = {
    sidebar: false,
    profile: false,
    newChat: false,
};

const toggleReducer = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        toggle: (state, { payload }: PayloadAction<[PayloadType, boolean]>) => {
            return { ...state, [payload[0]]: payload[1] };
        },
    },
});

export const { toggle } = toggleReducer.actions;
export const toggleState = (state: RootState) => state.toggle;
export default toggleReducer.reducer;

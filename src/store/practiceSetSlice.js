import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const practiceSetSlice = createSlice({
    name: "practiceSet",
    initialState,
    reducers: {
        addPracticeSet: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { addPracticeSet } = practiceSetSlice.actions;

export default practiceSetSlice.reducer;

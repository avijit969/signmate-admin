import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    practiceSetName: '',
    questions: []
};

export const practiceSetQuestionAdd = createSlice({
    name: "practiceSetQuestionAdd",
    initialState,
    reducers: {
        // Initialize a practice set with a name and reset questions
        createPracticeSet: (state, action) => {
            const { practiceSetName } = action.payload;
            state.practiceSetName = practiceSetName;
            state.questions = [];
        },

        // Add new questions to the practice set, avoiding duplicates
        addNewQuestions: (state, action) => {
            const newQuestions = action.payload; // Array of questions to add
            const existingIds = new Set(state.questions.map(q => q._id));

            // Filter out questions already in the set
            const uniqueQuestions = newQuestions.filter(q => !existingIds.has(q._id));

            // Add only unique questions
            state.questions = [...state.questions, ...uniqueQuestions];
        },

        // Remove a question by its unique ID
        removeQuestion: (state, action) => {
            const questionId = action.payload; // Assume questions have a unique `_id` field
            state.questions = state.questions.filter(question => question._id !== questionId);
            state.totalQuestions = state.questions.length;
        },
    },
});

export const { createPracticeSet, addNewQuestions, removeQuestion } = practiceSetQuestionAdd.actions;

export default practiceSetQuestionAdd.reducer;

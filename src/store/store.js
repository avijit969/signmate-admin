import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';
import practiceSetSlice from './practiceSetSlice';
import practiceSetAddQuestionSlice from './practiceQuestionAddSlice'

// Persist configuration for `authSlice`
const authPersistConfig = {
    key: 'auth',
    storage,
};

// Persist configuration for `practiceSetSlice`
const practiceSetAddQuestionPersistConfig = {
    key: 'practiceSetAddQuestion',
    storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedPracticeSetAddQuestionReducer = persistReducer(practiceSetAddQuestionPersistConfig, practiceSetAddQuestionSlice);

// Configure store
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        practiceSet: practiceSetSlice,
        practiceSetAddQuestion: practiceSetAddQuestionSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Export persistor and store
export const persistor = persistStore(store);
export default store;

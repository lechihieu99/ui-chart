import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import objectReducer from '../slice/object.slice';

export const store = configureStore({
    reducer: {
        object: objectReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ]
})
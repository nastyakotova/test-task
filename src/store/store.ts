import {
    configureStore,
    ThunkAction,
    Action,
    // getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { dataSlice } from './features/dataSlice';

export const store = configureStore({
    reducer: {
        [dataSlice.reducerPath]: dataSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(dataSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

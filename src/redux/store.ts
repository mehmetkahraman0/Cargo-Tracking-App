import { configureStore } from "@reduxjs/toolkit"
import productSlice from './slices/productSlice';
import cargoSlice from './slices/cargoSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        product: productSlice,
        cargo: cargoSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
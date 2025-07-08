import { configureStore } from "@reduxjs/toolkit"
import productSlice from './slices/productSlice';
import cargoSlice from './slices/cargoSlice';

export const store = configureStore({
    reducer:{
        product : productSlice,
        cargo : cargoSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
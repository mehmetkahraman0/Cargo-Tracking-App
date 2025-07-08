import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../lib/supabaseClient";
import { type Product } from '../../models/Product';
import { convertFileToBase64 } from "../../functions/convertBase64";

interface ProductState {
    addedError: undefined | string,
    addedLoading: boolean,
    addedProduct: Product,
    deletedError: undefined | string,
    deletedLoading: boolean,
    deletedProduct: Product,
    getError: undefined | string
    getLoading: boolean
    products: Product[]
}

const initialState: ProductState = {
    addedError: undefined,
    addedLoading: false,
    addedProduct: {},
    deletedError: undefined,
    deletedLoading: false,
    deletedProduct: {},
    getError: undefined,
    getLoading: false,
    products: [],
}

export const addProduct = createAsyncThunk("product/addProduct", async ({ productName, serialNo, file }: { productName: string, serialNo: string, file: File }) => {
    const fotoUrl = await convertFileToBase64(file)
    const { data, error } = await supabase.from("product").insert({ productName, serialNo, fotoUrl }).select().single()
    if (error) throw error
    return data
}
)

export const getProduct = createAsyncThunk<Product[]>("product/getProduct", async () => {
    const { data: products, error } = await supabase.from("product").select("*")
    if (error) throw error.message
    return products
}
)

export const deleteProduct = createAsyncThunk<Product, string>("product/deleteProduct", async (id) => {
    const { data: product, error } = await supabase.from("product").delete().eq("id", id).single()
    if (error) throw error.message
    return product
}
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, state => {
                state.addedLoading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addedLoading = false
                state.addedProduct = action.payload
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addedError = action.error.message
                state.addedLoading = false
            })
            .addCase(getProduct.pending, state => {
                state.getLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.getLoading = false
                state.products = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.getError = action.error.message
                state.getLoading = false
            })
            .addCase(deleteProduct.pending, state => {
                state.deletedLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deletedLoading = false
                state.deletedProduct = action.payload
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deletedError = action.error.message
                state.deletedLoading = false
            })
    }
})

export default productSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Cargo } from "../../models/Cargo"
import supabase from "../../lib/supabaseClient";

interface CargoState {
    addedError: undefined | string,
    addedLoading: boolean,
    addedCargo: Cargo,
    changedError: undefined | string,
    changedLoading: boolean,
    changedCargo: Cargo,
    getError: undefined | string
    getLoading: boolean
    cargos: Cargo[]
}

const initialState: CargoState = {
    addedError: undefined,
    addedLoading: false,
    addedCargo: {},
    changedError: undefined,
    changedLoading: false,
    changedCargo: {},
    getError: undefined,
    getLoading: false,
    cargos: []
}

export const createCargo = createAsyncThunk("cargo/addCargo",
    async (cargo: Cargo) => {
        const { data, error } = await supabase.from("cargo").insert(cargo).select().single()
        if (error) throw error
        return data
    }
)

export const getCargo = createAsyncThunk<Cargo[]>("product/getCargo",
    async () => {
        const { data: cargos, error } = await supabase.from("cargo").select("*")
        if (error) throw error.message
        return cargos
    }
)

export const changeStatus = createAsyncThunk<Cargo, string>("product/deleteProduct",
    async (id, status) => {
        const { data: products, error } = await supabase.from("product").update({ "status": status }).eq("id", id).select().single()
        if (error) throw error.message
        return products
    }
)

const cargoSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCargo.pending, state => {
                state.addedLoading = true
            })
            .addCase(createCargo.fulfilled, (state, action) => {
                state.addedLoading = false
                state.addedCargo = action.payload
            })
            .addCase(createCargo.rejected, (state, action) => {
                state.addedError = action.error.message
                state.addedLoading = false
            })
            .addCase(getCargo.pending, state => {
                state.getLoading = true
            })
            .addCase(getCargo.fulfilled, (state, action) => {
                state.getLoading = false
                state.cargos = action.payload
            })
            .addCase(getCargo.rejected, (state, action) => {
                state.getError = action.error.message
                state.getLoading = false
            })
            .addCase(changeStatus.pending, state => {
                state.changedLoading = true
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                state.changedLoading = false
                state.changedCargo = action.payload
            })
            .addCase(changeStatus.rejected, (state, action) => {
                state.changedError = action.error.message
                state.changedLoading = false
            })
    }
})

export default cargoSlice.reducer
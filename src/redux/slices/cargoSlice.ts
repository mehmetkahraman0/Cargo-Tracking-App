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
    deletedCargo: undefined | Cargo
    open: boolean
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
    cargos: [],
    deletedCargo: undefined,
    open: false
}

export const createCargo = createAsyncThunk("cargo/addCargo",
    async (cargo: Cargo) => {
        const { data, error } = await supabase.from("cargo").insert(cargo).select().single()
        if (error) throw error
        return data
    }
)

export const getCargo = createAsyncThunk<Cargo[]>("cargo/getCargo",
    async () => {
        const { data: cargos, error } = await supabase.from("cargo").select("*")
        if (error) throw error.message
        return cargos
    }
)

export const updateCargo = createAsyncThunk<Cargo, { id: string, cargo: Partial<Cargo> }>("cargo/updateCargo",
    async ({ id, cargo }) => {
        const { data: products, error } = await supabase.from("cargo").update(cargo).eq("id", id).select().single()
        if (error) throw error.message
        return products
    }
)

export const deleteCargo = createAsyncThunk<Cargo, { id: string }>("cargo/deleteCargo",
    async ({ id }) => {
        const { data: cargo, error } = await supabase.from("cargo").delete().eq("id", id).single()
        if (error) throw error.message
        return cargo
    }
)

const cargoSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setOpen: (state) => {
            state.open = !state.open
        }
    },
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
            .addCase(updateCargo.pending, state => {
                state.changedLoading = true
            })
            .addCase(updateCargo.fulfilled, (state, action) => {
                state.changedLoading = false
                state.changedCargo = action.payload
            })
            .addCase(updateCargo.rejected, (state, action) => {
                state.changedError = action.error.message
                state.changedLoading = false
            })
            .addCase(deleteCargo.fulfilled, (state, action) => {
                state.deletedCargo = action.payload
            })
    }
})

export const {setOpen} = cargoSlice.actions
export default cargoSlice.reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createGenre, getGenre } from "./thunks";
import { GenresMovie } from "shared/api";


type InitialState = {
    genres: GenresMovie[],
    authors: any[],
    loading: boolean,
    error: string | null
}

const initialState: InitialState = {
    genres: [],
    authors: [],
    loading: false,
    error: null
}

const categoryModel = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setGenre(state, { payload }: PayloadAction<GenresMovie>) {
            state.genres.push(payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createGenre.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(createGenre.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getGenre.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(getGenre.fulfilled, (state) => {
                state.loading = false
            })
    }
    
})

export const { setGenre }  = categoryModel.actions

export const categoryReducer = categoryModel.reducer
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ApiMovie, PayloadMovieFavorite } from "shared/api";



export const addMovieInFavorite = createAsyncThunk(
    'movieFavorite/addMoveInFavorite',
    async (payload:  PayloadMovieFavorite, { rejectWithValue }) => {        
        try {
            const data = await ApiMovie.setMovieInFavorite(payload)
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                rejectWithValue(error.response!.data.message)
            }
            rejectWithValue(error)
        }
    }
)

export const setMoviesFavorite = createAsyncThunk(
    'movieFavorite/getMoviesFavorite',
    async (userId: number, { rejectWithValue }) => {
        try {
            const data = await ApiMovie.getMoviesFavorite(userId)
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                rejectWithValue(error.response!.data.message)
            }
            rejectWithValue(error)
        }
    }
)

export const removeMovieFavorite = createAsyncThunk(
    'movieFavorite/removeMovieFavorite',
    async (payload:  PayloadMovieFavorite) => {        
        try {
            const data = await ApiMovie.removeMovieFavorite(payload)
            return data
        } catch (error) {
            
        }
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setGenre } from "./category";

import { ApiCategory } from "shared/api/typicode/category";



export const createGenre = createAsyncThunk(
    'category/createGenre',
    async (genre: string, { dispatch, rejectWithValue }) => {
        try {
            const data = await ApiCategory.createGenre(genre)
            dispatch(setGenre(data))
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {                
                return rejectWithValue(error.response.data)
            }
        }
    }
)

export const getGenre = createAsyncThunk(
    'category/getGenres',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const data = await ApiCategory.getGenre()
            dispatch(setGenre(data))
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {                
                return rejectWithValue(error.response.data)
            }
        }
    }
)
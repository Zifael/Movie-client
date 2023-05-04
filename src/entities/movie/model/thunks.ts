import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ApiMovie, PayloadRemoveRating, PayloadSetRating, PayloadUpdateMovie } from "shared/api"
import { updateMovie } from "./movies"
import { movieModel } from 'entities/movie'
import { movieFavoriteModel } from "entities/movei-favorite"

export const setMoviesThunk = createAsyncThunk(
    'movies/setMovies',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiMovie.getMovies()            
            return response.rows
        } catch (error) {                          
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data)
            }  
            
        }
    }
)

export const setOneMovie = createAsyncThunk(
    'movies/setOneMovie',
    async (movieId: number, { rejectWithValue }) => {
       try {
         const response = await ApiMovie.getOneMovie(movieId)
         return response
       } catch (error) {        
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data)
            }  
       }
    }
)

export const updateMovieThunk = createAsyncThunk(
    'movies/updateMovies',
    async (payload: PayloadUpdateMovie, { dispatch }) => {
        const response = await ApiMovie.updateMovie(payload)
        dispatch(updateMovie(response))
    }
)

export const setRating = createAsyncThunk(
    'movies/setRating',
    async (payload: PayloadSetRating, { dispatch, rejectWithValue }) => {
        try {
            const data = await ApiMovie.setRating(payload)  

            dispatch(movieModel.changeRating({ movieId: payload.movieId, data }))
            dispatch(movieFavoriteModel.changeRating({ movieId: payload.movieId, data }))
            
            dispatch(setMovieWithRating(payload.userId))
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {                
                return rejectWithValue(error.response.data)
            }
        }
    }
)

export const removeRatingFromMovie = createAsyncThunk(
    'movies/removeRatingFromMovie',
    async (payload: PayloadRemoveRating, { dispatch, rejectWithValue }) => {
        try {
            const data = await ApiMovie.removeRating(payload)
            
            dispatch(movieModel.changeRating({ movieId: payload.movieId, data }))
            dispatch(movieFavoriteModel.changeRating({ movieId: payload.movieId, data }))
            
            dispatch(setMovieWithRating(payload.userId))
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {                
                return rejectWithValue(error.response.data)
            }
        }
    }
)

export const setMovieWithRating = createAsyncThunk(
    'movies/setMovieWithRating',
    async (userId: number, { rejectWithValue }) => {
        try {
            const moviesId = await ApiMovie.getMoviesIdWithRating(userId)            
            return moviesId
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {                
                return rejectWithValue(error.response.data)
            }
        }
    }
)


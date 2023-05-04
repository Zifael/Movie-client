import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addMovieInFavorite, setMoviesFavorite, removeMovieFavorite } from "./thunks";
import { isError } from "entities/lib";
import { Movie, PayloadRating } from "shared/api";

type InitialState = {
    movieFavorites: Movie[]
    loading: boolean
    error: string | null
} 

const initialState: InitialState = {
    movieFavorites: [],
    loading: false,
    error: null
}

const movieFavorite = createSlice({
    name: 'movieFavorite',
    initialState,
    reducers: {
        changeRating(state, { payload }: PayloadAction<PayloadRating>) {
            state.movieFavorites.map(movie => {
                if (movie.id === payload.movieId) {
                    movie.rating = payload.data.movieRating
                    movie.numberOfRating = payload.data.numberOfRating
                }
                return movie
            })            
        }
    },
    extraReducers: (builder) => {
        builder  
            .addCase(addMovieInFavorite.pending, (state) => {
                state.loading = true
                state.error = null
            })          
            .addCase(addMovieInFavorite.fulfilled, (state, { payload }) => {
                state.loading = false
                state.movieFavorites.push(payload!.favoriteMovie)
            })      
            .addCase(setMoviesFavorite.pending, (state) => {
                state.loading = true
                state.error = null
            })      
            .addCase(setMoviesFavorite.fulfilled, (state, { payload }) => {     
                const movies = payload!.map(e => e.Movie)                
                state.movieFavorites.push(...movies)
                state.loading = false        
            })
            .addCase(removeMovieFavorite.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeMovieFavorite.fulfilled, (state, { payload }) => {
                state.loading = false                
                state.movieFavorites = state.movieFavorites.filter(movie => movie.id !== payload?.idRemoveMovie)
                
            })
            .addMatcher(isError, (state, { payload }) => {
                state.loading = false
                if (payload.message) {                    
                    state.error = payload.message                    
                } else {
                    state.error = payload.error.message
                } 
            })
    }
})

export const { changeRating } = movieFavorite.actions 

export const movieFavoriteReducer =  movieFavorite.reducer
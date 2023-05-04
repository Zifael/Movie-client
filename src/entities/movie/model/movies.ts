import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { removeRatingFromMovie, setMovieWithRating, setMoviesThunk, setOneMovie, setRating, updateMovieThunk } from "./thunks";
import { isError } from "entities/lib";
import { Movie, MovieWithRating, PayloadRating,} from 'shared/api/models'

export type InitalState = {
    movies: Movie[]
    movieOne: Movie | null,
    moviesWitchRating: MovieWithRating[]
    error: string | null
    loading: boolean
}

const initialState: InitalState = {
    movies: [],
    movieOne: null,
    moviesWitchRating: [],
    loading: false,
    error: null
}

const movieModel = createSlice({
    name: 'movies',
    initialState,
    reducers: {       
        setMovie(state, { payload }: PayloadAction<Movie>) {     
            state.movieOne = payload
        },
        changeRating(state, { payload }: PayloadAction<PayloadRating>) {
            state.movies = state.movies.map(movie => {                                
                if (movie.id === payload!.movieId) {
                    movie.rating = payload!.data.movieRating
                    movie.numberOfRating = payload!.data.numberOfRating                        
                }                          
                return movie
            }) 
            if (state.movieOne) {
                state.movieOne.rating = payload!.data.movieRating
                state.movieOne.numberOfRating = payload!.data.numberOfRating
            }
        },
        updateMovie(state, { payload }: PayloadAction<Movie>) {
            state.movies = state.movies.map(movie => {
                if (movie.id === payload.id) {
                    return payload
                }
                return movie
            })
        },
        
        deleteMovie(state, { payload }: PayloadAction<{ id: number }>) {
            state.movies = state.movies.filter(movie => movie.id !== payload.id)
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(setMoviesThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(setMoviesThunk.fulfilled, (state, { payload }) => {                
                state.movies = [...state.movies, ...payload!]
                state.loading = false
            })
            .addCase(setOneMovie.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(setOneMovie.fulfilled, (state, { payload }) => {                
                state.movieOne = payload!
                state.loading = false
            })
            .addCase(updateMovieThunk.fulfilled, (state, action) => {})
            .addCase(setRating.pending, state => {
                state.loading = true,
                state.error = null
            })
            .addCase(setRating.fulfilled, (state) => { 
                state.loading = false          
            })
            .addCase(setMovieWithRating.fulfilled, (state, { payload }) => {                
                state.moviesWitchRating = payload!
            }) 
            .addCase(removeRatingFromMovie.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(removeRatingFromMovie.fulfilled, (state, { payload }) => {
                state.loading = false
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

export const { setMovie, updateMovie, changeRating } = movieModel.actions

export const movieReducer = movieModel.reducer






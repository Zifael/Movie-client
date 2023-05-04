import apiInstance from "../base"
import { 
    Movie, 
    PayloadGetMovies, 
    PayloadMovieFavorite, 
    PayloadSetRating, 
    PayloadUpdateMovie,   
    ResponseMovies,    
    SetResponseMovieFavorite,
    getResponseMovieFavorite,
    ResponseRemovieMovieFavorite,
    ResponseRating,
    MovieWithRating,
    PayloadRemoveRating,   
} from "./models"



export const getMovies = async (payload?: PayloadGetMovies): Promise<ResponseMovies> => {
    const { data } = await apiInstance.get('/movie', {
        params: {
            ...payload
        }
    })    
    return data
}

export const getOneMovie = async (movieId: number): Promise<Movie> => {
    const { data } = await apiInstance.get(`/movie/${movieId}`) 
    return data
}

export const updateMovie = async (payload: PayloadUpdateMovie) => {
    const { data } = await apiInstance.put(`/movie`, payload)    
    return data
}

export const setRating = async (payload: PayloadSetRating): Promise<ResponseRating> => {    
    const { data } = await apiInstance.post('/rating', payload)    
    return data
}

export const removeRating = async (payload: PayloadRemoveRating): Promise<ResponseRating> => {
    const { data } = await apiInstance.delete('/rating', { data: payload })   
    return data
}

export const getMoviesIdWithRating = async (userId: number): Promise<MovieWithRating[]> => {
    const { data } = await apiInstance.get(`/rating?userId=${userId}`)
    return data 
}

export const setMovieInFavorite = async (payload: PayloadMovieFavorite): Promise<SetResponseMovieFavorite> => {
    const { data } = await apiInstance.post('/favoriteMovie', payload)    
    return data
}

export const getMoviesFavorite = async (userId: number): Promise<getResponseMovieFavorite[]> =>  {
    const { data } = await apiInstance.get(`/favoriteMovie?userId=${userId}`)    
    return data
}

export const removeMovieFavorite = async (payload: PayloadMovieFavorite): Promise<ResponseRemovieMovieFavorite> => {
    const { data } = await apiInstance.delete('/favoriteMovie', { data: payload })
    return data
}
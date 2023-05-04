export type ResponseMovies = {
    count: number,
    rows: Movie[]
}

export type Movie = {    
    id: number | null,
    title: string,
    description: string,
    rating: number,
    numberOfRating: number,
    releaseDate: string,
    status: string,
    video: string,
    img: string,
    Genres: Array<GenresMovie>   
}

export type PayloadGetMovies = {
    genre: number | number[]
    limit: number
    page: number
}

export type GenresMovie = {
    id: number,
    genre: string,   
}

export type PayloadUpdateMovie = {
    movie?: Movie
}   

export type PayloadSetRating = {
    userId: number,
    movieId: number,
    rating: number
}

export type PayloadRemoveRating = Omit<PayloadSetRating, 'rating'>

export type ResponseRating = {
    movieRating: number,
    numberOfRating: number
}

export type PayloadRating = {
    movieId: number, 
    data: ResponseRating
}

export type MovieWithRating =  {
    rating: string,
    MovieId: number
}

export type PayloadMovieFavorite = {
    userId: number,
    movieId: number
}

export type SetResponseMovieFavorite =  {
    movieId: number
    favoriteMovie: Movie,
    message: string
}

export type getResponseMovieFavorite = {
    FavoriteListId: number
    Movie: Movie,
    MovieId: number,
    id: number

}

export type ResponseRemovieMovieFavorite = {
    idRemoveMovie: number,
    message: string
}


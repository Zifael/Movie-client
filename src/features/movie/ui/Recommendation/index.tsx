import React from 'react';
import { useDispatch } from 'react-redux';
import s from './style.module.scss'
import cn from 'classnames'
import { movieModel } from 'entities/movie'
import { SERVER_API } from 'shared/config';
import { Movie } from 'shared/api/models';

type Props = {
    movies: Movie[],
    movieOne: Movie | null
}

export const Recommendation = ({ movies, movieOne }: Props) => {
    
    const dispatch = useDispatch<AppDispatch>() 

    if (movies.length === 0) {
        return <h1>Loading</h1>
    }
    
    let moviesRecommend = [...movies].sort((a, b) => Number(a.rating) - Number(b.rating))
    
    const showOneMovie = (movie: Movie) => {
        dispatch(movieModel.setMovie(movie))
    }

    return (
        <div className={s.rec__wraper}>
            {moviesRecommend.map(movie => 
                <img                     
                    key={movie.id} 
                    className={ cn(`${s.recImg}`, {[`${s.active}`]: movie.id === movieOne?.id }) }
                    src={`${SERVER_API}/image/${movie.img}`}
                    onClick={() => showOneMovie(movie)}
                    alt='Image Move'
                />     
            )}            
        </div>
    )
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.scss'
import { userModel } from 'entities/user';
import { movieFavoriteModel } from 'entities/movei-favorite'
import { movieModel } from 'entities/movie';
import { Button } from 'antd'


type Props = {
    movieId: number,
    height: number
}

export function AddList({ movieId, height }: Props) {

    const dispatch = useDispatch<AppDispatch>()

    const user = useSelector(userModel.selectors.user)
    
    const favroitesMovie = useSelector(movieFavoriteModel.selectors.movieFavorites)

    const addFavoritList = () => {
        dispatch(movieFavoriteModel.addMovieInFavorite({ userId: user.id, movieId}))
    }

    const removeFavoriteList = () => {
        dispatch(movieFavoriteModel.removeMovieFavorite({ userId: user.id, movieId }))
    }
    
    return (
        <>
            {favroitesMovie.some(movieF => movieF.id === movieId)
                ?
                <Button style={{ height }} onClick={removeFavoriteList} className={s.button}>
                    <div className={s.add__list}>                         
                        <span className={s.title}>Remove favorite</span>
                    </div> 
                </Button>
                :
                <Button style={{ height }} onClick={addFavoritList} className={s.button}>
                    <div className={s.add__list}>                        
                        <span className={s.title}>Add favorite</span>
                    </div> 
                </Button>
            }
           
        </>
    );
}


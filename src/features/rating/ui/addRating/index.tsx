import React, { useState } from 'react';
import { Rate } from 'antd'
import { useDispatch } from 'react-redux';
import s from './style.module.scss'
import cn from 'classnames'
import { movieModel } from 'entities/movie';
import { userModel } from 'entities/user';
import { useSelector } from 'react-redux';

type Props = {    
    movieId: number,
    movieRating: number
}

export const RatingCardMovie = ({ movieId, movieRating }: Props) => { 

    const [showSetRating, setShowSetRating] = useState(false)

    const moviesWitchRating = useSelector(movieModel.selectors.moviesWitchRating)

    const ratingMovie = Number(moviesWitchRating.find(e => e.MovieId === movieId)?.rating)  

    return (
        <div className={s.setRating__wraper}>            
            {ratingMovie 
                ?
                    <button 
                        onClick={() => setShowSetRating(true)} 
                        className={cn(s.userRating, {[s.badRating]: ratingMovie < 3, [s.goodRating]: ratingMovie > 3})}                        
                    >
                        {ratingMovie}
                    </button>
                :                
                    <button onClick={() => setShowSetRating(true)} className={s.showSetRating}>&#9734;</button>                       
            }
            <div className={cn(s.setRating, { [s.show]: showSetRating })}>
                <div onClick={() => setShowSetRating(false)}>
                    <Rating movieId={movieId} movieRating={movieRating} />
                </div>                                        
                <button onClick={() => setShowSetRating(false)} className={s.close}>&#x2715;</button>
            </div>
        </div>
    )
}

export const Rating = ({movieId, movieRating }: Props) => {     
    
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(userModel.selectors.user)  

    const setRating = (rating: number) => {             
        dispatch(movieModel.setRating({userId: user.id, movieId, rating}))   
    } 

    const defaultRating = Math.round(Number(movieRating))

    return (
        <div>                          
            <Rate defaultValue={Number(movieRating)} allowClear={false} allowHalf onChange={(rating) => setRating(rating)}/>             
        </div>
    );
}


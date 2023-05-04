import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './style.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { movieModel } from 'entities/movie';
import { Movie } from 'shared/api/models';
import { SERVER_API } from 'shared/config';
import { ModalWithVideo } from 'entities/modalWithVideo';
import { Button } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons';



type Props = {
    movie: Movie,
    RatingCardMovie: React.ComponentType<{ movieId: number, movieRating: number}>,
    AddList: React.ComponentType<{ movieId: number, height: number }>
    RemoveRating: React.ComponentType<{ movieId: number }>
}

function MovieCard(props: Props) {
    const { movie, RatingCardMovie, RemoveRating, AddList } = props    

    const [hideInfo, setHideInfo] = useState(false) 
    const moviesWitchRating = useSelector(movieModel.selectors.moviesWitchRating)

    const isThereRating = moviesWitchRating.some(e => e.MovieId === movie.id)

    const [modalShow, setModalShow] = useState(false)

  

    return ( 
        <div className={s.content}>
            <ModalWithVideo movieOne={movie} isModalOpen={modalShow} hideModal={() => setModalShow(false)}/>
            <div className={s.main}>
                <Link to={`/movie/${movie.id}`}>
                    <img className={s.img} src={SERVER_API + `/image/${movie.img}`}/>
                </Link>
                <div className={s.info}>
                    <h2 className={s.title}>{movie.title}</h2>
                    <div className={s.status}>Status: {movie.status}</div>
                    <div className={s.date}>Release date: {movie.releaseDate}</div>
                    <div className={s.genre__wraper}>                            
                        {movie.Genres
                            .filter((_, i) => i < 3)
                            .map((e, i, arr) => 
                                <span className={s.genre} key={e.id}>
                                    {e.genre}{i !== arr.length - 1 ? ',' : null }
                                </span>    
                        )}                        
                    </div>               
                    <div  className={s.trailer}>
                        <Button onClick={() => setModalShow(true)}>trailer</Button> 
                    </div>              
                </div>                  
            </div>
            <div className={s.left__wraper}>
                <div className={s.left__content}>
                    <ul className={s.rating__content}>
                        <li className={s.rating__wraper}>
                            <span className={s.ratingStar}>&#9733;</span>
                            <span className={s.rating}>{movie.rating}</span>                                
                        </li>  
                        <li className={s.numberOfRating}>{movie.numberOfRating}</li>                                                            
                    </ul>
                    <RatingCardMovie movieId={movie.id!} movieRating={movie.rating} />
                    <button className={s.moreInfo__button}>
                        <EllipsisOutlined 
                            className={s.moreInfo}
                            onClick={() => setHideInfo(prev => !prev)}                                                                              
                        />
                    </button>                                
                </div>                           
                <div className={cn(s.moreInfo__wraper, {[s.active]: hideInfo} )}>                      
                    <AddList movieId={movie.id!} height={30} />      
                    {isThereRating
                        ?
                        <RemoveRating  movieId={movie.id!}/>  
                        : 
                        null
                    }                              
                </div>
            </div>
        </div>           
    );
}



export default MovieCard;
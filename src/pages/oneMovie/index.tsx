import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import style from './style.module.scss';
import { Rating } from 'features/rating/ui';
import { movieModel } from 'entities/movie';
import { SERVER_API } from 'shared/config';
import { Result, Descriptions, Button, Spin  } from 'antd';
import { AddList } from 'features/movie';


function OneMovie() {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams<{ id: string }>()    
    
    const movie = useSelector(movieModel.selectors.movieOne)      
    const loading = useSelector(movieModel.selectors.loading)
    const error = useSelector(movieModel.selectors.error)
    
    useEffect(() => {        
        dispatch(movieModel.setOneMovie(Number(id)))
    }, [])

    
   
    if (error) {
        return <h1>{error}</h1>
    }

    return (
       <div className={style.card__block}>
            {loading 
            ?
                <Spin tip="Loading" size="large">
                <div className="content" />
                </Spin>
            :        
            <>                    
                {movie 
                    ?
                        <>
                            <div className={style.card} >
                                <img alt="example" src={`${movie.img ? `${SERVER_API}/image/${movie.img}`: ''}`} />
                                <div className={style.card__info}>
                                    <h2 className={style.card__title}>{movie.title}</h2>                    
                                    <h3 className={style.card__ratingTitle}>Rating: {movie.rating}</h3>
                                    <Rating movieId={movie.id!} movieRating={Number(movie.rating!)}/>  
                                    <p className={style.card__ratingTitle}>Number of ratings: {movie.numberOfRating}</p>                    
                                    <div className={style.addFavoritList}>
                                        <AddList movieId={movie.id!}  height={35}/>
                                    </div>            
                                    <Descriptions                                                   
                                        column={1}
                                        labelStyle={{ fontWeight: 500, fontSize: 16, color: 'white' }}
                                        contentStyle={{ fontSize: 16, color: 'white' }}                                 
                                    >       
                                    
                                        <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>                        
                                        <Descriptions.Item label="Genres">
                                            {movie.Genres.map(el => 
                                                <Link key={el.id} className={style.card__genres} to={''}>{el.genre}</Link>
                                            )}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="releaseDate">{movie.releaseDate}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{movie.description}</Descriptions.Item>
                                    </Descriptions>                     
                                </div>                                  
                            </div>
                            <div  className={style.player__wrapper}>
                                <ReactPlayer 
                                    controls
                                    url={`${movie.img ? `${SERVER_API}/video/${movie.video}`: ''}`}
                                    className={style.player}  
                                    width={1000}
                                    height={'auto'}                                     
                                />                
                            </div>  
                        </>
                    :
                        <Result
                            status="404"
                            title="404"
                            subTitle="Sorry, the page you visited does not exist."
                            extra={<Button type="primary">Back Home</Button>}
                        />
                }        
            </>  
            }    
        </div>
    );
}



export default OneMovie;
import React from 'react';
import { useSelector } from 'react-redux';
import s from './style.module.scss'
import { AddList } from 'features/movie';
import { RatingCardMovie, RemoveRating } from 'features/rating/ui';
import { movieFavoriteModel } from 'entities/movei-favorite';
import { MovieCard } from 'entities/movie';
import { Row, Col, Layout } from 'antd';


const { Header, Footer, Sider, Content } = Layout;
 
function MovieFavrotie() {

    const moviesFavorite = useSelector(movieFavoriteModel.selectors.movieFavorites)    
    
    return (
        <Layout className={s.movie}>
            <Sider width={'auto'} className={s.siderBar}>               
                           
            </Sider>
            <Content  className={s.wraper} >               
               {moviesFavorite.map(movie =>                           
                   <MovieCard 
                        key={movie.id} 
                        movie={movie}                                        
                        RatingCardMovie={RatingCardMovie}
                        AddList={AddList}
                        RemoveRating={RemoveRating}
                    />                 
                )}               
            </Content>
        </Layout>
    );
}

export default MovieFavrotie;
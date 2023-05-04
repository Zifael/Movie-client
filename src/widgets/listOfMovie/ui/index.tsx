import { Movie } from 'shared/api'
import s from './style.module.scss'
import { RatingCardMovie, RemoveRating } from 'features/rating'
import { AddList } from 'features/movie'
import { MovieCard } from 'entities/movie'
import { Row, Col } from 'antd'

type Props = {
    movies: Movie[]
}

export const ListOfMovie = ({ movies }: Props) => {
    <Row className={s.movie}>
        <Col className={s.wraper} span={12} offset={6}>   
            {movies.map(movie =>                     
                <MovieCard 
                    key={movie.id} 
                    movie={movie}                                        
                    RatingCardMovie={RatingCardMovie}
                    AddList={AddList}
                    RemoveRating={RemoveRating}
                />                 
            )} 
        </Col>
    </Row>
}
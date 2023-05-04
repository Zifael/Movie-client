import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import style from './style.module.scss'
import { AddList, Recommendation } from 'features/movie'
import { movieModel } from 'entities/movie'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Alert } from 'antd'
import { SERVER_API } from 'shared/config'
import { ModalWithVideo } from 'entities/modalWithVideo'


const s: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}

const MoviePage = () => {    
      
    const dispatch = useDispatch<AppDispatch>()
    const movies = useSelector(movieModel.selectors.movies)
    const movieOne = useSelector(movieModel.selectors.movieOne)
  
    const loading = useSelector(movieModel.selectors.loading)
    const error = useSelector(movieModel.selectors.error)

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    useEffect(() => { 
        if (movies.length === 0) {
            dispatch(movieModel.setMoviesThunk())
        }    
    }, [])

    const showModal = () => {        
        setIsModalOpen(true)
    }

    
    
    return (
        <section className={style.mainPage}>               
            {movieOne &&                
                <ModalWithVideo isModalOpen={isModalOpen} hideModal={() => setIsModalOpen(false)} movieOne={movieOne}/>
            }
            <div className={style.info__wraper}>
                {movieOne ?
                    <>
                        <img className={style.info__imgBack} src={`${SERVER_API}/image/${movieOne.img}`}/>
                        <div className={style.info__content}>                        
                            <div className={style.info__title}>{movieOne.title}</div>
                            <span className={style.info__rating}>{movieOne.rating}</span>
                            <div className={style.info__contentPlay}>                                
                                <Button onClick={showModal} type='primary' danger className={style.info__buttonPlay}>
                                    <span className={style.info__titlePLay}>Play</span>
                                    <PlayCircleOutlined className={style.info__imgPlay} />
                                </Button>
                                <AddList movieId={ movieOne.id! } height={ 50 }/>
                            </div>
                            <p className={style.info__description}>Description: {movieOne.description}</p>
                            <Link to={`/movie/${movieOne.id}`}>show more</Link>
                        </div>                        
                    </>
                    : 
                    <div className={style.info__content}>
                        <div className={style.info__title}>Zifaelmovie</div>
                        <p className={style.info__description}>Задача организации,
                         в особенности же рамки и место обучения кадров играет важную рол
                         ь в формировании модели развития. Повседневная практика показывает, чт
                         о реализация намеченных плановых заданий требуют от нас анализа форм развити
                         я. С другой стороны постоянный количественный рост и сфера нашей активности влечет з
                         а собой процесс внедрения и модернизации модели развития. С другой стороны консультация с широ
                         ким активом влечет за собой процесс внедрения и модернизации существенных финансовых и административн
                         ых условий. Значимость этих проблем настолько очевидна, что новая модель организационной деятельности в значительной степени обуславливает создание форм развития.</p>
                    </div>
                }
            </div>            
            <Recommendation movies={movies} movieOne={movieOne}/>   
            {error && <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                closable
            /> }  
        </section>
    )
}


export default MoviePage
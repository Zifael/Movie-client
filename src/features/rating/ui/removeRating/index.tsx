import { useSelector, useDispatch } from "react-redux"
import { Button } from 'antd'
import s from './style.module.scss'
import { userModel } from "entities/user"
import { movieModel } from "entities/movie"


type Props = {
    movieId: number
}

export const RemoveRating = ({ movieId }: Props) => {

    const user = useSelector(userModel.selectors.user)
    const dispatch = useDispatch<AppDispatch>()

    const removeRating = () => {
        dispatch(movieModel.removeRatingFromMovie({ userId: user.id, movieId }))
    }

    return (        
        <Button className={s.removeButton} onClick={removeRating}>Remove rating</Button>        
    )
}
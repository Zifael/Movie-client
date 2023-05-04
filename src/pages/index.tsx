import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MoviePage from './movie';
import OneMovie from './oneMovie';
import AuthorizationPage from './authorization';
import Profile from './profile';
import ResetPassword from './reset-password';
import MovieFavrotie from './movie-favorite'
import { useDispatch } from 'react-redux';
import { userModel } from 'entities/user';
import { movieFavoriteModel } from 'entities/movei-favorite';
import { useSelector } from 'react-redux';
import { movieModel } from 'entities/movie';


// const MoviePage = lazy(() => import('./movie'));

function Router() {  
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(userModel.selectors.user)
    
    useEffect(() => {
        dispatch(userModel.refresh())        
    }, [])

    useEffect(() => {
        if (user.id) {            
            dispatch(movieFavoriteModel.setMoviesFavorite(user.id))
            dispatch(movieModel.setMovieWithRating(user.id))
        }
    }, [user])

    return (
        <Routes>
            <Route path='/' element={ <MoviePage /> }/>
            <Route path='/movie/:id' element={ <OneMovie /> } />
            <Route path='/login' element={ <AuthorizationPage /> } />
            <Route path='/registration' element={ <AuthorizationPage /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/resetPassword' element={ <ResetPassword /> }/>
            <Route path='/favorite' element={ <MovieFavrotie /> } />
        </Routes>
    );
}

export default Router;
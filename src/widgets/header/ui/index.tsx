import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import s from './style.module.scss'
import logoImg from 'img/logo.png';
import { userModel } from 'entities/user';
import { HeartOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { movieFavoriteModel } from 'entities/movei-favorite';



export const Header = () => {

    const disptach = useDispatch<AppDispatch>()

    const navigate = useNavigate()
    const { login } = useSelector(userModel.selectors.user)
    const favoriteMovie = useSelector(movieFavoriteModel.selectors.movieFavorites)
    

    const logout = () => {
        disptach(userModel.logout())        
        localStorage.removeItem('accessToken')
    }
    
    return (
        <div className={s.header__wraper}>
           <div className={s.header__content}>
                <div className={s.logo_wraper}>
                    <img onClick={() => navigate('/')} className={s.logo} src={logoImg} alt='logo'/>
                </div>
                <div className={s.link__wraper}>
                    <NavLink className={s.link} to='/favorite'>
                        <div className={s.favorite__wraper}>
                            <HeartOutlined className={s.favoriteImg}/>
                            <p className={s.favorite__count}>{favoriteMovie.length}</p>
                        </div>
                    </NavLink>
                    {login 
                        ?
                        <Dropdown
                            className={s.drop}
                            menu={{
                                items: [
                                    {
                                        key: 1,
                                        label: 'logout',
                                        danger: true,
                                        onClick: logout
                                    }
                                ]
                            }}
                            placement='bottomLeft'
                            autoFocus

                        >
                            <div className={s.login}>{login}</div>
                        </Dropdown>                        
                        :
                        <NavLink className={s.link} to='/login'>Sign in</NavLink>
                    }                    
                </div>
           </div>            
        </div>
    )
}
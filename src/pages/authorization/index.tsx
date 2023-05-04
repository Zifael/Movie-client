import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './style.module.scss'
import { Layout } from 'antd'
import { MyForm } from 'features/formValidation/index';


function AuthorizationPage() {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()    
    const isRouterLogin = location.pathname === '/login'
    const navigate = useNavigate()
    
    return (        
        <div className={s.authorization__container}>
            <MyForm 
                initialEmail={''}                   
                dispatch={dispatch} 
                isRouterLogin={isRouterLogin}
                navigate={navigate}
            />
        </div>       
    );
}


export default AuthorizationPage;
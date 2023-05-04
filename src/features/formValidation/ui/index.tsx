import React, { useState } from 'react';
import { Field, Form, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import s from './style.module.scss';
import cn from 'classnames'
import { FormValue } from 'shared/api';
import { Spin } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

export type PropsForm = {
    isRouterLogin: boolean
}   

function InnerForm(props: PropsForm & FormikProps<FormValue>) {
    const { touched, errors, isSubmitting, isRouterLogin, handleSubmit } = props  
  
    const [isShowPassword, setIsShowPassword] = useState(false)

    const values = Object.keys(props.values).filter(value => isRouterLogin ? value !== 'email': value)
    
    const isKey = <T extends Object>(obj: T, key: PropertyKey): key is keyof T => {
        return key in obj
    }    
    
    const removeErrorsSwitchAuthoriztion = () => {
        touched.email = false
        touched.login = false
        touched.password = false
        errors.email = ''
        errors.login = ''
        errors.password = ''        
    }

    return (
        <>
            <Form className={s.form}  onSubmit={handleSubmit}>
                <div className={s.form__content}>
                    <h1 className={s.InnerForm__title}>{isRouterLogin ? 'Sign in' : 'Registration'}</h1> 
                    {values.map((value) =>
                        isKey(props.values, value) 
                            ?                          
                            <div key={value}>
                                <div className={s.InnerForm__content}>
                                    <div>
                                        <label className={s.InnerForm__nameInput} htmlFor={value}>{value}</label>
                                    </div>
                                    <div className={s.input__wraper}>
                                        <Field 
                                            className={cn(s.InnerForm__input, {[`${s.errorInput}`]: touched[value] && errors[value]})}  
                                            placeholder={value} 
                                            type={ value === 'password' && !isShowPassword ? 'password': 'text' } 
                                            name={value} 
                                        /> 
                                        {value === 'password' &&
                                            <div className={s.input__show}>
                                                {isShowPassword 
                                                ?
                                                <EyeOutlined onClick={() => setIsShowPassword(false)} className={s.input__img}/>
                                                :                                                
                                                <EyeInvisibleOutlined onClick={() => setIsShowPassword(true)} className={s.input__img}/>
                                                }
                                                
                                            </div>
                                        }
                                    </div>                   
                                </div>         
                                {touched[value] && errors[value] && <div className={s.error}>{errors[value]}</div>}
                            </div>   
                            : 
                            null                
                    )}                                  
                                
                    <div className={s.frogot__wraper}>
                        <Link to='/resetPassword' className={s.forgotPassword}>Forgot your password?</Link> 
                    </div>             
                    <div className={s.button__wraper}>                                         
                        <button 
                            className={s.InnerForm__button} 
                            type='submit' 
                            disabled={isSubmitting}>
                            Submit
                        </button>                                    
                    </div>        
                    {isRouterLogin 
                        ? 
                        <Link 
                            onClick={removeErrorsSwitchAuthoriztion}
                            className={s.linkSwap} 
                            to='/registration'
                        >
                            Don't you have an account yet? Create one.
                        </Link>
                        :
                        <Link onClick={removeErrorsSwitchAuthoriztion} className={s.linkSwap}  to='/login'>Already have an account?</Link>
                    }        
                </div>
            </Form >
            {isSubmitting && <Spin /> }
        </>
    );
}

export default InnerForm;
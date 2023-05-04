import React, { useState } from 'react';
import s from './style.module.scss';
import { Input, Space, Button } from 'antd'
import { ApiUser } from 'shared/api';
import { AxiosError } from 'axios';
import { CheckOutlined } from '@ant-design/icons'

export const ResetNewPassword = ({ code }: { code: string }) => {
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('') 

    const [isPasswordReset, setIsPasswordReset] = useState(false) 
    

    const resetPassword = async  () => {
        try {
            setLoading(true)
            
            if (password.length < 5) { 
                setError('Your password is weak')
                return
            }
            await ApiUser.resetPassword({ code, password })

            setIsPasswordReset(true)
        } catch (error) {
            const err = error as AxiosError<{ message: string}>
            setError(err.response?.data.message as string)  
        } finally {
            setLoading(false)
        }   
    }

    return (
        <>             
            {isPasswordReset?
                <>
                    <h2 className={s.titleSent}>Password changed</h2>
                    <CheckOutlined className={s.success}/> 
                </>     
            :
                <>
                    <h2 className={s.titleSend}>Enter password</h2>
                    <div className={s.title__opeartion}>password</div>
                    <Space.Compact className={s.input__wraper}>
                        <Input placeholder='password' className={s.input} value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Button disabled={loading} onClick={resetPassword} className={s.button} type="primary">Submit</Button>
                    </Space.Compact> 
                    <div className={s.error}>{error}</div>
                </>
            }                   
        </>
    )
}

export function SendMailResetPassword() {
    const [email, setEmail] = useState('')
      
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('') 
    const [completedSendEmail, setCompletedSendEmail] = useState(false)
    

    const sendMailResetPassword = async () => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError('Invalid email address')    
            return  
        }                   
        
        try {
            setLoading(true)
            await ApiUser.sendMailResetPassword({ email })
            setError('')
            setCompletedSendEmail(true)
        } catch (error) {           
            const err = error as AxiosError<{ message: string}>
            setError(err.response?.data.message as string)  
        } finally {
            setLoading(false)
        }
    }   

    
    return (
        <div className={s.content}>
            {completedSendEmail 
                ?   
                <div>
                    <h3 className={s.titleSent}>Sent email</h3>
                    <CheckOutlined className={s.success}/>                    
                    <p className={s.descriptionSentEmail}>
                        An email has been sent to your email
                            address with instructions on how to reset your password. 
                            If you don’t receive it within a few minutes, 
                            please check that you used the e-mail address for your 
                            account and try again or contact us for help.
                    </p>
                </div>
                :                  
                <>
                    <h3 className={s.titleSend}>Enter Email</h3> 
                    <div className={s.title__opeartion}>email</div>
                        <Space.Compact className={s.input__wraper}>
                            <Input placeholder='email' className={s.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Button disabled={loading} onClick={sendMailResetPassword} className={s.button} type="primary">Submit</Button>
                        </Space.Compact>
                    <div className={s.error}>{error}</div>    
                </>                  
            }
        </div>
    );
}
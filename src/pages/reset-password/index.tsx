import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import s from './style.module.scss'
import { ResetNewPassword, SendMailResetPassword} from 'features/user'



function ResetPassword() {
    const [searchParams] = useSearchParams()
    const params = searchParams.get('code')

   
   
    return (
        <div className={s.wraper}>                                     
            {params     
                ?
                <ResetNewPassword code={params} /> 
                :
                <SendMailResetPassword />                   
            }     
            <div className={s.backToLogin__wraper}>
                <Link className={s.backToLogin} to='/login'>Back to login</Link>
            </div>
        </div>
    );
}

export default ResetPassword;
import { FormikErrors, withFormik } from "formik"
import { userModel } from 'entities/user'
import { ApiUser, FormValue, MyFormProps } from "shared/api";
import { AxiosError } from "axios";
import InnerForm from "features/formValidation/ui";


export const MyForm = withFormik<MyFormProps, FormValue>({
   mapPropsToValues: (props) => {   
        return {
            email: props.initialEmail || '',
            login: '',
            password: '',
        }
    },
    validate: (values: FormValue, props) => {
        const errors: FormikErrors<FormValue> = {}
        if (!props.isRouterLogin) {
            if (!values.email) {
                errors.email = 'Required email';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }  
        }        
        if (!values.login) {
            errors.login = 'Required login'
        } 
        if (!values.password) {
            errors.password = 'Required password'
        }
        return errors
    },
    handleSubmit: async(values, { props, setSubmitting }) => { 
        try {
            let data            
            if (props.isRouterLogin) {
                data = await ApiUser.login({ login: values.login, password: values.password })            
            } else {    
                data = await ApiUser.registration(values)             
            }        
            props.dispatch(userModel.setUser(data)) 

            localStorage.setItem('accessToken', data.tokens.accessToken)
            props.navigate('/')
            
            setSubmitting(false) 
        } catch (error) {
            if (error instanceof AxiosError) {
                props.dispatch(userModel.setResponseMessage(error.response?.data.message))
            }       
        }
              
    }
})(InnerForm)


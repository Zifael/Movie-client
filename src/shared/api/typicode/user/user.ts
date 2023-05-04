import apiInstance from '../base'
import { ChangePassword, GetAdmin, ResetPassword, ResponseMessgae, User, UserCreate, UserLogin } from './models'


export const registration = async (payload: UserCreate): Promise<User> => {
    const { data } = await apiInstance.post('user/registration', payload)
    return data
}

export const login = async (payload: UserLogin): Promise<User> => {
    const { data } = await apiInstance.post('user/login', payload) 
    return data
}

export const logout = async (): Promise<ResponseMessgae> => {
    const { data } = await apiInstance.post('user/logout')
    return data
}

export const refresh = async (): Promise<User> => {
    const { data } = await apiInstance.get('user/refresh')
    return data
}

export const changePassword = async (payload: ChangePassword): Promise<ResponseMessgae> => {
    const { data } = await apiInstance.post('user/change-password', payload)
    return data
}

export const sendMailResetPassword = async (payload: { email: string }): Promise<ResponseMessgae> => {
    const { data } = await apiInstance.post('user/sendMessageResetPassowrd', payload) 
    return data
}

export const resetPassword = async (payload: ResetPassword): Promise<ResponseMessgae> => {   
    const { data } = await apiInstance.post(`user/resetPassowrd?code=${payload.code}`, {password: payload.password})
    return data
}

export const getAdmin = async (payload: GetAdmin):  Promise<ResponseMessgae> => {
    const { data } = await apiInstance.post('user/getAdmin', payload)
    return data
}
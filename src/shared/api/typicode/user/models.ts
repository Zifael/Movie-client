import { NavigateFunction } from "react-router-dom"

export type UserCreate = {
    email: string
    login: string
    password: string
}

export type UserLogin = Omit<UserCreate, 'email'>


export type User = {
    tokens: {
        accessToken: string,
        refreshToken: string
    },
    user: {
        id: number
        email: string,
        login: string,
        roles: string[]
    },
    activateLink: string
}

export type ChangePassword = {
    id: number,
    password: string,
    newPassword: string
}

export type ResponseMessgae = {
    message: string
}

export type ResetPassword = {
    code: string,
    password: string
}

export type GetAdmin = {
    userId: number,
    key: string
}

export type FormValue = {
    email: string,
    login: string,
    password: string,
}

export type MyFormProps = {
    initialEmail?: string,
    isRouterLogin: boolean,
    dispatch: AppDispatch,
    navigate: NavigateFunction
}
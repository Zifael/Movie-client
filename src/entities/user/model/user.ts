import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, ResponseMessgae } from "shared/api";
import { getAdmin, logout, refresh } from "./thunks";

export type initialState = User & {
    isActive: boolean
    resetCode: null | string
    createAt: string
    updateAt: string,
    responseMessage: string,
    loading: boolean,
    error: string | null
    
}



const initialState: initialState = {
    user: {
        id: 0,
        email: '',
        login: '',
        roles: []
    },
    tokens: {
        accessToken: '',
        refreshToken: ''
    },
    activateLink: '',
    isActive: false,
    resetCode: null,
    createAt: '',
    updateAt: '', 
    responseMessage: '',
    loading: false,
    error: null   
}

const userModel = createSlice({
    name: 'userModel',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<User>) {
            state.user = payload.user
            state.tokens = payload.tokens
            state.activateLink = payload.activateLink
        },
        setResponseMessage(state, { payload }: PayloadAction<ResponseMessgae>) {
            state.responseMessage = payload.message
        }
    },
    extraReducers: (builder) => {
        builder    
            .addCase(logout.pending, (state) => {
                state.loading = true
                state.error = null
            })        
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = {
                    id: 0,
                    email: '',
                    login: '',
                    roles: []
                }
                state.tokens = {
                    accessToken: '',
                    refreshToken: ''
                },
                state.activateLink = ''
            })
            .addCase(refresh.fulfilled, (state, { payload }) => {
                state.user = payload.user
                state.tokens = payload.tokens
                state.activateLink = payload.activateLink
            })
            .addCase(getAdmin.fulfilled, (state, { payload }) => {
                state.responseMessage = payload.message
                state.user.roles.push('ADMIN')                
            })            
    }
})

export const { setUser, setResponseMessage } = userModel.actions
export const userReducer = userModel.reducer
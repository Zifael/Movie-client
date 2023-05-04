import { createAsyncThunk } from "@reduxjs/toolkit"
import { setResponseMessage } from "./user"
import { ApiUser, GetAdmin } from "shared/api"



export const logout = createAsyncThunk(
    'user/logout',
    async (_, { dispatch }) => {
        const message = await ApiUser.logout()
        dispatch(setResponseMessage(message))
    }
)

export const refresh = createAsyncThunk(
    'user/refresh',
    async () => {
        const user = await ApiUser.refresh()     
        return user   
    }
)

export const getAdmin = createAsyncThunk(
    'user/getAdmin',
    async (payload: GetAdmin) => {
        const message = await ApiUser.getAdmin(payload)
        return message
    }
)

import { AnyAction } from "@reduxjs/toolkit"
import axios from "axios"

export const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

export const axiosError = (error: Error, rejectWithValue: any) => {
    if (axios.isAxiosError(error) && error.response) {
        rejectWithValue(error)
    }
}
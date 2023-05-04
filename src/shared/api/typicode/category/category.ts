import apiInstance from "../base"
import { GenresMovie } from "./models"


export const createGenre = async (genre: string) => {
    const { data } = await apiInstance.post<GenresMovie>('/genre', genre)
    return data
}

export const getGenre = async () => {
    const { data } = await apiInstance.get<GenresMovie>('/')
    return data
}
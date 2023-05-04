import axios from "axios";
import { SERVER_API } from "shared/config";
import { User } from "./user";


const apiInstance = axios.create({
    withCredentials: true,
    baseURL: SERVER_API
})

apiInstance.interceptors.request.use((config) => {    
    config.headers.accesstoken = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})


apiInstance.interceptors.response.use((config) => {    
    return config
}, async (error) => { 
    // We are saving the request that failed
    const originalRequest = error.config  

    if (error.response.status === 401 &&  error.config && !originalRequest.isRetry) {   
        originalRequest.isRetry = true         
        try {
            const response = await axios.get<User>(SERVER_API + '/user/refresh', { withCredentials: true })
            localStorage.setItem('accessToken', response.data.tokens.accessToken)            
            return apiInstance.request(originalRequest)
        } catch (error) {
            console.error('Not Authorized')
        }
    }

    throw error  
})

export default apiInstance
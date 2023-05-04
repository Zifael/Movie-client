


const getEnv = (key: string) => {    
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`)
    }

    return import.meta.env[key]
}


export const SERVER_API = getEnv('VITE_APP_API_SERVER')


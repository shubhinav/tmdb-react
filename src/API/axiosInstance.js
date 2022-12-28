import axios from "axios";
const accessToken = process.env.REACT_APP_ACCESS_TOKEN
export const apiKey = process.env.REACT_APP_API_KEY
export const baseURL = 'https://api.themoviedb.org/3'
export const imgBaseUrl = 'https://image.tmdb.org/t/p'
const api = axios.create({
    baseURL: baseURL,
    headers: {"Authorization": `bearer ${accessToken}`}
})

export default api
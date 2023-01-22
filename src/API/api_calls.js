import api, { baseURL } from "./axiosInstance";
import axios from "axios";


// API CALLS
export function getPopularMovies(page = 1) {
    return api.get(`/movie/popular?page=${page}`)
}

export function getTopRatedMovies(page = 1) {
    return api.get(`/movie/top_rated?page=${page}`)
}

export function getNowPlayingMovies(page = 1){
    return api.get(`/movie/now_playing?page=${page}`)
}

export function getUpcomingMovies(page = 1){
    return api.get(`/movie/upcoming?page=${page}`)
}

export function getMovieDetails(param){
    return axios.get(`${baseURL}/movie/${param}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,release_dates,watch/providers,credits,recommendations`)
}

export function getAllMovieGenres(){
    return api.get('genre/movie/list').then(res=>localStorage.setItem('allMovieGenres', JSON.stringify(res.data.genres)))
}

export function getDiscoverMovies(param, page, genres, availabilities){
    const d = new Date()

    const year = d.getFullYear()
    const month = d.toLocaleString('default', {month: '2-digit'})
    const day = d.toLocaleString('default', {day: '2-digit'})

    const date = `${year}-${month}-${day}`
    
    if(param == 'primary_release_date.desc'){
        return api.get(`discover/movie?sort_by=${param}&with_genres=${genres}&with_watch_monetization_types=${availabilities}&watch_region=CA&page=${page}&primary_release_date.lte=${date}`)
    }
    return api.get(`discover/movie?sort_by=${param}&with_genres=${genres}&with_watch_monetization_types=${availabilities}&watch_region=CA&page=${page}`)
}

export function getMovieSearch(param, page = 1){
    return api.get(`search/movie?query=${encodeURI(param)}&page=${page}`)
}



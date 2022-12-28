import api from "./axiosInstance";

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
    return api.get(`/movie/${param}`)
}

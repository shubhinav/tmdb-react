import { imgBaseUrl } from "../API/axiosInstance"

export function makeImgUrl(url, size = 'original'){
    return `${imgBaseUrl}/${size}${url}`
}

export function convertMinsToHours(mins){
    const h = Math.floor(mins/60)
    const m = mins%60
    if(m === 0){
        return `${h}h`
    }
    else{
        return `${h}h ${m}m`
    }
}

export function convertDatefromISO(date, returnYearOnly = false){
    const d = new Date(date)
    if(returnYearOnly) return d.getFullYear()
    return d.toLocaleDateString()
}

export function getRatingColor(rating) {

    if(rating == 'nr') {
        return '#323232'
    }

    if (rating < 4) {
        return 'rgb(220, 0, 0)'
    }

    if (rating >= 4 && rating < 7) {
        return 'rgb(190, 160, 3)'
    }

    if (rating >= 7 && rating < 8) {
        return 'rgb(0, 191, 0)'
    }
    else {
        return 'green'
    }
}

export function truncateString(str, num = 300) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

export function getGenreById(genreIds) {

    const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))
    
    return genreIds.map(id => {
        // eslint-disable-next-line
        const genre = allGenres.find((genre) => genre.id == id)
        return genre.name
    })
}

export function getGenreNameFromId(id){
    const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))
    const genreObj = allGenres.find(genre=>genre.id == id)
    return genreObj.name
}
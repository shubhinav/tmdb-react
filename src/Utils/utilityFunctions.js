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

export function convertDatefromISO(date){
    const d = new Date(date)
    return d.toLocaleDateString()
}
import Header from "../../Components/Header/Header"
import FadeIn from "react-fade-in/lib/FadeIn"
import Loader from "../../Components/Utils/Loader/Loader"
import Hero from "../../Components/Hero/Hero"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { makeImgUrl, convertMinsToHours, convertDatefromISO } from "../../Utils/utilityFunctions"
import { getMovieDetails } from "../../API/api_calls"

export default function Details() {

    const params = useParams()

    const [details, setDetails] = useState()

    let regionReleaseDate;

    useEffect(() => {
        getMovieDetails(params.movieId).then(res => {
            setDetails(res.data)
        })
    }, [params.movieId])

    function getCertification() {


        function getOtherCertification() {
            const obj = details.release_dates.results.find(ent => {
                return ent.release_dates.find(date => date.certification !== "")
            })
            return obj.release_dates[0].certification
        }


        function getUsCertificate() {
            const usReleaseDates = details.release_dates.results.find(ent => ent.iso_3166_1 == 'US')
            if (usReleaseDates) {
                const usCertification = usReleaseDates.release_dates.find(ent => ent.certification)
                if (usCertification) {
                    return usCertification.certification
                }
                else {
                    return getOtherCertification()
                }
            }
            else {
                return getOtherCertification()
            }
        }

        const regionReleaseDates = details.release_dates.results.find(ent => ent.iso_3166_1 == 'CA')
        if (regionReleaseDates) {
            const regionalCertification = regionReleaseDates.release_dates.find(ent => ent.certification)
            let regionReleaseDateObj = regionReleaseDates.release_dates.find(ent => ent.type == "3")
            if (regionReleaseDateObj) {
                regionReleaseDate = regionReleaseDateObj.release_date
            }
            else {
                regionReleaseDateObj = regionReleaseDates.release_dates.find(ent => ent.type !== "")
                regionReleaseDate = regionReleaseDateObj.release_date
            }
            if (regionalCertification) {
                return regionalCertification.certification
            }
            else {
                return getUsCertificate()
            }
        }
        else {
            return getUsCertificate()
        }
    }

    function getRatingColor(rating) {

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
    return (
        <div>
            <Header />
            {details
                ?
                <FadeIn>
                    <Hero bgUrl={makeImgUrl(details.backdrop_path)} paddingY='2em' opacity="0.65">
                        <div className="details-page-hero d-flex align-items-center">
                            {details.poster_path
                                ?
                                <div className="details-page-hero-poster">
                                    <img src={makeImgUrl(details.poster_path, 'w500')} alt="" />
                                </div>
                                :
                                <></>}
                            <div className="details-page-hero-content d-flex flex-column gap-4">
                                <div>
                                    <h1 className="details-page-hero-content-title mb-1">{details.title}</h1>
                                    <div className="details-page-hero-content-tags d-flex align-items-center gap-3">
                                        {details.release_dates.results.length ? <p className="details-page-hero-content-tags-certification mb-0">{getCertification()}</p> : <></>}
                                        {regionReleaseDate || details.release_date ? <p className="mb-0">{regionReleaseDate ? convertDatefromISO(regionReleaseDate) : convertDatefromISO(details.release_date)}</p> : <></>}
                                        <p className="mb-0">{convertMinsToHours(details.runtime)}</p>
                                    </div>
                                </div>
                                <div className="details-page-hero-content-genres d-flex flex-wrap gap-1">
                                    {details.genres.map((ent, i) => {
                                        if (i == details.genres.length - 1) {
                                            return <p className="details-page-hero-content-genres-single mb-0">{ent.name}</p>
                                        }
                                        else {
                                            return <p className="details-page-hero-content-genres-single mb-0">{ent.name} &#x2022;</p>
                                        }
                                    })}
                                </div>
                                <p className="details-page-hero-content-overview mb-0">{details.overview}</p>
                                <div className="details-page-hero-content-rating-content d-flex align-items-center gap-2">
                                    <p style={{ backgroundColor: getRatingColor(details.vote_average) }} className="details-page-hero-content-rating m-0">{details.vote_average.toFixed(1)}</p>
                                    <div>
                                        <p className="mb-1">User Score</p>
                                        <p className="mb-0 details-page-hero-content-rating-count">Based on {details.vote_count} ratings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Hero>
                </FadeIn>
                :
                <div className="mt-5 pt-5"><Loader /></div>}
        </div>
    )
}
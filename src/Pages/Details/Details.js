import Header from "../../Components/Header/Header"
import FadeIn from "react-fade-in/lib/FadeIn"
import Loader from "../../Components/Utils/Loader/Loader"
import Hero from "../../Components/Hero/Hero"
import List from "../../Components/List/List"
import Footer from "../../Components/Footer/Footer"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { makeImgUrl, convertMinsToHours, convertDatefromISO } from "../../Utils/utilityFunctions"
import { getMovieDetails } from "../../API/api_calls"

export default function Details() {

    const params = useParams()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState()
    const [mainCrew, setMainCrew] = useState()
    const [trailers, setTrailers] = useState()
    const [recommendations, setRecommendations] = useState()

    let regionReleaseDate;

    useEffect(() => {

        window.scrollTo(0,0)

        setLoading(true)
        setDetails()
        setMainCrew()
        setTrailers()
        setRecommendations()

        getMovieDetails(params.movieId).then(res => {
            setDetails(res.data)
            getMainCrew(res.data)
            getTrailers(res.data)
            setRecommendations(res.data.recommendations.results)
            setLoading(false)
        }).catch(() => {
            setError(true)
            setLoading(false)
        })
    }, [params.movieId])

    function getMainCrew(data) {
        const crew = data.credits.crew.filter(ent => {
            return ent.job == "Director" || ent.job == "Writer" || ent.job == "Producer" || ent.job == "Casting"
        })
        setMainCrew(crew)
    }

    function getTrailers(data) {
        const vids = data.videos.results.filter(ent => {
            return ent.type == "Trailer" || ent.type == "Teaser"
        })
        setTrailers(vids)
    }

    function getCertification() {

        function getOtherCertification() {
            const obj = details.release_dates.results.find(ent => {
                return ent.release_dates.find(date => date.certification !== "")
            })
            if (obj) {
                return obj.release_dates[0].certification
            }
            else {
                return ""
            }
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

    function getWhereToWatch() {

        const myObj = details['watch/providers'].results

        if ("CA" in myObj) {
            if ('flatrate' in myObj.CA) {
                return (
                    <div>
                        <p style={{ fontSize: '1.15rem' }} className="mb-1">Now Streaming</p>
                        {myObj.CA.flatrate.map((ent, i) => {
                            return <img key={i} width='40px' height='40px' style={{ borderRadius: '5px', marginRight: '5px' }} src={makeImgUrl(ent.logo_path)} alt={ent.provider_name} />
                        })}
                    </div>
                )
            }

            if ('buy' in myObj.CA) {
                return (
                    <div>
                        <p style={{ fontSize: '1.15rem' }} className="mb-1">Buy or Rent</p>
                        {myObj.CA.buy.map((ent, i) => {
                            return <img key={i} width='40px' height='40px' style={{ borderRadius: '5px', marginRight: '5px' }} src={makeImgUrl(ent.logo_path)} alt={ent.provider_name} />
                        })}
                    </div>
                )
            }
            if ('rent' in myObj.CA) {
                return (
                    <div>
                        <p style={{ fontSize: '1.15rem' }} className="mb-1">Buy or Rent</p>
                        {myObj.CA.buy.map((ent,i) => {
                            return <img key={i} width='40px' height='40px' style={{ borderRadius: '5px', marginRight: '5px' }} src={makeImgUrl(ent.logo_path)} alt={ent.provider_name} />
                        })}
                    </div>
                )
            }
        }

        return <></>
    }

    return (
        <div>
            <Header />
            {error && <ErrorMessage />}
            {loading && <div className="mt-5 pt-5"><Loader /></div>}
            {!loading && !error &&
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
                                            return <p key={i} className="details-page-hero-content-genres-single mb-0">{ent.name}</p>
                                        }
                                        else {
                                            return <p key={i} className="details-page-hero-content-genres-single mb-0">{ent.name} &#x2022;</p>
                                        }
                                    })}
                                </div>
                                <p className="details-page-hero-content-overview mb-0">{details.overview}</p>
                                <div className="details-page-hero-content-rating-and-watch d-flex flex-wrap">
                                    <div className="details-page-hero-content-rating-content d-flex align-items-center gap-2">
                                        <p style={{ backgroundColor: getRatingColor(details.vote_average) }} className="details-page-hero-content-rating m-0">{details.vote_average.toFixed(1)}</p>
                                        <div>
                                            <p className="mb-1">User Score</p>
                                            <p className="mb-0 details-page-hero-content-rating-count">Based on {details.vote_count} ratings</p>
                                        </div>
                                    </div>
                                    {details['watch/providers']
                                        ?
                                        getWhereToWatch()
                                        : <></>}
                                </div>
                            </div>
                        </div>
                    </Hero>
                    {details.credits.cast.length ? <List title="Cast" data={details.credits.cast} /> : <></>}
                    {mainCrew.length ? <List title="Main Crew" data={mainCrew} /> : <></>}
                    {trailers.length ? <List title="Trailers & Teasers" data={trailers} /> : <></>}
                    {recommendations.length ? <List title="Recommendations" data={recommendations} /> : <></>}
                    <Footer />
                </FadeIn>}
        </div>
    )
}
import Header from "../Components/Header/Header"
import FadeIn from "react-fade-in/lib/FadeIn"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMovieDetails } from "../API/api_calls"

export default function Details() {

    const params = useParams()

    const [details, setDetails] = useState()

    useEffect(() => {
        getMovieDetails(params.movieId).then(res => {
            setDetails(res.data)
        })
    }, [params.movieId])

    return (
        <div>
            <Header />
            <FadeIn>
                <div className="content-container">
                    <h1>Details Page</h1>
                </div>
            </FadeIn>
        </div>
    )
}
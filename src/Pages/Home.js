import FadeIn from "react-fade-in/lib/FadeIn"
import Header from "../Components/Header/Header"
import Hero from "../Components/Hero/Hero"
import List from "../Components/List/List"
import Footer from "../Components/Footer/Footer"
import Loader from "../Components/Utils/Loader/Loader"
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage"
import { useState, useEffect } from "react"
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies } from "../API/api_calls"

export default function Home() {

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState(false)
    const [popularMovies, setPopularMovies] = useState()
    const [topRatedMovies, setTopRatedMovies] = useState();
    const [nowPlayingMovies, setNowPlayingMovies] = useState();
    const [upcomingMovies, setUpcomingMovies] = useState();

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    useEffect(() => {

        getPopularMovies()
        .then((res) => {
            setPopularMovies(res.data.results)
        })
        .catch(e => {
            setError(true)
        })

        getTopRatedMovies()
        .then((res => {
            setTopRatedMovies(res.data.results)
        }))
        .catch(e => {
            setError(true)
        })

        getNowPlayingMovies()
        .then(res=>{
            setNowPlayingMovies(res.data.results)
        })
        .catch(e=>{
            setError(true)
        })

        getUpcomingMovies()
        .then(res=>{
            setUpcomingMovies(res.data.results)
        })
        .catch(e=>{
            setError(true)
        })
    }, [])



    return (
        <>
            <Header page="home" />
            <FadeIn>
                <Hero inputValue={inputValue} handleChange={handleChange} handleSubmit={handleSubmit} />
                {error ? <ErrorMessage /> :
                    <div>
                        {popularMovies ? <List title={'Popular'} data={popularMovies} /> : <Loader />}
                        {topRatedMovies ? <List title={'Top Rated'} data={topRatedMovies} /> : <Loader />}
                        {nowPlayingMovies ? <List title={'Now in Theatres'} data={nowPlayingMovies} /> : <Loader />}
                        {upcomingMovies ? <List title={'Upcoming'} data={upcomingMovies} /> : <Loader />}
                    </div>}
                    <Footer/>
            </FadeIn>
        </>
    )
}
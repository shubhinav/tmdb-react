import FadeIn from "react-fade-in/lib/FadeIn"
import Header from "../../Components/Header/Header"
import Hero from "../../Components/Hero/Hero"
import List from "../../Components/List/List"
import Footer from "../../Components/Footer/Footer"
import Loader from "../../Components/Utils/Loader/Loader"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import bgImg from "../../assets/denise-jans-tV80374iytg-unsplash.jpg"
import Button from "../../Components/Utils/Button/Button"
import { Icon } from "@iconify/react"
import { useState, useEffect } from "react"
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies } from "../../API/api_calls"

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
            .then(res => {
                setNowPlayingMovies(res.data.results)
            })
            .catch(e => {
                setError(true)
            })

        getUpcomingMovies()
            .then(res => {
                setUpcomingMovies(res.data.results)
            })
            .catch(e => {
                setError(true)
            })
    }, [])



    return (
        <>
            <Header page="home" />
            <FadeIn>
                <Hero
                    inputValue={inputValue}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    bgUrl={bgImg}
                >
                    <div className='home-page-hero-content-heading'>
                        <h1 className='home-page-hero-content-title'>
                            Hero Area Tagline goes here, not decided yet.
                        </h1>
                        <h2 className='home-page-hero-content-subtitle'>
                            Hero area subtitle goes here.
                        </h2>
                    </div>
                    <form className='home-page-hero-content-form d-flex justify-content-between' onSubmit={handleSubmit}>
                        <input value={inputValue} onChange={handleChange} placeholder="Search for a movie or TV show" />
                        <Button fontSize='1.5rem' padding='0.25em 0.5em'><Icon icon="material-symbols:search-rounded" inline={true} /></Button>
                    </form>
                </Hero>
                {error ? <ErrorMessage /> :
                    <div>
                        {popularMovies ? <List title={'Popular'} data={popularMovies} /> : <Loader />}
                        {topRatedMovies ? <List title={'Top Rated'} data={topRatedMovies} /> : <Loader />}
                        {nowPlayingMovies ? <List title={'Now in Theatres'} data={nowPlayingMovies} /> : <Loader />}
                        {upcomingMovies ? <List title={'Upcoming'} data={upcomingMovies} /> : <Loader />}
                    </div>}
                <Footer />
            </FadeIn>
        </>
    )
}
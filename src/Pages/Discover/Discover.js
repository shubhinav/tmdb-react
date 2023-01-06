import './discover.css'
import Header from "../../Components/Header/Header";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loader from "../../Components/Utils/Loader/Loader"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import DiscoverCard from "../../Components/DiscoverCard/DisocverCard";
import { useState, useEffect, useCallback } from 'react'
import { getAllMovieGenres, getPopularMovies } from "../../API/api_calls";
import { Link } from "react-router-dom";

export default function Discover() {

    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [page, setPage] = useState(1)

    const linkResetStyles = {
        color: "var(--light-color)",
        textDecoration: 'none'
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.isIntersecting && setPage(prevPage => prevPage + 1)
        })
    })

    const lastElement = useCallback((node) => {
        if(node) return observer.observe(node)
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(page !== 1) {
            setIsPageLoading(true)
        }
        setIsError(false)
        getPopularMovies(page)
            .then((res) => {
                setMovieList(prevData => {
                    return [...prevData, ...res.data.results]
                })
                if (!localStorage.getItem('allMovieGenres')) {
                    getAllMovieGenres().then(() => setIsLoading(false))
                }
                else {
                    setIsLoading(false)
                }
            })
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            })
    }, [page])

    function getGenreById(genreIds) {
        const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))

        return genreIds.map(id => {
            // eslint-disable-next-line
            const genre = allGenres.find((genre) => genre.id == id)
            return genre.name
        })
    }

    return (
        <div>
            <Header page='discover' />
            <FadeIn>
                {isLoading && <Loader />}
                {isError && <ErrorMessage />}
                {(!isLoading && !isError) &&
                    <div className="content-container">
                        <div className="discover-movies-container mt-4">
                            {movieList.map((ent, i) => {
                                if (i === movieList.length - 1) return <Link key={ent.id} to={`/movie/${ent.id}`} ref={lastElement} style={linkResetStyles}><DiscoverCard data={ent} getGenreById={getGenreById} /></Link>
                                return <Link key={ent.id} to={`/movie/${ent.id}`} style={linkResetStyles}><DiscoverCard data={ent} getGenreById={getGenreById} /></Link>
                            })}
                        </div>
                        {isPageLoading && <Loader/>}
                    </div>}
            </FadeIn>
        </div>
    )
}
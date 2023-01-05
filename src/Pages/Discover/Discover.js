import './discover.css'
import Header from "../../Components/Header/Header";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loader from "../../Components/Utils/Loader/Loader"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import Button from "../../Components/Utils/Button/Button";
import DiscoverCard from "../../Components/DiscoverCard/DisocverCard";
import { useState, useEffect } from 'react'
import { getAllMovieGenres, getPopularMovies } from "../../API/api_calls";
import { Link } from "react-router-dom";

export default function Discover() {

    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [page, setPage] = useState(1)

    const linkResetStyles = {
        color: "var(--light-color)",
        textDecoration: 'none'
    }

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        getPopularMovies(page)
            .then((res) => {
                setMovieList(prevData => {
                    return [...prevData, ...res.data.results]
                })
                if(!localStorage.getItem('allMovieGenres')){
                    getAllMovieGenres().then(()=>setIsLoading(false))
                }
                else{
                    setIsLoading(false)
                }
            })
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            })
    }, [page])

    function getGenreById(genreIds){
        const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))

        return genreIds.map(id=>{
            const genre = allGenres.find((genre)=>genre.id == id)
            return genre.name
        })
    }

    function loadMore() {
        setPage(prevPage => prevPage + 1)
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
                            {movieList.map(ent => {
                                return <Link key={ent.id} to={`/movie/${ent.id}`} style={linkResetStyles}><DiscoverCard data={ent} getGenreById = {getGenreById} /></Link>
                            })}
                        </div>
                        <Button onClick={() => loadMore()}>Load more</Button>
                    </div>}
            </FadeIn>
        </div>
    )
}
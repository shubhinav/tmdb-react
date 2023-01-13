import './search.css'
import '../Discover/discover.css'
import DiscoverCard from "../../Components/DiscoverCard/DiscoverCard"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import Header from "../../Components/Header/Header"
import Loader from "../../Components/Utils/Loader/Loader"
import Button from '../../Components/Utils/Button/Button'
import { Icon } from '@iconify/react'
import { useState, useEffect, useRef } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getMovieSearch } from "../../API/api_calls"
import { linkResetStyles } from '../../Utils/utilityStyle'

export default function Search() {

    const param = useParams()
    const navigate = useNavigate()

    const inputRef = useRef()

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [searchList, setSearchList] = useState()
    const [searchQuery, setSearchQuery] = useState(param.query ? param.query : '')

    useEffect(() => {
        if (!param.query) inputRef.current.focus()
        setSearchList()
        setIsLoading(true)
        getMovieSearch(param.query)
            .then((res) => {
                setSearchList(res.data.results)
                setIsLoading(false)
            })
            .catch(() => {
                setIsError(true)
                setIsLoading(false)
            })
    }, [param.query])

    function handleChange(e) {
        setSearchQuery(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/search/${searchQuery}`)
    }

    function showContent() {
        if (!param.query) return <h3 className='mt-5 pt-5 text-center text-muted'>Search for a movie to show results...</h3>
        if (!searchList.length) return <ErrorMessage nothingToShow={true} />
        return (
            <div className='discover-movies-container mt-5'>
                {searchList.map(ent => {
                    if (ent.poster_path) return <Link to={`/movie/${ent.id}`} key={ent.id} style={linkResetStyles}><DiscoverCard data={ent} /></Link>
                    return
                })}
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="content-container">
                <form className='home-page-hero-content-form d-flex justify-content-between' onSubmit={handleSubmit}>
                    <input ref={inputRef} value={searchQuery} onChange={handleChange} placeholder="Search for a movie" />
                    <Button fontSize='1.5rem' padding='0.25em 0.5em'><Icon icon="material-symbols:search-rounded" inline={true} /></Button>
                </form>
                {isLoading && <div className='mt-5'><Loader /></div>}
                {isError && <ErrorMessage />}
                {!isLoading && !isError &&
                    showContent()}
            </div>
        </div>
    )
}
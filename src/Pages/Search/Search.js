import './search.css'
import DiscoverCard from "../../Components/DiscoverCard/DiscoverCard"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import Header from "../../Components/Header/Header"
import Loader from "../../Components/Utils/Loader/Loader"
import Button from '../../Components/Utils/Button/Button'
import { Icon } from '@iconify/react'
import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getMovieSearch } from "../../API/api_calls"
import { linkResetStyles } from '../../Utils/utilityStyles'
import FadeIn from "react-fade-in/lib/FadeIn"

export default function Search() {

    const param = useParams()
    const navigate = useNavigate()

    const inputRef = useRef()

    const [isLoading, setIsLoading] = useState(true)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [suggestionsList, setSuggestionsList] = useState([])
    const [showSuggestionList, setShowSuggestionList] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const observer = new IntersectionObserver((entries) => {
        if (hasMore) {
            entries.forEach(entry => {
                entry.isIntersecting && setPage(prevPage => prevPage + 1)
            })
        }
        return
    })

    const lastElement = useCallback((node) => {
        if (observer) observer.disconnect()
        if (node) return observer.observe(node)
    }, [])

    useEffect(() => {
        if (!param.query) inputRef.current.focus()

        setIsMoreLoading(true)
        setShowSuggestionList(false)
        if (param.query) {
            setSearchQuery(param.query)
            getMovieSearch(param.query, page)
                .then((res) => {
                    const array = res.data.results.filter(ent => ent.poster_path)
                    setSearchList(prevData => {
                        return [...prevData, ...array]
                    })
                    setIsLoading(false)
                    if (page == res.data.total_pages) setHasMore(false)
                })
                .catch(() => {
                    setIsError(true)
                    setIsLoading(false)
                })
        }
        else {
            setIsLoading(false)
        }
    }, [param.query, page])

    useEffect(() => {
        setSuggestionsList([])
        let controller = new AbortController();
        if (searchQuery) {
            getMovieSearch(searchQuery, 1, controller)
                .then((res) => {
                    res.data.results.map((movie) => {
                        if(movie.poster_path){
                            return setSuggestionsList((prevData) => {
                                return [...prevData, movie.title]
                            })
                        }
                        return
                    })
                })
                .catch(e => {
                    if (e.code == 'ERR_CANCELED') return
                })
        }
        return () => controller.abort()
    }, [searchQuery])

    function handleChange(e) {
        setSearchQuery(e.target.value)
        setShowSuggestionList(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (searchQuery === param.query) return
        setIsLoading(true)
        setIsError(false)
        setSearchList([])
        setPage(1)
        navigate(`/search/${searchQuery}`)
    }

    function handleSuggestionClick(e){
        if (param.query === e.target.innerHTML) return 
        setIsLoading(true)
        setIsError(false)
        setSearchList([])
        setPage(1)
        navigate(`/search/${e.target.innerHTML}`)
    }

    function showContent() {
        if (isLoading) return <div className='mt-5'><Loader /></div>
        if (isError) return <ErrorMessage />
        if (!param.query) return <h3 className='mt-5 pt-5 text-center text-muted'>Search for a movie to show results.</h3>
        if (!searchList.length) return <ErrorMessage nothingToShow={true} />
        return (
            <FadeIn>
                <div className='discover-movies-container mt-5'>
                    {searchList.map((ent, i) => {

                        if (i === searchList.length - 1) {
                            return <Link to={`/movie/${ent.id}`} key={ent.id} ref={lastElement} style={linkResetStyles}><DiscoverCard data={ent} /></Link>
                        }
                        return <Link to={`/movie/${ent.id}`} key={ent.id} style={linkResetStyles}><DiscoverCard data={ent} /></Link>

                    })}
                    {(isMoreLoading && hasMore) && <div><Loader /></div>}
                </div>
            </FadeIn>
        )
    }

    return (
        <div>
            <Header />
            <div className="content-container">
                <div className='position-relative'>
                    <form className='home-page-hero-content-form d-flex justify-content-between' onSubmit={handleSubmit}>
                        <input ref={inputRef} value={searchQuery} onChange={handleChange} placeholder="Search for a movie" />
                        <Button disabled={!searchQuery} fontSize='1.5rem' padding='0.25em 0.5em'><Icon icon="material-symbols:search-rounded" inline={true} /></Button>
                    </form>
                    <div className={showSuggestionList ? 'suggestion-div' : 'd-none'}>
                        {suggestionsList.map((title, i) => <p key={i} className='suggestion-item' onClick={handleSuggestionClick}>{title}</p>)}
                    </div>
                </div>
                {showContent()}
            </div>
        </div>
    )
}
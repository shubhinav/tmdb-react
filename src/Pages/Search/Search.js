import DiscoverCard from "../../Components/DiscoverCard/DiscoverCard"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import Header from "../../Components/Header/Header"
import Loader from "../../Components/Utils/Loader/Loader"
import Button from '../../Components/Utils/Button/Button'
import { Icon } from '@iconify/react'
import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getMovieSearch } from "../../API/api_calls"
import { linkResetStyles } from '../../Utils/utilityStyle'

export default function Search() {

    const param = useParams()
    const navigate = useNavigate()

    const inputRef = useRef()

    const [isLoading, setIsLoading] = useState(true)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [searchQuery, setSearchQuery] = useState(param.query ? param.query : '')
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

        if (param.query) {
            getMovieSearch(param.query, page)
                .then((res) => {
                    const array = res.data.results.filter(ent=> ent.poster_path)
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

    function handleChange(e) {
        setSearchQuery(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        setIsError(false)
        setSearchList([])
        navigate(`/search/${searchQuery}`)
    }

    function showContent() {
        if (isLoading) return <div className='mt-5'><Loader /></div>
        if (isError) return <ErrorMessage />
        if (!param.query) return <h3 className='mt-5 pt-5 text-center text-muted'>Search for a movie to show results.</h3>
        if (!searchList.length) return <ErrorMessage nothingToShow={true} />
        return (
            <div className='discover-movies-container mt-5'>
                {searchList.map((ent, i) => {

                    if (i === searchList.length - 1) {
                        return <Link to={`/movie/${ent.id}`} key={ent.id} ref={lastElement} style={linkResetStyles}><DiscoverCard data={ent} /></Link>
                    }
                    return <Link to={`/movie/${ent.id}`} key={ent.id} style={linkResetStyles}><DiscoverCard data={ent} /></Link>

                })}
                {(isMoreLoading && hasMore) && <div><Loader /></div>}
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="content-container">
                <form className='home-page-hero-content-form d-flex justify-content-between' onSubmit={handleSubmit}>
                    <input ref={inputRef} value={searchQuery} onChange={handleChange} placeholder="Search for a movie" />
                    <Button disabled={!searchQuery} fontSize='1.5rem' padding='0.25em 0.5em'><Icon icon="material-symbols:search-rounded" inline={true} /></Button>
                </form>
                {showContent()}
            </div>
        </div>
    )
}
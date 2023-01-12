import './discover.css'
import Header from "../../Components/Header/Header";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loader from "../../Components/Utils/Loader/Loader"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import DiscoverCard from "../../Components/DiscoverCard/DisocverCard";
import Select from 'react-select'
import { useState, useEffect, useCallback } from 'react'
import { getDiscoverMovies } from "../../API/api_calls";
import { Link } from "react-router-dom";

export default function Discover() {

    const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))

    const sortByOptions = [
        { value: 'popularity.desc', label: 'Popularity' },
        { value: 'vote_average.desc', label: 'Rating' },
        { value: 'primary_release_date.desc', label: 'Release Date' }
    ]

    // const genreOptions = getGenreOptions

    const selectStyles = {

        control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'var(--mid-dark-color)',
            borderColor: 'rgba(255,255,255,0.3)',
            minWidth: '300px'
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'var(--mid-dark-color)',
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'var(--light-color)',
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? 'var(--dark-color)' : 'var(--mid-dark-color)',
        }),
    }

    const [isLoading, setIsLoading] = useState(true)
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [page, setPage] = useState(1)
    const [hasMorePages, setHasMorePages] = useState(true)

    // FILTER STATES

    const [sortBy, setSortBy] = useState('popularity.desc')
    const [genres, setGenres] = useState("")
    const [sortByChange, setSortByChange] = useState(false)
    const [genreChange, setGenreChange] = useState(false)

    const linkResetStyles = {
        color: "var(--light-color)",
        textDecoration: 'none'
    }

    const observer = new IntersectionObserver(entries => {
        if (hasMorePages){
            entries.forEach(entry => {
                entry.isIntersecting && setPage(prevPage => prevPage + 1)
            })
        }
        return
    })

    const lastElement = useCallback((node) => {
        if (node) return observer.observe(node)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (page !== 1 ) {
            setIsPageLoading(true)
        }
        setIsError(false)

        getDiscoverMovies(sortBy, page, genres)
            .then((res) => {
                setMovieList(prevData => {
                    if (sortByChange || genreChange) return res.data.results
                    return [...prevData, ...res.data.results]
                })
                setSortByChange(false)
                setGenreChange(false)
                setIsLoading(false)
                if(page == res.data.total_pages){
                    setHasMorePages(false)
                }
            })
            .catch(() => {
                setIsLoading(false)
                setIsError(true)
            })
    }, [page, sortBy, genres])

    function getGenreById(genreIds) {
        return genreIds.map(id => {
            // eslint-disable-next-line
            const genre = allGenres.find((genre) => genre.id == id)
            return genre.name
        })
    }

    function handleSortByChange(selectedValue) {
        setIsLoading(true)
        setPage(1)
        setSortByChange(true)
        setSortBy(selectedValue.value)
    }

    function getGenreOptionsForSelect(){
        return allGenres.map(genre=>{
            return {value: genre.id, label: genre.name}
        })
    }

    function handleGenreChange(selectedValue){
        setIsLoading(true)
        setGenreChange(true)
        setPage(1)
        const array = selectedValue.map(ent=>{
            return ent.value
        })
        setGenres(array.toString())
    }

    return (
        <div>
            <Header page='discover' />
            <div className='content-container discover-filters d-flex gap-3 flex-wrap'>
                <Select placeholder="Sort By" onChange={(selectedValue) => handleSortByChange(selectedValue)} options={sortByOptions} styles={selectStyles} />
                <Select placeholder="Select Genres" onChange={(selectedValue) => handleGenreChange(selectedValue)} isMulti options={getGenreOptionsForSelect()} styles={selectStyles} />
            </div>
            <FadeIn>
                {isLoading && <div className='mt-5'><Loader /></div>}
                {isError && <ErrorMessage />}
                {(!isLoading && !isError) &&
                    <div className="content-container">
                        {movieList.length ? <div className="discover-movies-container mt-4">
                            {movieList.map((ent, i) => {
                                if (ent.poster_path) {
                                    if (i === movieList.length - 1) return <Link key={ent.id} to={`/movie/${ent.id}`} ref={lastElement} style={linkResetStyles}><DiscoverCard data={ent} getGenreById={getGenreById} /></Link>
                                    return <Link key={ent.id} to={`/movie/${ent.id}`} style={linkResetStyles}><DiscoverCard data={ent} getGenreById={getGenreById} /></Link>
                                }
                                return
                            })}
                        </div>:<ErrorMessage nothingToShow={true}/>}
                        {(isPageLoading && hasMorePages) && <Loader />}
                    </div>}
            </FadeIn>
        </div>
    )
}
import './discover.css'
import Header from "../../Components/Header/Header";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loader from "../../Components/Utils/Loader/Loader"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import DiscoverCard from "../../Components/DiscoverCard/DiscoverCard";
import Select from 'react-select'
import { useState, useEffect, useCallback } from 'react'
import { getDiscoverMovies } from "../../API/api_calls";
import { getGenreNameFromId } from '../../Utils/utilityFunctions';
import { linkResetStyles } from '../../Utils/utilityStyle';
import { Link } from "react-router-dom";

export default function Discover({ sortBy, setSortBy, genres, setGenres }) {

    const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))

    const sortByOptions = [
        { value: 'popularity.desc', label: 'Popularity' },
        { value: 'vote_average.desc', label: 'Rating' },
        { value: 'primary_release_date.desc', label: 'Release Date' }
    ]

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
        input: (baseStyles) => ({
            ...baseStyles,
            color: 'var(--light-color)',
            caretColor: 'var(--light-color)'
        }),
        multiValue: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'var(--dark-color)',
            color: 'var(--light-color)',
        }),
        multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: 'var(--light-color)'
        }),
        multiValueRemove: (baseStyles, state) => (
            {
                ...baseStyles,
                color: 'var(--light-color)',
                borderRadius: '5px',
                ":hover": { background: "transparent" }
            }),

    }

    const [isLoading, setIsLoading] = useState(true)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [page, setPage] = useState(1)
    const [hasMorePages, setHasMorePages] = useState(true)

    const observer = new IntersectionObserver(entries => {
        if (hasMorePages) {
            entries.forEach(entry => {
                entry.isIntersecting && setPage(prevPage => prevPage + 1)
            })
        }
        return
    })

    const lastElement = useCallback((node) => {
        if (observer) observer.disconnect()
        if (node) return observer.observe(node)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        setIsMoreLoading(true)
        setIsError(false)

        getDiscoverMovies(sortBy, page, genres)
            .then((res) => {
                const array = res.data.results.filter(ent=>ent.poster_path)
                setMovieList(prevData => {
                    return [...prevData, ...array]
                })
                setIsLoading(false)
                setIsMoreLoading(false)
                if (page == res.data.total_pages) {
                    setHasMorePages(false)
                }
            })
            .catch(() => {
                setIsLoading(false)
                setIsMoreLoading(false)
                setIsError(true)
            })
    }, [page, sortBy, genres])

    function getGenreOptionsForSelect() {
        return allGenres.map(genre => {
            return { value: genre.id, label: genre.name }
        })
    }

    function handleSortByChange(selectedValue) {
        setIsLoading(true)
        setPage(1)
        setMovieList([])
        setSortBy(selectedValue.value)
    }

    function handleGenreChange(selectedValue) {
        setIsLoading(true)
        setPage(1)
        setMovieList([])
        const array = selectedValue.map(ent => {
            return ent.value
        })
        setGenres(array.toString())
    }

    function getDefaultValueSortBy() {
        return sortByOptions.find(ent => ent.value == sortBy)
    }

    function getDefaultValueGenres() {

        if (genres) {
            const array = genres.split(',')
            return array.map(genre => {
                return { value: genre, label: getGenreNameFromId(genre) }
            })
        }

        return

    }

    return (
        <div>
            <Header page='discover' />
            <div className='content-container discover-filters d-flex gap-3 flex-wrap'>
                <div>
                    <label className='discover-filter-label'>Sort By</label>
                    <Select placeholder="Select Sorting" defaultValue={getDefaultValueSortBy()} onChange={(selectedValue) => handleSortByChange(selectedValue)} options={sortByOptions} styles={selectStyles} />
                </div>
                <div>
                    <label className='discover-filter-label'>Genres</label>
                    <Select placeholder="Select Genres" defaultValue={getDefaultValueGenres()} onChange={(selectedValue) => handleGenreChange(selectedValue)} isMulti options={getGenreOptionsForSelect()} styles={selectStyles} />
                </div>
            </div>
            <FadeIn>
                {isLoading && <div className='mt-5'><Loader /></div>}
                {isError && <ErrorMessage />}
                {(!isLoading && !isError) &&
                    <div className="content-container">
                        {movieList.length ? <div className="discover-movies-container mt-4">
                            {movieList.map((ent, i) => {
                                if (i === movieList.length - 1) return <Link key={ent.id} to={`/movie/${ent.id}`} ref={lastElement} style={linkResetStyles}><DiscoverCard data={ent} /></Link>
                                return <Link key={ent.id} to={`/movie/${ent.id}`} style={linkResetStyles}><DiscoverCard data={ent} /></Link>
                            })}
                        </div> : <ErrorMessage nothingToShow={true} />}
                        {(isMoreLoading && hasMorePages) && <Loader />}
                    </div>}
            </FadeIn>
        </div>
    )
}
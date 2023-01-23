import './discover.css'
import Header from "../../Components/Header/Header";
import FadeIn from "react-fade-in/lib/FadeIn";
import Loader from "../../Components/Utils/Loader/Loader"
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage"
import DiscoverCard from "../../Components/DiscoverCard/DiscoverCard";
import Button from '../../Components/Utils/Button/Button'
import Select from 'react-select'
import { useState, useEffect, useCallback, useRef } from 'react'
import { getDiscoverMovies } from "../../API/api_calls";
import { getGenreNameFromId } from '../../Utils/utilityFunctions';
import { linkResetStyles, selectStyles } from '../../Utils/utilityStyles';
import { Link } from "react-router-dom";

export default function Discover({ sortBy, setSortBy, genres, setGenres, availabilities, setAvailabilities }) {

    const allGenres = JSON.parse(localStorage.getItem('allMovieGenres'))

    const availabilitySelectRef = useRef()
    const genreSelectRef = useRef()
    const sortBySelectRef = useRef()

    const sortByOptions = [
        { value: 'popularity.desc', label: 'Most Popular' },
        { value: 'vote_average.desc', label: 'Highest Rating' },
        { value: 'primary_release_date.desc', label: 'Latest' }
    ]

    function getGenreOptionsForSelect() {
        return allGenres.map(genre => {
            return { value: genre.id, label: genre.name }
        })
    }

    const availabilityOptions = [
        { value: 'flatrate', label: 'Streaming' },
        { value: 'free', label: 'Free' },
        { value: 'ads', label: 'With Ads' },
        { value: 'rent', label: 'Rent' },
        { value: 'buy', label: 'Buy' },
    ]

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

        getDiscoverMovies(sortBy, page, genres, availabilities)
            .then((res) => {
                const array = res.data.results.filter(ent => ent.poster_path)
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
    }, [page, sortBy, genres, availabilities])

    function handleSortByChange(selectedValue) {
        if (selectedValue.value == sortBy) return
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

    function handleAvailabilitiesChange(selectedValue) {
        setIsLoading(true)
        setPage(1)
        setMovieList([])
        const array = selectedValue.map(ent => {
            return ent.value
        })
        setAvailabilities(array.toString())
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

    function getDefaultValueAvailabilities() {
        const array = availabilities.split(',')

        return array.map((ent) => {
            return availabilityOptions.find((option) => option.value == ent)
        })
    }

    function resetFilters(){
        if(sortBy == 'popularity.desc' && genres == '' && availabilities == '') return
        setIsLoading(true)
        setPage(1)
        setMovieList([])
        availabilitySelectRef.current.clearValue()
        genreSelectRef.current.clearValue()
        sortBySelectRef.current.setValue(()=>{
            return { value: 'popularity.desc', label: 'Most Popular' }
        })
        setSortBy('popularity.desc')
        setGenres('')
        setAvailabilities('')
    }

    return (
        <div>
            <Header page='discover' />
            <div className='content-container discover-filters d-flex gap-3 flex-wrap'>
                <div>
                    <label className='discover-filter-label'>Sort By</label>
                    <Select placeholder="Select Sorting"
                        ref={sortBySelectRef}
                        defaultValue={getDefaultValueSortBy()}
                        onChange={(selectedValue) => handleSortByChange(selectedValue)}
                        options={sortByOptions}
                        styles={selectStyles}
                    />
                </div>
                <div>
                    <label className='discover-filter-label'>Genres</label>
                    <Select placeholder="Select Genres"
                        ref={genreSelectRef}
                        defaultValue={getDefaultValueGenres()}
                        onChange={(selectedValue) => handleGenreChange(selectedValue)}
                        isMulti
                        options={getGenreOptionsForSelect()}
                        styles={selectStyles}
                    />
                </div>
                <div>
                    <label className='discover-filter-label'>Availability</label>
                    <Select placeholder="Select Availability"
                        ref={availabilitySelectRef}
                        isMulti
                        defaultValue={getDefaultValueAvailabilities()}
                        onChange={(selectedValue) => handleAvailabilitiesChange(selectedValue)}
                        options={availabilityOptions}
                        styles={selectStyles}
                    />
                </div>

                <div className='align-self-end'><Button onClick={resetFilters} borderRadius="5px">Reset Filters</Button></div>

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
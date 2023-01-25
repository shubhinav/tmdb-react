import './app.css'
import Home from './Pages/Home/Home';
import Discover from './Pages/Discover/Discover';
import Details from './Pages/Details/Details';
import Search from './Pages/Search/Search';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import Loader from './Components/Utils/Loader/Loader';
import ScrollToTop from "react-scroll-to-top";
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import { getAllMovieGenres } from './API/api_calls';

export default function App() {

  const { theme } = useContext(ThemeContext)

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // FILTER STATES FOR DISCOVER PAGE (added here to maintain filters through renders)
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [genres, setGenres] = useState("")
  const [availabilities, setAvailabilities] = useState("")

  useEffect(() => {
    if (!localStorage.getItem('allMovieGenres')) {
      getAllMovieGenres().then((res) => {
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
        setIsError(true)
      })
    }
    else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {

    localStorage.setItem('currentTheme', theme)

    if (theme === 'dark') {
      document.documentElement.style.setProperty('--dark-color', '#323232')
      document.documentElement.style.setProperty('--light-color', '#fafafa')
      document.documentElement.style.setProperty('--mid-dark-color', '#444')
    }

    if (theme === 'light') {
      document.documentElement.style.setProperty('--dark-color', '#fafafa')
      document.documentElement.style.setProperty('--light-color', '#323232')
      document.documentElement.style.setProperty('--mid-dark-color', '#e8e8e8')
    }


  }, [theme])


  if (isLoading) return <div className='mt-5 pt-5'><Loader /></div>
  if (isError) return <div className='mt-5'><ErrorMessage /></div>

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/discover" element={<Discover sortBy={sortBy} setSortBy={setSortBy} genres={genres} setGenres={setGenres} availabilities={availabilities} setAvailabilities={setAvailabilities} />} />
        <Route path="/movie/:movieId" element={<Details />} />
        <Route path="*" element={<ErrorMessage allowRedirect={true} />} />
        <Route path="/search" element={<Search />}>
          <Route path=':query' element={<Search />} />
        </Route>
      </Routes>
      <ScrollToTop smooth top={1000} color='var(--light-color)' width='20px' height='20px' className='scroll-to-top' />
    </div>
  );
}

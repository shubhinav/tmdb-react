import Home from './Pages/Home/Home';
import Discover from './Pages/Discover/Discover';
import Details from './Pages/Details/Details';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import Loader from './Components/Utils/Loader/Loader';
import {Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getAllMovieGenres } from './API/api_calls';

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(!localStorage.getItem('allMovieGenres')){
      getAllMovieGenres().then(()=>setIsLoading(false))
    }
    setIsLoading(false)
  },[])

  if (isLoading) return <div className='mt-5 pt-5'><Loader/></div>

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/movie/:movieId" element={<Details/>}/>
        <Route path="*" element={<ErrorMessage allowRedirect={true}/>}/>
      </Routes>
    </div>
  );
}

export default App;

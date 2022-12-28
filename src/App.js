import Home from './Pages/Home';
import Discover from './Pages/Discover';
import Details from './Pages/Details';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import {Routes, Route} from 'react-router-dom'

function App() {

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

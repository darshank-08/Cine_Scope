
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from "./pages/About"
import Details from './pages/Details'
import SearchResult from './pages/SearchResult'
import Fevorites from './pages/Fevorites'

function App() {

  return (

    <div className='root'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/SearchResult" element={<SearchResult />} />
        <Route path="/Fevorites" element={<Fevorites />} />
    </Routes>
    </div>
  )
}

export default App

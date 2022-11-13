import React from 'react'
//import Search from './components/Search'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Homepage  from './pages/Homepage'
import About from './pages/About'
import { Routes, Route} from 'react-router-dom'
import './styles/style.css'

const App = () => {
  return (
    <div className="App">
      <Nav />
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
      <Footer />
    </div>
  )
}

export default App
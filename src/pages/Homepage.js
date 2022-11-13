import React from 'react'
import Search from '../components/Search'

const Homepage = () => {
  const auth = process.env.REACT_APP_PEXELS_SECRET
  return (
    <div style={{minHeight: '100vh'}}>
      <Search />
    </div>
  )
}

export default Homepage
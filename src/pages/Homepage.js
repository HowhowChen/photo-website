import React, { useState, useEffect } from 'react'
import Search from '../components/Search'
import Picture from '../components/Picture'

const Homepage = () => {
  const [input, setInput ] = useState('')
  const [data, setData] = useState(null)
  const auth = process.env.REACT_APP_PEXELS_SECRET
  const initialUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15"
  const searchUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`

  //  fetch data from pexels api
  const search = async (url) => {
    const dataFetch = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    })
    let parsedData = await dataFetch.json()
    setData(parsedData.photos)
  }

  //  fetch data when page loads up
  useEffect(() => {
    search(initialUrl)
  }, [])

  return (
    <div style={{minHeight: '100vh'}}>
      <Search search={() => search(searchUrl)} setInput={setInput} />
      <div className='pictures'>
        {data && data.map((d, index) => {
          return <Picture data={d} key={index}/>
        })}
      </div>
    </div>
  )
}

export default Homepage
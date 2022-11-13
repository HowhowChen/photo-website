import React, { useState, useEffect } from 'react'
import Search from '../components/Search'
import Picture from '../components/Picture'

const Homepage = () => {
  const [input, setInput ] = useState('')
  let [data, setData] = useState(null)
  let [page, setPage] = useState(1)
  let [currentSearch, setCurrentSearch] = useState('')
  const auth = process.env.REACT_APP_PEXELS_SECRET
  const initialUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15"
  const searchUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`

  //  fetch data from pexels api
  const search = async (url) => {
    setPage(2)
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

  //  load more pictures  
  const morePicture = async () => {
    let newUrl
    if (currentSearch === '') {
      newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
    } else {
      newUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
    }
    setPage(page + 1)
    const dataFetch = await fetch(newUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    })
    let parsedData = await dataFetch.json()
    setData(data.concat(parsedData.photos))
  }

  //  fetch data when page loads up
  useEffect(() => {
    search(initialUrl)
  }, [])

  useEffect(() => {
    if (currentSearch === '') {
      search(initialUrl)
    } else {
      search(searchUrl)
    }
  }, [currentSearch])

  return (
    <div style={{minHeight: '100vh'}}>
      <Search search={() => {
          //  JS closure
          setCurrentSearch(input)
        }} 
        setInput={setInput} 
      />
      <div className='pictures'>
        {data && data.map((d, index) => {
          return <Picture data={d} key={index}/>
        })}
      </div>

      <div className="morePicture">
        <button onClick={morePicture}>Load More</button>
      </div>
    </div>
  )
}

export default Homepage
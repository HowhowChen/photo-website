import React, { useState } from 'react'
import Search from '../components/Search'
import Picture from '../components/Picture'

const Homepage = () => {
  const [input, setInput ] = useState('')
  const searchUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`
  const [data, setData] = useState(null)
  const auth = process.env.REACT_APP_PEXELS_SECRET
  const initialUrl = "https://api.pexels.com/v1/curated?page=1&per_page=15"
  const search = async () => {
    const dataFetch = await fetch(initialUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth
      }
    })
    let parsedData = await dataFetch.json()
    setData(parsedData.photos)
  }

  return (
    <div style={{minHeight: '100vh'}}>
      <Search search={search}/>
      <div className='pictures'>
        {data && data.map((d, index) => {
          console.log(d.src.large)
          return <Picture data={d} key={index}/>
        })}
      </div>
    </div>
  )
}

export default Homepage
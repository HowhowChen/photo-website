import React from 'react'

const Search = ({ search, setInput }) => {
  
  const inputHandler = event => {
    setInput(event.target.value)
  }

  return (
    <div className="search">
      <input onChange={inputHandler} type="text"/>
      <button onClick={search}>Search</button>
    </div>
  )
}

export default Search

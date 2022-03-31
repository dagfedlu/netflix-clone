import React, { useEffect, useState } from 'react'
import axios from './axios'


function Row({ title, fetchUrl }) {

  const [movies, setMovies] = useState([]);

  // a snippet of code which runs based on a specific set of variables
  useEffect(() => {
    // if [], run once when the row loads and dont run again
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        //console.log(request.data.results);
        setMovies(request.data.results);
        return request;
    }
    fetchData();

  }, [fetchUrl]);

  console.table(movies);
  
  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className='row__posters'>
        { /*several row posts*/ }
        {movies.map(movie => (
            <img src={movie.poster_path} alt={movie.name}/>
        ))}
        </div>
    </div>
  )
}

export default Row
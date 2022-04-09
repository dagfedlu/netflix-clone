import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'

//base url to append to the poster_path
const base_url = "https://image.tmdb.org/t/p/original/"; 

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
            <img
                key={movie.id}
                className='row__poster' 
                src={`${base_url}${movie.poster_path}`} 
                alt={movie.name}/>
        ))}
        </div>
    </div>
  )
}

export default Row
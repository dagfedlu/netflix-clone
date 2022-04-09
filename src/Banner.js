import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movie, setMovie] = useState([]);
  
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

  return (
    <header 
    className='banner'
    style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
            ${base_url}${movie?.backdrop_path}
        )`,
        backgroundPosition: 'center center',
    }}
    >
        <div className='banner__contents'>
        <h1>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__desciption'>{movie?.overview}</h1>
        </div>             
    </header>  
  )
}

export default Banner
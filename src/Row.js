import movieTrailer from 'movie-trailer'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import axios from './axios'
import './Row.css'

//base url to append to the poster_path
const base_url = "https://image.tmdb.org/t/p/original/"; 

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerUrl] = useState('');

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

  //trailers from youtube
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //when tumbnail is clicked
  const handleClick = (movie) => {
    if (trailerURL) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      }).catch(error => console.log(error))
    }
  } 

  // console.table(movies);
  
  return (
    <div className='row'>
        <h2 style={{color:'white',}}>{title}</h2>
        <div className='row__posters'>
        { /*several row posts*/ }
        {movies.map(movie => (
            <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}/>
        ))}
        </div>
        <YouTube videoId={trailerURL} opts={opts} />
    </div>
  )
}

export default Row
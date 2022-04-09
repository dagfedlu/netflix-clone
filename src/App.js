import React from 'react'
import './App.css'
import Row from './Row'
import requests from './requests'

function App() {
  return (
    <div className='App'>
      <h1>hi there, ready to build an instagram-clone</h1>
      <Row title='on Netflix' fetchUrl={requests.fetchNetflixOriginals}/>
      <Row title='Trending Now!' fetchUrl={requests.fetchTrending}/>
    </div>
  );
}

export default App;

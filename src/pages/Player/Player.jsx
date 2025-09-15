import React, { useEffect, useState } from 'react'
import './Player.css'
import back_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'



const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  //const bearer = process.env.TMDB_API_READ_ACCESS_TOKEN;

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //Authorization: `Bearer ${bearer}`
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjMzZTFiNmJkNDk3OGNjMWNmMjRhODdjNTBlN2QwNSIsIm5iZiI6MTc1NzYwNjIwNi43NzYsInN1YiI6IjY4YzJmMTNlZTViMGM2ZWI3ZDk0OTNkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J9Y8Fp1jRkE1itw2Apq-u8qaw1e9t7l1cSGmkRup1bQ'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  
  //console.log('Bearer ', {bearer})

  return (
    <div className='player'>
      <img src={back_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player

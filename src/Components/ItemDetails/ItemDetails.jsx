import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetails() {
  let { id, type } = useParams();
  const [Details, setDetails] = useState({});
  useEffect(() => {
    getTrending(id, type);
  }, []);
  async function getTrending(id, type) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=848a04138bc7d7539230772cd40ae2a6&language=en-US`
    ).catch((err)=>{console.log(err)});
    console.log(data);
    setDetails(data);
    
  }
  return <>
  {Details?<>
  <div className="row p-4">
    <div className="col-md-3">
        <div className="">
        {Details.poster_path? <img src={"https://image.tmdb.org/t/p/w500" + Details.poster_path} className="w-100" alt=""/>: 
            <img src={"https://image.tmdb.org/t/p/w185/" + Details.profile_path} className="w-100" alt=""/>
        }

        </div>
    </div>
    <div className="col-md-8  d-flex align-items-center justify-content-center p-md-5">
        <div>
        <h3 className="titles text-center">
            {Details.title} {Details.name}
        </h3>
        <p className="text-muted text-center">{Details.overview} {Details.biography}</p>
        {Details.vote_average?<h4 className="h5 p-1">Vote Average : <span className="text-white">{Details.vote_average}</span></h4>:""}
        {Details.vote_count?<h4 className="h5 p-1">Vote count :  <span className="text-white">{Details.vote_count}</span></h4>:""}
        {Details.number_of_seasons?<h4 className="h5 p-1">Number_of_seasons :  <span className="text-white">{Details.number_of_seasons}</span></h4>:""}
        {Details.spoken_languages?<h4 className="h5 p-1">Original_language :  <span className="text-white">{Details.spoken_languages[0].english_name}</span></h4>:""}
        {Details.origin_country?<h4 className="h5 p-1">Origin_country :  <span className="text-white">{Details.origin_country[0]}</span></h4>:""}
        {Details.homepage? <a className="btn btn-info text-decoration-none text-white link my-1" target={'_blank'} href={Details.homepage}>Go to home </a>:""} 
        </div>
        
    </div>
  </div>
  </>:<div className='d-flex vh-100 justify-content-center align-items-center '> 
    <i className='fas fa-spinner fa-spin fa-8x text-white'></i></div>}
  
  </>
}

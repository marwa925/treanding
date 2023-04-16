import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import MoviesCom from '../MoviesCom/MoviesCom';


export default function Home() {
  const [movies, setmovies] = useState([]);
  const [Tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(()=>{
    getTrending('movie',setmovies);
    getTrending('tv',setTv);
    getTrending('person',setPeople);
  },[])
  async function getTrending (type,callBack){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=848a04138bc7d7539230772cd40ae2a6`)
    console.log(data.results)
    callBack(data.results)
  }
  return <>
  {movies[0]?  <>
    <div className="row py-3 g-3">
      <div className='col-md-4 d-flex align-items-center'>
        <div>
          <div className='brdr w-25 mb-3'></div>
          <h2 className='h3'>Trending <br />Movies <br /> To Watch Now</h2>
          <p className='text-muted'>Most Watched Movies By Week</p>
          <div className='brdr w-100 mt-3'></div>
        </div>
      </div>
        {movies.slice(0,10).map((items,i) => <MoviesCom  items={items} key={i}/>)}
    </div>
    <div className="row py-3 g-3">
      <div className='col-md-4 d-flex align-items-center'>
        <div>
          <div className='brdr w-25 mb-3'></div>
          <h2 className='h3'>Trending <br />Tv <br /> To Watch Now</h2>
          <p className='text-muted'>Most Watched Tv By Week</p>
          <div className='brdr w-100 mt-3'></div>
        </div>
      </div>
        {Tv.slice(0,10).map((items,i) => <MoviesCom  items={items} key={i}/>)}
    </div>
    <div className="row py-3 g-3">
      <div className='col-md-4 d-flex align-items-center'>
        <div>
          <div className='brdr w-25 mb-3'></div>
          <h2 className='h3'>Trending <br />people <br /> To Watch Now</h2>
          <p className='text-muted'>Most Watched people By Week</p>
          <div className='brdr w-100 mt-3'></div>
        </div>
      </div>
        {people.slice(0,10).map((items,i) => <MoviesCom  items={items} key={i}/>)}
    </div>
    </>:<div className='d-flex vh-100 justify-content-center align-items-center '> 
    <i className='fas fa-spinner fa-spin fa-8x text-white'></i></div>}

    </>
    
}

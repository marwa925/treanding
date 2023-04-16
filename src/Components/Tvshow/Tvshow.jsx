import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tvshow() {
    const [tv, setTv] = useState([]);
    let nums= new Array(10).fill(1).map((el,i)=> i+1);
    useEffect(() => {
      getTv(1);
    }, []);
    async function getTv(page) {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=848a04138bc7d7539230772cd40ae2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
      console.log(data.results);
      setTv(data.results);
      
    }
    return <>
    {tv[0]?<>
      <div className="row g-3">
        {tv.map((item,i)=><div key={i} className="col-md-3">
        <Link className="text-decoration-none text-white" to={`/itemsDetails/${item.id}/tv`}>
          <div className="position-relative">
           <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} className="w-100" alt=""/>
           <h5 className="titles text-center mt-1"> {item.name} </h5>
           <div className="vote top-0 end-0 position-absolute p-1">
                {item.vote_average}
            </div>
          </div>
        </Link>
        </div>
        )}
        
      </div>
      <nav >
      <ul className="pagination pagination-sm d-flex justify-content-center my-3">
        {nums.map((page,i)=>
        <li className="page-item" key={i} onClick={()=>getTv(page)}>
          <Link className="page-link text-white bg-transparent">{page}</Link>
        </li>
        )}
      </ul>
      </nav>
    </> :<div className='d-flex vh-100 justify-content-center align-items-center '> 
    <i className='fas fa-spinner fa-spin fa-8x text-white'></i></div>}
     
    </>
}

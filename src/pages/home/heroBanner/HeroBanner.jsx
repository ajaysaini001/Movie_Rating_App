import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const [background,setBackground]=useState("");
  const [query,setQuery]=useState("");
  const navigate=useNavigate();
  const {data,loading}=useFetch("/movie/upcoming")

  const {url}=useSelector((state)=>state.home);

  useEffect(()=>{
    const bg=url.backdrop+
    data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  })

  const searchQueryHandler=(event)=>{
    if(event.key==="Enter" && query.length > 0 ){
      navigate(`/search/${query}`);
      
    }

  }
  return (
    <div className='heroBanner'>
      {!loading &&( <div className="backdrop_img">
        <Img src={`${background}`}/>
        </div> 
        )}
        <div className="opcity_Layer"></div>

      <ContentWrapper>
      
        <div className="heroBannerContent">
          <span className='title'></span>
          <span className="subTitle">
            Millions of Movies, TV Shows and people to discover,Explore Now
          </span>
          <div className="searchInput">
            <input
            type='text'
            placeholder='Search for a movie or TV Show'
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}/>

            <button>Search</button>
          </div>
        </div>
      
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
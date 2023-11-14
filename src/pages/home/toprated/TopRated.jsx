import React, { useState } from 'react';
// import "./style.scss";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
const TopRated = () => {
const [endpoint,setEndPoint]=useState("movie");

const {data,loading}=useFetch(`/${endpoint}/top_rated`)

    const onTabChange=(tab)=>{
        setEndPoint(tab==="Movie" ? "movie" : "tv")
    };

  return (
    <div className='caurseselSection' >
        <ContentWrapper>
            
                <span className="caurseTitle">Top Rated</span>
                <SwitchTabs data={["Movie","TV Shows"]} onTabChange={onTabChange}/>
         
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated
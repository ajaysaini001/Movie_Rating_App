import React from 'react'
import "./style.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Populer from './populer/Populer';
import TopRated from './toprated/TopRated';
const Home = () => {
  return (
    <div>
        <HeroBanner/>
        <Trending/>
        <Populer/>
        <TopRated/>
        <div style={{height: 1000}}></div>
        
    </div>
  )
}

export default Home
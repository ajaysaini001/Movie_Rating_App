import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavbar=()=>{
    if(window.scrollY>200){
      if(window.scrollY>lastScrollY && !mobileMenu)
      {
        setShow("hide");
      }
      else{
        setShow("show");
      }
    }else {
      setShow("top");
    }
    setLastScrollY(window.scro)
  }
  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar)
    return ()=>{
      window.removeEventListener("scroll",controlNavbar);
    };
  },[lastScrollY]);
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);
  
 

  // Function to handle search input and navigation
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(true);
      }, 1000);
    }
  };

  // Function to open the mobile menu
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  // Function to open the search bar
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  //Function to move another page
  const navigationHandler=(type)=>{
    if(type==="Movie"){
      navigate("explore/Movie");
    }
    else{
      navigate("explore/TvShow")
    }
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="allItems">
        <div className="logo" onClick={()=>navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={navigationHandler}>Movies</li>
          <li className="menuItem" onClick={navigationHandler}>TV Shows</li>
          <li className="menuItem">
            {/* <HiOutlineSearch onClick={openSearch} aria-label="Open Search" /> */}
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} aria-label="Open Search" />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} aria-label="Close Menu" />
          ) : (
            <SlMenu onClick={openMobileMenu} aria-label="Open Mobile Menu" />
          )}
          </div>
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or TV Show"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} aria-label="Close Search" />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;

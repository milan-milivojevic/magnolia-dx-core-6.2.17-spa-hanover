import React from "react";
import { useState, useEffect, useRef } from "react";
import LeftNavDropdown from "./LeftNavDropdown";
import { getAPIBase } from "../../helpers/AppHelpers";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {events, getRouterBasename} from "../../helpers/AppHelpers";

function LeftNavMenuItem({item, itemIndex, depthLevel}) {

  const [dropdown, setDropdown] = useState(false);
  // const [activeLink, setActiveLink] = useState(null);
  
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
        //Remove the esclamation mark in front of !ref.current to close the open levels
        if (dropdown && !ref.current && !ref.current.contains(event.target)) {
            setDropdown(false);
        }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
      window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
      window.innerWidth > 960 && setDropdown(false);
  };

if (item.hide !== ("true" || true)) {
  return (
    <li className={`menu-item level-${depthLevel} hideInNav-${item.hide}`}
        ref={ref}
        // Uncomment 2 lines below if you want to open levels on hover
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave} 
    >
    {item.children && item.children.length !== 0 ? ( 
          <React.Fragment>
            <button type="button" aria-haspopup = "menu" aria-expanded = {dropdown ? "true" : "false"}
              onClick = {
                () => setDropdown((prev) => !prev)
              } >
                <a href={(getRouterBasename() + item.path.replace(process.env.REACT_APP_MGNL_APP_BASE, "")).replace("//", "/")} 
                  key={itemIndex} 
                  onClick={(e) => {      
                    const currentURL = window.location.href; // Get the complete URL
                    const hash = window.location.hash;      
                    const urlWithoutHash = currentURL.replace(hash, '');
                    const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
                    const itemPath = (baseURL + getRouterBasename() + item.flatPath.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                    const itemHashPath = (baseURL + getRouterBasename() + item.path.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                    if ( item.componentId !== undefined && currentURL === itemHashPath ) {
                      e.preventDefault();                
                      window.location.hash = item.componentId;
                      // const navLinks = document.querySelectorAll('.leftHandNav .menu-item  button  a');
                      // navLinks.forEach((navLink) => {
                      //   navLink.classList.remove('active');
                      // });
                      // e.target.classList.add('active');
                    } else if ( item.componentId !== undefined && urlWithoutHash === itemPath ) {
                      e.preventDefault();                
                      window.location.hash = item.componentId;
                      window.scrollBy(0, -250);
                      // const navLinks = document.querySelectorAll('.leftHandNav .menu-item  button  a');
                      // navLinks.forEach((navLink) => {
                      //   navLink.classList.remove('active');
                      // });
                      // e.target.classList.add('active');
                    } else {
                      e.preventDefault();
                      window.history.pushState({}, "", e.currentTarget.href);
                      window.scrollTo(0, 0);
                      events.emit("popstate");
                      // setActiveLink(itemIndex);
                      // const navLinks = document.querySelectorAll('.leftHandNav .menu-item  button  a');
                      // navLinks.forEach((navLink) => {
                      //   navLink.classList.remove('active');
                      // });
                      // e.target.classList.add('active');
                    }
                  }}               
                  //  className={
                  //   (itemIndex === activeLink ? " active_item" : "")
                  // }
                >  
                  {item.name}               
                </a> 
              {" "} 
              <span className={`leftNavChevron ${dropdown}`}>  </span>
            </button> 
            <LeftNavDropdown depthLevel={depthLevel}
                      submenus={item.children}
                      dropdown={dropdown}
                      itemIndex={itemIndex}
            /> 
          </React.Fragment>
        ) : ( 
          <button type="button">            
            <a href={(getRouterBasename() + item.path.replace(process.env.REACT_APP_MGNL_APP_BASE, "")).replace("//", "/")}
              key={itemIndex} 
              onClick={(e) => {      
                const currentURL = window.location.href; // Get the complete URL
                const hash = window.location.hash;      
                const urlWithoutHash = currentURL.replace(hash, '');
                const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
                const itemPath = (baseURL + getRouterBasename() + item.flatPath.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                const itemHashPath = (baseURL + getRouterBasename() + item.path.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                if ( item.componentId !== undefined && currentURL === itemHashPath ) {
                  e.preventDefault();                
                  window.location.hash = item.componentId;
                  // const navLinks = document.querySelectorAll('.leftHandNav .menu-item  button  a');
                  // navLinks.forEach((navLink) => {
                  //   navLink.classList.remove('active');
                  // });
                  // e.target.classList.add('active');
                } else if ( item.componentId !== undefined && urlWithoutHash === itemPath ) {
                  e.preventDefault();                
                  window.location.hash = item.componentId;
                  window.scrollBy(0, -250);
                  // const navLinks = document.querySelectorAll('.leftHandNav .menu-item  button  a');
                  // navLinks.forEach((navLink) => {
                  //   navLink.classList.remove('active');
                  // });
                  // e.target.classList.add('active');
                } else {
                  e.preventDefault();
                  window.history.pushState({}, "", e.currentTarget.href);
                  window.scrollTo(0, 0);
                  events.emit("popstate");
                  // const navLinks = document.querySelectorAll('.leftHandNav .menu-item  button  a');
                  // navLinks.forEach((navLink) => {
                  //   navLink.classList.remove('active');
                  // });
                  // e.target.classList.add('active');
                  // setActiveLink(itemIndex);
                }
              }}
              // className={
              //   (itemIndex === activeLink ? "active" : "")
              // }
            >  
              {item.name} 
            </a>
          </button>
        )
    } 
    </li>
    );
  };
}

export default LeftNavMenuItem;
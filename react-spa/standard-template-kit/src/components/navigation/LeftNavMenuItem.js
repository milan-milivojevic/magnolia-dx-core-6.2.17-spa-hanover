import React from "react";
import { useState, useEffect, useRef } from "react";
import LeftNavDropdown from "./LeftNavDropdown";
import { getAPIBase } from "../../helpers/AppHelpers";

import {events, getRouterBasename} from "../../helpers/AppHelpers";

function LeftNavMenuItem({item, itemIndex, depthLevel}) {

  const [dropdown, setDropdown] = useState(false);
  
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
        if (dropdown && !ref.current && !ref.current.contains(event.target)) {
            setDropdown(false);
        }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
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
                    const currentURL = window.location.href;
                    const hash = window.location.hash;      
                    const urlWithoutHash = currentURL.replace(hash, '');
                    const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
                    const itemPath = (baseURL + getRouterBasename() + item.flatPath.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                    const itemHashPath = (baseURL + getRouterBasename() + item.path.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                    if ( item.componentId !== undefined && currentURL === itemHashPath ) {
                      e.preventDefault();                
                      window.location.hash = item.componentId;
                    } else if ( item.componentId !== undefined && urlWithoutHash === itemPath ) {
                      e.preventDefault();                
                      window.location.hash = item.componentId;
                      window.scrollBy(0, -250);
                    } else {
                      e.preventDefault();
                      window.history.pushState({}, "", e.currentTarget.href);
                      window.scrollTo(0, 0);
                      events.emit("popstate");
                    }
                  }}               
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
                const currentURL = window.location.href;
                const hash = window.location.hash;      
                const urlWithoutHash = currentURL.replace(hash, '');
                const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
                const itemPath = (baseURL + getRouterBasename() + item.flatPath.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                const itemHashPath = (baseURL + getRouterBasename() + item.path.replace(process.env.REACT_APP_MGNL_APP_BASE, ""))
                if ( item.componentId !== undefined && currentURL === itemHashPath ) {
                  e.preventDefault();                
                  window.location.hash = item.componentId;
                } else if ( item.componentId !== undefined && urlWithoutHash === itemPath ) {
                  e.preventDefault();                
                  window.location.hash = item.componentId;
                  window.scrollBy(0, -250);
                } else {
                  e.preventDefault();
                  window.history.pushState({}, "", e.currentTarget.href);
                  window.scrollTo(0, 0);
                  events.emit("popstate");
                }
              }}
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

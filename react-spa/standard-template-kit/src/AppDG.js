import React, { useState, useEffect } from 'react';
import PageLoader from './helpers/PageLoader';
import Navigation from './components/navigation/Navigation';
import HeadlinesStyles from './styles/headlines';
import ParagraphsStyles from './styles/paragraphs';
import PagesStyles from './styles/pages';
import HeaderStyles from './styles/header';
import NavLevelsStyles from './styles/navLevels';
import TopNavStyles from './styles/topNavigation';
import LeftNavStyles from './styles/leftNavigation';
import './App.css';
import { IoLogOutOutline, IoSearchOutline } from 'react-icons/io5';
import {
  getAPIBase,
  getLanguages,
  getCurrentLanguage,
  changeLanguage,
  getRouterBasename, 
  events
} from "./helpers/AppHelpers";

const ForwardedTopNav = React.forwardRef(Navigation);

function App() {

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";
  
  function renderLanguages() {
    const currentLanguage = getCurrentLanguage();    
    return (
      <div className="languages">
        {getLanguages().map((lang) => (
          <span
            key={`lang-${lang}`}
            data-active={currentLanguage === lang}
            onClick={() => changeLanguage(lang)}
          >
            {lang}
          </span>
        ))}
      </div>
    );
  }

  const [query, setQuery] = useState("");  

  const headerRef = React.useRef(null);  
  const topNavRef = React.useRef(null); 
  const pageRef = React.useRef(null);
  
  React.useEffect(() => {
    var interval = setInterval(() => {    
      const headerHeight = headerRef.current.getBoundingClientRect().height;
      const topNavHeight = topNavRef.current.getBoundingClientRect().height;
      const topHeight = headerHeight + topNavHeight;
      topNavRef.current.style.top = headerHeight + 'px';
      pageRef.current.style.top = topHeight + 'px';
      pageRef.current.style.minHeight = `calc(100vh - ${topHeight}px)`;
    }, 300)
    setTimeout(function( ) { clearInterval( interval ); }, 6000);
  }, []);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/headerConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const [showLogout, setShowLogout] = useState("false");

  useEffect(() => {
    setShowLogout(configProps?.showLogout)
  }, [configProps?.showLogout]);

  useEffect(() => {
    fetch(`${baseUrl}/rest/administration/users/_current`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopstate() {
      setPathname(window.location.pathname);
    }   

    events.on('popstate', handlePopstate);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      events.removeListener('popstate', handlePopstate);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  var leftNavInterval = setInterval(() => {

    const links = document.querySelectorAll('.menu-item > button > a');
    const leftLinks = document.querySelectorAll('.leftHandNav .menu-item > button > a');
    function setActiveLink(link) {
      links.forEach((link) => {
        link.classList.remove('active');
      });
      leftLinks.forEach((leftLink) => {
        leftLink.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
      });
      link.classList.add('active');
      link.parentNode.parentNode.parentNode.parentNode.classList.add('active');
    }
    const link = Array.from(links).find(link => link.href === window.location.href);
    if (link) {
      setActiveLink(link);
    }
    const leftLink = Array.from(leftLinks).find(link => link.href === window.location.href);
    if (leftLink) {
      setActiveLink(leftLink);
    }

  }, 300);
  setTimeout(function( ) { clearInterval( leftNavInterval ); }, 6000);

  const handleClick = () => {

    const href = (getRouterBasename() + `/Search-Pages/Static-Content-Search?q=${query}`).replace("//", "/");
    window.history.pushState({}, "", href);
    events.emit("popstate");
  }

  if (editMode === "editMode") {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }

  setTimeout(() => {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 1000);

  return (
    <div className={`App ${editMode}`}>
      <PagesStyles/>   
      <HeaderStyles/>
      <NavLevelsStyles/>
      <TopNavStyles/>
      <LeftNavStyles/>
      <HeadlinesStyles/>
      <ParagraphsStyles/>
      <header ref={headerRef}>    
        <div className='header'>
          {configProps?.logo &&
            <div className='logo'>
              <a href={(getRouterBasename() + configProps?.logoPageLink).replace("//", "/").replace("Home/Home", "Home")}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", e.currentTarget.href);
                  events.emit("popstate");
                }}            
              >
                <img alt="" src={configProps?.logo['@link'] }/>
              </a>    
            </div>
          }
          <div className='rightHeader'>
            <div className='userLinks'>
              <a href={configProps?.adminLink}>
                {configProps?.adminLinkDisplayName || "Admin"}
              </a>
              <a href={configProps?.userLink}>
                {configProps?.userLinkDisplayName || userData?.login || "User"}
              </a>            
            </div>
            <div className='flex headerSearch'>
              <input 
                className='searchInput'
                placeholder='Search...' 
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type='button'
                onClick={handleClick}
              ><IoSearchOutline/></button>
            </div>
            { showLogout === "false" || false ? null :
              <div className='logout'>
                <div><IoLogOutOutline/></div>
              </div>
            }            
          </div>
        </div>
      </header>
      <ForwardedTopNav ref={topNavRef}></ForwardedTopNav>       
      <div className='pageContainer' ref={pageRef}>
        <PageLoader pathname={pathname} />
        <footer>
          <div></div>
          <a className="footerLinks" href="mailto:dgmc@deutsche-glasfaser.de/" rel="noreferrer" target="_blank" role="button">Kontakt</a>
          <a className="footerLinks" href="https://www.deutsche-glasfaser.de/unternehmen/datenschutz/" rel="noreferrer" target="_blank" role="button">Datenschutz</a>
          <a className="footerLinks" href="#" target="_self" role="button">Deutsche Glasfaser</a>
          <div></div>
        </footer>
      </div>

    </div>
  );
}

export default App;

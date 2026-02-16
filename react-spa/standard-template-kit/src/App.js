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
import ShopModal from './modals/ShopModal';
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
  const editMode = isPagesApp ? true : false;
  
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
  

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  
  const isAuthor = JSON.parse(process.env.REACT_APP_MGNL_IS_PREVIEW);

  const [configProps, setConfigProps] = useState();
  const [userData, setUserData] = useState();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/headerConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const [showShopModal, setShowShopModal] = useState(false);
  const [shopHref, setShopHref] = useState("");

  const openShopModal = (url) => {
    setShopHref(url);
    setShowShopModal(true);
  };

  const closeShopModal = () => {
    setShowShopModal(false);
  };

  const [showLogout, setShowLogout] = useState("false");

  useEffect(() => {
    setShowLogout(configProps?.showLogout)
  }, [configProps?.showLogout]);

  useEffect(() => {
    fetch(`${baseUrl}/rest/administration/users/_current`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setIsUserLogged(!!data?.login);
        setIsUserLoaded(true);
      })
      .catch(error => {
        setIsUserLogged(false);
        setIsUserLoaded(true);
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

    const leftLinks = document.querySelectorAll('.leftHandNav .menu-item > button > a');

    function setActiveLHNLink(link) {
      leftLinks.forEach((link) => {
        link.classList.remove('active');
      });
      leftLinks.forEach((leftLink) => {
        leftLink.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
      });
      link.classList.add('active');
      link.parentNode.parentNode.parentNode.parentNode.classList.add('active');
      link.parentNode.parentNode.classList.add('active');
    }

    const currentLocationWithoutHash = window.location.href.split('#')[0];

    const leftLink = Array.from(leftLinks).find(link => {
      if (link.href === window.location.href) {
        return link.href === window.location.href;
      } else if (link.href === currentLocationWithoutHash)
        return link.href === currentLocationWithoutHash;
    });
    if (leftLink) {
      setActiveLHNLink(leftLink);
    } 

    const topLinks = document.querySelectorAll('.topNav .menu-item > button > a');

    if (window.location.href === `${baseUrl}${apiBase}/Home`) {
      
      topLinks.forEach(link => {
        link.classList.remove('active');
        link.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
      });
    } else {
      function setActiveTopLink(link) {
        topLinks.forEach((link) => {
          link.classList.remove('active');
        });
        topLinks.forEach((topLink) => {
          topLink.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
        });
        link.classList.add('active');
        link.parentNode.parentNode.parentNode.parentNode.classList.add('active');
      }
    
      const topLink = Array.from(topLinks).find(link => {
        if (link.href === window.location.href.replace('#', '/')) {
          return link.href === window.location.href.replace('#', '/');
        } else if (link.href === currentLocationWithoutHash) {
          return link.href === currentLocationWithoutHash;
        }
      });
    
      if (topLink) {
        setActiveTopLink(topLink);
      }
    }

    

      var uls = document.querySelectorAll('.leftHandNav ul');
      for (var i = 0; i < uls.length; i++) {
        if (uls[i].querySelector('a.active')) {
            uls[i].style.display = 'block';
        }
      }

  }, 300);
  setTimeout(function( ) { clearInterval( leftNavInterval ); }, 6000);

  const handleClick = () => {

    const href = (getRouterBasename() + `/Search-Pages/Global-Search?query=${query}`).replace("//", "/");
    window.history.pushState({}, "", href);
    events.emit("popstate");
    setQuery("");
  }

  const handleEnter = (query) => {

    const href = (getRouterBasename() + `/Search-Pages/Global-Search?query=${query}`).replace("//", "/");
    window.history.pushState({}, "", href);
    events.emit("popstate");
    setQuery("");
  }

  if (editMode) {
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
  }, 2000);

  if (!isUserLoaded && !isAuthor) {
    return <div>Loading...</div>;
  }

  if (!isUserLogged && !isAuthor) {
    window.location.href = baseUrl + "/CiPortal.do";
    return null;
  }

  return (
    <div className={`App ${editMode ? "editMode": ""}`}>
      <PagesStyles/>   
      <HeaderStyles/>
      <NavLevelsStyles/>
      <TopNavStyles/>
      <LeftNavStyles/>
      <HeadlinesStyles/>
      <ParagraphsStyles/>
      <header ref={headerRef}>    
        <div className='header'>          
          <div className='rightHeader'>
            <div className='userLinks'>
              <a target="_blank" href={configProps?.adminLink}>
                {configProps?.adminLinkDisplayName || "Admin"}
              </a>
              {}
              <a onClick={() => openShopModal("/shop/edit_cart.do#false")} style={{cursor: "pointer"}}>
                Shopping Chart
              </a>
              <a href={baseUrl + '/cmsPublic/Home/My-Documents.html'}>
                My Documents
              </a>               
              <a onClick={() => openShopModal("/shop/orders_history.do?start=1&filter.rselmen=MMS_O_ALL&filter=all&rselmen=MAN_2#false")} style={{cursor: "pointer"}}>
                My Orders
              </a>
              <a href={configProps?.userLink}>
                {configProps?.userLinkDisplayName || userData?.login || "User"}
              </a>              
            </div>
            <div className='flex headerSearch headerSearchWrapper'>
              <input 
                type='text'
                className='searchInput'
                placeholder='Search...' 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEnter(e.target.value)}
              />
              <button
                type='button'
                onClick={handleClick}
              ><IoSearchOutline/></button>
            </div>
            {showLogout === "false" || false ? null :
              <div className='logout'>
                <div><a href={baseUrl + '/Logout.do'}><IoLogOutOutline/></a></div>
              </div>
            }     
          </div>
          <div className='logo'>
            <a href={(getRouterBasename() + configProps?.logoPageLink).replace("//", "/").replace("Home/Home", "Home")}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.currentTarget.href);
                events.emit("popstate");
              }}            
            >
              <img alt="" src={require('./images/home/Logo.png') }/>
            </a>    
          </div>
          <ForwardedTopNav ref={topNavRef}></ForwardedTopNav>   
        </div>             
      </header>             
      <div className='pageContainer' ref={pageRef}>
        <PageLoader pathname={pathname} />
        <footer>
          <div className='links'>
            <div>
              <a href="https://www.hanover.com/" target="_blank">Hanover.com</a>
            </div>
            <div>
              <a href="https://tap.allmerica.com/" target="_blank">TAP</a>
            </div>         
          </div>
          <div className='footer'>The Hanover Insurance Group, Inc. 2023</div>
        </footer>
      </div>

      {showShopModal && <ShopModal href={shopHref} isOpen={showShopModal} closeModal={closeShopModal}></ShopModal>}

    </div>
  );
}

export default App;

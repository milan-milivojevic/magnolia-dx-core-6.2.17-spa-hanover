import React, { useEffect } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../css.css';
import LeftHandNav from '../components/navigation/LeftHandNav';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ForwardedLeftHandNav = React.forwardRef(LeftHandNav);

function LeftHandNavigationPage (props) {
  const { title, componentId, bannerSection, mainSection } = props;

  useEffect(() => {
    if (window.location.hash) {
      const trimmedHash = window.location.hash.substring(1)
      const element = document.getElementById(trimmedHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.scrollBy(0, -250);
    }
  }, []); 

  var interval = setInterval(() => {
    if (window.location.hash) {
      const trimmedHash = window.location.hash.substring(1)
      const element = document.getElementById(trimmedHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.scrollBy(0, -250);
    }} , 500);
  setTimeout(function( ) { clearInterval( interval ); }, 5000);
  

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";

  const leftNavRef = React.useRef(null);
  const contentRef = React.useRef(null);

  

  setTimeout(() => {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 1000);

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      { (editMode !== "editMode") &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
      <div className='leftNavPage'>
        <ForwardedLeftHandNav ref={leftNavRef}></ForwardedLeftHandNav>
        <div className='rightMainContent' ref={contentRef}>
          <div className='bannerSection'>{bannerSection && <EditableArea content={bannerSection} />}</div>
          <div>{mainSection && <EditableArea content={mainSection} />}</div>
        </div>      
      </div>
    </HelmetProvider>
  );
}

export default LeftHandNavigationPage;

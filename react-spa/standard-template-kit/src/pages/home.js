import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../css.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function HomePage (props) {
  const {title, bannerSection, mainSection, footerSection } = props;

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";

  setTimeout(() => {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 2000);

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
      <div className='homePage'>
        <div className='bannerSection'>{bannerSection && <EditableArea content={bannerSection} />}</div>
        <div>{mainSection && <EditableArea content={mainSection} />}</div>
        <div>{footerSection && <EditableArea content={footerSection} />}</div>
      </div>
    </HelmetProvider>
  );
}

export default HomePage;
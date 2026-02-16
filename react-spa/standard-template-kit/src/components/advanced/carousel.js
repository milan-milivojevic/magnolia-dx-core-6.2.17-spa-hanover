import React, { useState, useEffect, useId } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Carousel ({
  multi,
  carouselWidth,
  carouselHeight,
  carouselPosition,
  carouselAutoplay,
  carouselBorderWidth,
  carouselBorderStyle,
  carouselBorderColor,
  carouselBorderRadius,
  carouselMarginLeft,
  carouselMarginBottom,
  carouselMarginRight,
  carouselMarginTop,
  arrowType,
  arrowColor,
  arrowFontSize,
  arrowIndent,
  indicatorType,  
  indicatorFontSize,
  indicatorIndent,  
  indicatorColor,
  indicatorActiveColor,
  indicatorGap,
  indicatorBorderWidth,
  indicatorBorderStyle,
  indicatorBorderColor,
  indicatorActiveBorderColor,
  styleName,
  noStyles
}) {

  const id = useId(); 
  // const [isAutoSliding, setIsAutoSliding] = useState(true);

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Advanced-Config/carouselComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles !== (false || "false")) {
          result = null;
        } 
        setConfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);
  

  const images = [];
  for (let i = 0; i <= 20; i++) {
    images.push(multi[`multi${i}`]?.image || multi[`multi${i}`]?.video);
  }
  
  const activeImages = images.filter((image) => {
    return image !== undefined;
  })

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndicatorIndex, setActiveIndicatorIndex] = useState(currentIndex);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? activeImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setActiveIndicatorIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === activeImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setActiveIndicatorIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setActiveIndicatorIndex(slideIndex);
  };


  // Function to start auto-sliding
  // const startAutoSlide = () => {
  //   setIsAutoSliding(true);
  // };

  // Function to stop auto-sliding
  // const stopAutoSlide = () => {
  //   setIsAutoSliding(false);
  // };

  // Auto-slide effect
  useEffect(() => {
    let interval;
    if (carouselAutoplay === true || carouselAutoplay === "true") {
      interval = setInterval(() => {
        goToNext();
      }, 3000); // 3000ms = 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [carouselAutoplay, goToNext]);



  const imageBase = process.env.REACT_APP_MGNL_HOST_NEW;
  const image = activeImages[currentIndex];
  const mediaType = image?.metadata?.format?.includes('image');
  const url = image['@link'];
  

  const carouselStyles = {
    position: "relative",
    marginTop: carouselMarginTop || configProps?.carouselMarginTop || null,
    marginRight: carouselMarginRight || configProps?.carouselMarginRight || null,
    marginBottom: carouselMarginBottom || configProps?.carouselMarginBottom || null,
    marginLeft: carouselMarginLeft || configProps?.carouselMarginLeft || null,
    width: carouselWidth || configProps?.carouselWidth || "100%"
  };

  const leftArrowStyles = {
    color: arrowColor || configProps?.arrowColor || null,
    fontSize: arrowFontSize || configProps?.arrowFontSize || null,
    left: arrowFontSize && arrowIndent 
            ? `calc(-${arrowFontSize} - ${arrowIndent})` 
            : arrowFontSize 
              ? `calc(-${arrowFontSize})`
              : null
  }
  
  const rightArrowStyles = {
    color: arrowColor || configProps?.arrowColor || null,
    fontSize: arrowFontSize || configProps?.arrowFontSize || null,
    right: arrowFontSize && arrowIndent 
            ? `calc(-${arrowFontSize} - ${arrowIndent})` 
            : arrowFontSize 
              ? `calc(-${arrowFontSize})`
              : null
  }
  

  const carouselImageStyles = {
    borderColor: carouselBorderColor || configProps?.carouselBorderColor || null,
    borderWidth: carouselBorderWidth || configProps?.carouselBorderWidth || null,
    borderStyle: carouselBorderStyle || configProps?.carouselBorderStyle || null,
    borderRadius: carouselBorderRadius || configProps?.carouselBorderRadius || null,
    maxHeight: carouselHeight || configProps?.carouselHeight || null
  };

  const indicatorStyles = {
    fontSize: indicatorFontSize || configProps?.indicatorFontSize || null,
    color: indicatorColor || configProps?.indicatorColor || null,
    backgroundColor: (indicatorType || configProps?.indicatorType) === "lines" ? indicatorColor || configProps?.indicatorColor || "#fff" : null,
    height: (indicatorType || configProps?.indicatorType) === "lines" ? indicatorFontSize || configProps?.indicatorFontSize : null,
    width: (indicatorType || configProps?.indicatorType) === "lines" ? "calc(34px + " + (indicatorFontSize || configProps?.indicatorFontSize) + ")" : null,
    borderStyle: (indicatorType || configProps?.indicatorType) === "lines" ? indicatorBorderStyle || configProps?.indicatorBorderStyle : null,
    borderWidth: (indicatorType || configProps?.indicatorType) === "lines" ? indicatorBorderWidth  || configProps?.indicatorBorderWidth : null,
    borderColor: indicatorBorderColor  || configProps?.indicatorBorderColor || null,
    borderRadius: (indicatorType || configProps?.indicatorType) !== "lines" ? "100%" : null
  };

  const activeIndicatorStyles = {
    ...indicatorStyles,
    borderColor: indicatorActiveBorderColor || configProps?.indicatorActiveBorderColor || null,
    color: indicatorActiveColor || configProps?.indicatorActiveColor || null,
    backgroundColor: (indicatorType || configProps?.indicatorType) === "lines" ? indicatorActiveColor || configProps?.indicatorActiveColor || "#fff" : null
  }

  const iconStyles = {
    borderStyle: indicatorBorderStyle || configProps?.indicatorBorderStyle || null,
    borderWidth: indicatorBorderWidth || configProps?.indicatorBorderWidth || null,
    borderColor: "inherit",
    borderRadius: (indicatorType || configProps?.indicatorType) === "dot" ? "inherit" : null,
    backgroundColor: indicatorColor || configProps?.indicatorColor || null,
  }
  
  const activeIconStyles = {
    ...iconStyles,
    backgroundColor: indicatorActiveColor || configProps?.indicatorActiveColor || null,
  }

  return (
    <div className='carouselWrapper'
      // onMouseEnter={stopAutoSlide}  // Pause on hover
      // onMouseLeave={startAutoSlide} // Resume on mouse leave
    >
      <div className='carouselComponent' style={{ justifyContent: carouselPosition || configProps?.carouselPosition || "left" }}>
        <div className={`carousel carouselArea`} style={carouselStyles}> 
          {(arrowType || configProps?.arrowType) !== "unset" ?
            <div>
              <div onClick={goToPrevious} className="leftArrowStyles" style={leftArrowStyles}>
                {(arrowType || configProps?.arrowType) === "arrow" ? <span className="leftArrow">➲</span> : <BsChevronLeft/>}
              </div>
              <div onClick={goToNext} className="rightArrowStyles" style={rightArrowStyles}>
                {(arrowType || configProps?.arrowType) === "arrow" ? "➲" : <BsChevronRight/>}
              </div>
            </div>
          : null}
          {mediaType && 
            <img className="carouselImage" src={url} alt="" style={carouselImageStyles}/>
          }
          {!mediaType && 
            <video 
              src={url} 
              style={carouselImageStyles}
              preload="auto"
              autoPlay="autoplay"
              controls="controls"
              muted="muted"
              loop="loop"
              id={"video_" + id}
              className="carouselImage"
            ></video>
          }
          <div className="indicatorsWrapper" style={{ bottom: indicatorIndent || configProps?.indicatorIndent || null}}>
            <div className="indicatorsContainer" style={{gap: indicatorGap || configProps?.indicatorGap || null}}>
              {activeImages.map((image, imageIndex) => (
                <div
                  className={activeIndicatorIndex === imageIndex ? `indicator active` : `indicator`}
                  style={activeIndicatorIndex !== imageIndex ? indicatorStyles : activeIndicatorStyles}
                  key={imageIndex}
                  onClick={() => goToSlide(imageIndex)}
                > 
                  {(indicatorType || configProps?.indicatorType) === "squares" ? <FaSquareFull style={activeIndicatorIndex !== imageIndex ? iconStyles : activeIconStyles}/> : (indicatorType || configProps?.indicatorType) === "lines" ? <span className="lineIndicator"></span> : <FaCircle style={activeIndicatorIndex !== imageIndex ? iconStyles : activeIconStyles}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;
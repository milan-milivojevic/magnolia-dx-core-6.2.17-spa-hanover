import React, { useState, useEffect, useRef, useId } from 'react';
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function CarouselConfig ({
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
  styleName
}) {

  const id = useId(); 

  const myRef = useRef(null);
  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

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

  useEffect(() => {
    let interval;
    if (carouselAutoplay === true || carouselAutoplay === "true") {
      interval = setInterval(() => {
        goToNext();
      }, 3000);
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
    marginTop: carouselMarginTop || null,
    marginRight: carouselMarginRight || null,
    marginBottom: carouselMarginBottom || null,
    marginLeft: carouselMarginLeft || null,
    width: carouselWidth || null,
  };

  const leftArrowStyles = {
    color: arrowColor || null,
    fontSize: arrowFontSize || null,
    left: "-" + arrowIndent || null
  }

  const rightArrowStyles = { 
    color: arrowColor || null,
    fontSize: arrowFontSize || null,
    right: "-" + arrowIndent || null
  }
  
  const carouselImageStyles = {
    borderColor: carouselBorderColor || null,
    borderWidth: carouselBorderWidth || null,
    borderStyle: carouselBorderStyle || null,
    borderRadius: carouselBorderRadius || null,
    maxHeight: carouselHeight || null
  };  

  const indicatorStyles = {
    fontSize: indicatorFontSize || null,
    color: indicatorColor || null,
    backgroundColor: indicatorType === "lines" ? indicatorColor || "#fff" : null,
    height: indicatorType === "lines" ? indicatorFontSize : null,
    width: indicatorType === "lines" ? "calc(34px + " + indicatorFontSize + ")" : null,
    borderStyle: indicatorType === "lines" ? indicatorBorderStyle : null,
    borderWidth: indicatorType === "lines" ? indicatorBorderWidth : null,
    borderColor: indicatorBorderColor || null,
    borderRadius: indicatorType !== "lines" ? "100%" : null
  };

  const activeIndicatorStyles = {
    ...indicatorStyles,
    borderColor: indicatorActiveBorderColor || null,
    color: indicatorActiveColor || null,
    backgroundColor: indicatorType === "lines" ? indicatorActiveColor || "#fff" : null
  }

  const iconStyles = {
    borderStyle: indicatorBorderStyle || null,
    borderWidth: indicatorBorderWidth || null,
    borderColor: "inherit",
    borderRadius: indicatorType === "dot" ? "inherit" : null,
    backgroundColor: indicatorColor || null,
  }

  const activeIconStyles = {
    ...iconStyles,
    backgroundColor: indicatorActiveColor || null,
  }
  
  return (
    <div className='carouselWrapper configComponents'
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className='carouselComponent' style={{ justifyContent: carouselPosition || "left" }}>
        <div className={`carousel carouselArea`} style={carouselStyles}>
          {arrowType !== "unset" ?
            <div>
              <div onClick={goToPrevious} className="leftArrowStyles" style={leftArrowStyles}>
                {arrowType === "arrow" ? <span className="leftArrow">➲</span> : <BsChevronLeft/>}
              </div>
              <div onClick={goToNext} className="rightArrowStyles" style={rightArrowStyles}>
                {arrowType === "arrow" ? "➲" : <BsChevronRight/>}  
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
          <div className="indicatorsWrapper" style={{ bottom: indicatorIndent || null}}>
            <div className="indicatorsContainer" style={{gap: indicatorGap || null}}>
              {activeImages.map((image, imageIndex) => (
                <div
                  className={activeIndicatorIndex === imageIndex ? `indicator active` : `indicator`}
                  style={activeIndicatorIndex !== imageIndex ? indicatorStyles : activeIndicatorStyles}
                  key={imageIndex}
                  onClick={() => goToSlide(imageIndex)}
                > 
                  {indicatorType === "squares" ? <FaSquareFull style={activeIndicatorIndex !== imageIndex ? iconStyles : activeIconStyles}/> : indicatorType === "lines" ? <span className="lineIndicator"></span> : <FaCircle style={activeIndicatorIndex !== imageIndex ? iconStyles : activeIconStyles}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselConfig;

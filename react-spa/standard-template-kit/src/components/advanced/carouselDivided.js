import React, { useState, useEffect } from "react";
import { getAPIBase } from '../../helpers/AppHelpers';
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function CarouselDivided ({
  multiLeft,
  multiRight,
  carouselWidth,
  carouselHeight,
  carouselPosition,
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

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Advanced-Config/carouselDividedComponents/@nodes`)
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

  const leftImages = [];
  for (let i = 0; i <= 10; i++) {
    leftImages.push(multiLeft[`multiLeft${i}`]?.image);
  }
  const activeLeftImages = leftImages.filter((image) => {
    return image !== undefined;
  })

  const rightImages = [];
  for (let i = 0; i <= 10; i++) {
    rightImages.push(multiRight[`multiRight${i}`]?.image);
  }
  const activeRightImages = rightImages.filter((image) => {
    return image !== undefined;
  })

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndicatorIndex, setActiveIndicatorIndex] = useState(currentIndex);

  const longerImageArray = activeLeftImages.length > activeRightImages.length ? activeLeftImages : activeRightImages;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? longerImageArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setActiveIndicatorIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === longerImageArray.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setActiveIndicatorIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setActiveIndicatorIndex(slideIndex);
  };

  const imageBase = process.env.REACT_APP_MGNL_HOST_NEW;

  const leftImage = activeLeftImages[currentIndex];
  let urlLeftImage = leftImage ? leftImage['@link'] : require('../../images/placeholderImage.jpg');

  const rightImage = activeRightImages[currentIndex];
  let urlRightImage = rightImage ? rightImage['@link'] : require('../../images/placeholderImage.jpg'); 


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
    left: arrowIndent || configProps?.arrowIndent || null
  }

  const rightArrowStyles = { 
    color: arrowColor || configProps?.arrowColor || null,
    fontSize: arrowFontSize || configProps?.arrowFontSize || null,
    right: arrowIndent || configProps?.arrowIndent || null
  }
  
  const carouselDividedImagesStyles = {
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
    <div className='carouselDividedWrapper'>
      <div className='carouselComponent' style={{ justifyContent: carouselPosition || configProps?.carouselPosition || "left" }}>
        <div className={`carousel carouselArea`} style={carouselStyles}> 
          {(arrowType || configProps?.arrowType) !== "unset" ?
            <div>
              <div onClick={goToPrevious} className="leftArrowStyles" style={leftArrowStyles}>
                {(arrowType || configProps?.arrowType) === "arrow" ? <span className="leftArrow">➲</span> : <BsChevronLeft/>}
              </div>
              <div onClick={goToNext} className="rightArrowStyles"  style={rightArrowStyles}>
                {(arrowType || configProps?.arrowType) === "arrow" ? "➲" : <BsChevronRight/>}  
              </div>
            </div>
          : null}
          <div className="carouselDividedImages" style={carouselDividedImagesStyles}>
            <img className="carouselImage left" src={urlLeftImage} alt=""/>
            <img className="carouselImage right" src={urlRightImage} alt=""/>
          </div>
          <div className="indicatorsWrapper" style={{ bottom: indicatorIndent || configProps?.indicatorIndent || "20px"}}>
            <div className="indicatorsContainer" style={{gap: indicatorGap || configProps?.indicatorGap || null}}>
              {longerImageArray.map((image, imageIndex) => (
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

export default CarouselDivided;
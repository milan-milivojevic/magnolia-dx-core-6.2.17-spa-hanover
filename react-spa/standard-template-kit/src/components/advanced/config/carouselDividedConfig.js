import React, { useState, useRef } from "react";
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function CarouselDividedConfig ({
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
  styleName
}) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

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
  let urlLeftImage = leftImage ? leftImage['@link'] : require('../../../images/placeholderImage.jpg');

  const rightImage = activeRightImages[currentIndex];
  let urlRightImage = rightImage ? rightImage['@link'] : require('../../../images/placeholderImage.jpg');


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
    left: arrowIndent || null
  }

  const rightArrowStyles = { 
    color: arrowColor || null,
    fontSize: arrowFontSize || null,
    right: arrowIndent || null
  }
  
  const carouselDividedImagesStyles = {
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
    <div className='carouselDividedWrapper configComponents'>
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
          <div className="carouselDividedImages" style={carouselDividedImagesStyles}>
            <img className="carouselImage left" src={urlLeftImage} alt=""/>
            <img className="carouselImage right" src={urlRightImage} alt=""/>
          </div>
          <div className="indicatorsWrapper" style={{ bottom: indicatorIndent || "20px"}}>
            <div className="indicatorsContainer" style={{gap: indicatorGap || null}}>
              {longerImageArray.map((image, imageIndex) => (
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

export default CarouselDividedConfig;
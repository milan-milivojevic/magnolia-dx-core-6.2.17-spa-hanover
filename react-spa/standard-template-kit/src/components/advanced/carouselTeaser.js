import React, { useState, useEffect, useRef } from 'react';
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../images/home/DownloadIcon.svg';

const Wrapper = styled.div`
  .link:hover {
    background-color: ${(props) => props.hovLinkBgColor && props.hovLinkBgColor + "!important"};
    color: ${(props) => props.hovLabelColor && props.hovLabelColor + "!important"};
    border-color: ${(props) => props.hovLinkBorderColor && props.hovLinkBorderColor + "!important"};
  }
  .link svg { 
    color: ${(props) => props.defChevronColor && props.defChevronColor + "!important"};
  }
  .link:hover svg { 
    color: ${(props) => props.hovChevronColor && props.hovChevronColor + "!important"};
  }
}`

function CarouselTeaser ({
  multi,
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
  addArrows,
  arrowsHeight,
  headlineBackground,
  headlineTextTransform,
  headlineFontSize,
  headlineLineHeight,
  headlineItalic,
  headlineBold,
  headlineLetterSpacing,
  headlineColor,
  headlinePaddingTop,
  headlinePaddingRight,
  headlinePaddingBottom,
  headlinePaddingLeft,
  headlineMarginTop,
  headlineMarginRight,
  headlineMarginBottom,
  headlineMarginLeft,
  descriptionBackground,
  descriptionStyle,
  descriptionColor,
  descriptionAlign, 
  descriptionPaddingTop,
  descriptionPaddingRight,
  descriptionPaddingBottom,
  descriptionPaddingLeft,
  descriptionBorderRadius,
  descriptionBorderColor,
  descriptionBorderStyle,
  descriptionBorderWidth,
  linkLocation,
  linkIcon,
  linkPaddingTop,
  linkPaddingRight,
  linkPaddingBottom,
  linkPaddingLeft,
  linkBorderColor,
  linkBorderHoverColor,
  linkBorderWidth,
  linkBorderStyle,
  linkBorderRadius,
  linkWidth,
  linkHeight,      
  linkDefaultBackColor,
  linkHoverBackColor,
  labelDefaultColor,
  labelHoverColor,  
  linkLabelDecoration,
  linkLabelVerticalPosition,
  linkLabelHorizontalPosition,
  linkBold,
  linkItalic,
  chevronDefaultColor,
  chevronHoverColor,
  linkLabelFontSize,
  linkFontFamily,
  linkLabelLineHeight,
  labelPaddingTop,
  labelPaddingBottom,
  labelPaddingRight,
  labelPaddingLeft,
  carouselWidth,
  carouselHeight,
  carouselPosition,
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
  carouselBorderWidth,
  carouselBorderStyle,
  carouselBorderColor,
  carouselBorderRadius,
  carouselPaddingLeft,
  carouselPaddingBottom,
  carouselPaddingRight,
  carouselPaddingTop,
  carouselMarginLeft,
  carouselMarginBottom,
  carouselMarginRight,
  carouselMarginTop,  
  teaserLayout,
  descLinkLayout,
  descRowLayoutWidth,
  linkRowLayoutWidth,
  descLinkGap,
  descLinkPosition,
  linkHorizontalPosition,
  linkVerticalPosition,
  clickableComponent,
  styleName,
  noStyles,
  linkStyleName,
  linkNoStyles,
}) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Teasers-Config/carouselTeaserComponents/@nodes`)
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

  const [linkConfigProps, setLinkConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/linkComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === linkStyleName);
        if (!result && linkNoStyles === (false || "false")) {
          result = data[0];
        } else if (linkNoStyles !== (false || "false")) {
          result = null;
        } 
        setLinkConfigProps(result);
      });
  }, [linkStyleName, linkNoStyles, apiBase, restPath, nodeName]);

  const dimensionsRef = useRef();

  const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0})
    const myRefCurrent = myRef.current;
    useEffect(() => {
      const getDimensions = () => ({
        width: myRefCurrent.offsetWidth,
        height: myRefCurrent.offsetHeight,
      })  
      const handleResize = () => {
        setDimensions(getDimensions())
      }
      if (myRefCurrent) {
        setDimensions(getDimensions());
        var interval = setInterval(() => {
        setDimensions(getDimensions())} , 200);
        setTimeout(function( ) { clearInterval( interval ); }, 5000);
      }
      window.addEventListener("resize", handleResize)  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRefCurrent])
    return dimensions;
  };  
  const { width, height } = useContainerDimensions(dimensionsRef);
  
  const images = [];
  for (let i = 0; i <= 20; i++) {
    images.push(multi[`multi${i}`]?.image);
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

  const carouselTeaserComponentStyles = {
    width: carouselWidth || configProps?.carouselWidth || "100%",    
    margin: carouselPosition || configProps?.carouselPosition || null
  };

  const carouselStyles = {
    position: "relative",
    marginTop: carouselMarginTop || configProps?.carouselMarginTop || null,
    marginRight: carouselMarginRight || configProps?.carouselMarginRight || null,
    marginBottom: carouselMarginBottom || configProps?.carouselMarginBottom || null,
    marginLeft: carouselMarginLeft || configProps?.carouselMarginLeft || null
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

  const openLink = () => {
    window.open(href, linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank");
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const image = multi['multi' + currentIndex].image;
  const url = image['@link'];

  const HeadlineLevel = headlineLevel || "h1";
  const currentDownload = multi['multi' + currentIndex].download
  const downloadLink = currentDownload ? currentDownload['@link'] : baseUrl;  
  const href = multi['multi' + currentIndex].linkType === "page" ? (getRouterBasename() + multi['multi' + currentIndex].page)?.replace("//", "/")?.replace("Home/Home", "Home") : multi['multi' + currentIndex].linkType === "external" ? multi['multi' + currentIndex].external : downloadLink;
  
  const cursorPointer = clickableComponent === "true" ? "cursorPointer" : configProps?.clickableComponent === "true" ? "cursorPointer" : null;

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || null;  

  const defLinkBgColor = linkDefaultBackColor || configProps?.linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || configProps?.linkHoverBackColor ||  linkConfigProps?.linkHoverBackColor || defLinkBgColor;

  const defLabelColor = labelDefaultColor || configProps?.labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || configProps?.labelHoverColor || linkConfigProps?.labelHoverColor || defLabelColor; 

  const defChevronColor = chevronDefaultColor || configProps?.chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || configProps?.chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || configProps?.linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || configProps?.linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;

  const carouselTeaserWrapperStyles = { 
    width: carouselWidth || configProps?.carouselWidth || null,
    height: carouselHeight || configProps?.carouselHeight || null,
  }

  const carouselTeaserStyles = {
    width: width || carouselWidth || configProps?.carouselWidth || null,
    height: height || carouselHeight || configProps?.carouselHeight || null,
    justifyContent: teaserLayout || configProps?.teaserLayout || null,
    paddingTop: carouselPaddingTop || configProps?.carouselPaddingTop || null,
    paddingRight: carouselPaddingRight || configProps?.carouselPaddingRight || null,
    paddingBottom: carouselPaddingBottom || configProps?.carouselPaddingBottom || null,
    paddingLeft: carouselPaddingLeft || configProps?.carouselPaddingLeft || null,
    borderColor: carouselBorderColor || configProps?.carouselBorderColor || null,
    borderWidth: carouselBorderWidth || configProps?.carouselBorderWidth || null,
    borderStyle: carouselBorderStyle || configProps?.carouselBorderStyle || null,
    borderRadius: carouselBorderRadius || configProps?.carouselBorderRadius || null
  }

  const headlineWrapperStyles = {
    display: "flex",
    justifyContent: headlinePosition || configProps?.headlinePosition || null,
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,    
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: multi['multi' + currentIndex].titleColor || headlineColor || configProps?.headlineColor || null,
    letterSpacing: headlineLetterSpacing || configProps?.headlineLetterSpacing || null,
    fontWeight: headlineBold || configProps?.headlineBold || null,
    fontStyle: headlineItalic || configProps?.headlineItalic || null,
    textTransform: headlineTextTransform || null,
    paddingTop: headlinePaddingTop || configProps?.headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || configProps?.headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || configProps?.headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || configProps?.headlinePaddingLeft || null,
    marginTop: headlineMarginTop || configProps?.headlineMarginTop || null,
    marginRight: headlineMarginRight || configProps?.headlineMarginRight || null,
    marginBottom: headlineMarginBottom || configProps?.headlineMarginBottom || null,
    marginLeft: headlineMarginLeft || configProps?.headlineMarginLeft || null
  }

  const descriptionLinkWrapperStyles = {
    flexDirection: descLinkLayout || configProps?.descLinkLayout || "column",
    gap: descLinkGap || configProps?.descLinkGap || null,
    alignItems: descLinkPosition || configProps?.descLinkGap || null
  }

  const descriptionStyles = {
    width: descRowLayoutWidth || configProps?.descRowLayoutWidth || null,
    paddingTop: descriptionPaddingTop || configProps?.descriptionPaddingTop || null,
    paddingRight: descriptionPaddingRight || configProps?.descriptionPaddingRight || null,
    paddingBottom: descriptionPaddingBottom || configProps?.descriptionPaddingBottom || null,
    paddingLeft: descriptionPaddingLeft || configProps?.descriptionPaddingLeft || null,
    borderColor: descriptionBorderColor || configProps?.descriptionBorderColor || null,
    borderWidth: descriptionBorderWidth || configProps?.descriptionBorderWidth || null,
    borderStyle: descriptionBorderStyle || configProps?.descriptionBorderStyle || null,
    borderRadius: descriptionBorderRadius || configProps?.descriptionBorderRadius || null,
    textAlign: descriptionAlign || configProps?.descriptionAlign || null,
    color: descriptionColor || configProps?.descriptionColor || null
  }

  const linkComponentStyles = {
    width: linkRowLayoutWidth || configProps?.linkRowLayoutWidth || null,
    paddingTop: linkPaddingTop || configProps?.linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || configProps?.linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null,  
    justifyContent: linkHorizontalPosition || configProps?.linkHorizontalPosition || "flex-start",
    alignItems: linkVerticalPosition || configProps?.linkVerticalPosition || "flex-start"  
  }

  const linkStyles = {
    backgroundColor: defLinkBgColor,
    color: defLabelColor,
    paddingTop: labelPaddingTop || configProps?.labelPaddingTop || linkConfigProps?.labelPaddingTop || null,
    paddingRight: labelPaddingRight || configProps?.labelPaddingRight || linkConfigProps?.labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || configProps?.labelPaddingBottom || linkConfigProps?.labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || configProps?.labelPaddingLeft || linkConfigProps?.labelPaddingLeft || null, 
    borderColor: linkBorderColor || configProps?.linkBorderColor || linkConfigProps?.linkBorderColor || null,
    borderWidth: linkBorderWidth || configProps?.linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || configProps?.linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || configProps?.linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || configProps?.linkWidth || linkConfigProps?.linkWidth || "max-content",
    height: linkHeight || configProps?.linkHeight || linkConfigProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || configProps?.linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent: linkLabelHorizontalPosition || configProps?.linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems: linkLabelVerticalPosition || configProps?.linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontSize: linkLabelFontSize || configProps?.linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    fontFamily: linkFontFamily || configProps?.linkFontFamily || linkConfigProps?.linkFontFamily || null,
    lineHeight: linkLabelLineHeight || configProps?.linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || configProps?.linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || configProps?.linkItalic || linkConfigProps?.linkItalic || null
  }   

  const addArrowsVar = addArrows || configProps?.addArrows || "false";

  return (
    <Wrapper className='carouselWrapper'
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className='carouselTeaserComponent' style={carouselTeaserComponentStyles}>
      <div className={`carousel carouselArea`} style={carouselStyles}>
          {(arrowType === "unset" || configProps?.arrowType === "unset") ? null :
            <div>
              <div className="leftArrowStyles" onClick={goToPrevious} style={leftArrowStyles}>
                {arrowType === "arrow" ? <span className="leftArrow">➲</span> : <BsChevronLeft/>}
              </div>
              <div onClick={goToNext} className="rightArrowStyles" style={rightArrowStyles}>
                {arrowType === "arrow" ? "➲" : <BsChevronRight/>}
              </div>
            </div>
          }
          <div className={`carouselTeaserWrapper flex`} style={carouselTeaserWrapperStyles} ref={dimensionsRef}>
            <img className="image" src={url} alt="" />
            <div className={`carouselTeaser flexColumn ${cursorPointer}`} 
                 onClick={clickableComponent === "true" ? openLink : configProps?.clickableComponent === "true" ? openLink : null}
                 style={carouselTeaserStyles}
            >
              {multi['multi' + currentIndex].headline && 
                <div className='headlineWrapper' style={headlineWrapperStyles}>
                  <HeadlineLevel style={headlineStyles} className={`headline ${multi['multi' + currentIndex].titleBackground || headlineBackground  || configProps?.headlineBackground || null}`}>
                    <span className='customHeadlineArrows' style={{ height: multi['multi' + currentIndex].arrowsHeight || arrowsHeight || configProps?.arrowsHeight || null }}>
                      {(multi['multi' + currentIndex].addArrows === "true" || (multi['multi' + currentIndex].addArrows === undefined && addArrowsVar !== "false")) && <ArrowsIcon/>}
                    </span>{multi['multi' + currentIndex].headline  || null}                    
                  </HeadlineLevel>
                </div>
              }   
              <div className='descriptionLinkWrapper flex' style={descriptionLinkWrapperStyles}>
                {multi['multi' + currentIndex].description &&
                  <div className={`description ${descriptionStyle || configProps?.descriptionStyle || null} ${multi['multi' + currentIndex].descBackground || descriptionBackground || configProps?.descriptionBackground || null}`}
                       dangerouslySetInnerHTML={{ __html:multi['multi' + currentIndex].description || null }}
                       style={descriptionStyles}
                  ></div>
                }
                {(linkIcons || multi['multi' + currentIndex].linkLabel) &&
                  <div className='linkComponent flex' style={linkComponentStyles}>
                    <a className='link' href={href} target={linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank"} rel="noreferrer" style={linkStyles} >
                      {multi['multi' + currentIndex].linkLabel || ""} 
                      {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="indicatorsWrapper" style={{ bottom: indicatorIndent || configProps?.indicatorIndent || null }}>
          <div className="indicatorsContainer" style={{ gap: indicatorGap || configProps?.indicatorGap || null }}>
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
    </Wrapper>
  )
}

export default CarouselTeaser;
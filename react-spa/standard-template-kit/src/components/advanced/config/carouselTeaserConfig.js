import React, { useState, useEffect, useRef } from 'react';
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase } from '../../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../../images/home/DownloadIcon.svg';

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

function CarouselTeaserConfig ({
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
  linkStyleName,
  linkNoStyles,
}) {  

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    
  
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

  const dimensionsRef = useRef()
  // const headlineRef = useRef()
  // const descLinkRef = useRef()
  const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0})
    const myRefCurrent = myRef.current;
    useEffect(() => {
      const getDimensions = () => ({
        width: myRefCurrent.offsetWidth,
        height: myRefCurrent.offsetHeight,
        // headlineHeight: myRefCurrent.offsetHeight,
        // descLinkHeight: myRefCurrent.offsetHeight,
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
  // const { headlineHeight } = useContainerDimensions(headlineRef);
  // const { descLinkHeight } = useContainerDimensions(descLinkRef);
  // console.log(headlineHeight, descLinkHeight);
  // const acctualHeight = headlineHeight + descLinkHeight + componentPaddingTop + componentPaddingBottom;

  
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
    width: carouselWidth || "100%",    
    margin: carouselPosition || null
  };

  const carouselStyles = {
    position: "relative",
    marginTop: carouselMarginTop || null,
    marginRight: carouselMarginRight || null,
    marginBottom: carouselMarginBottom || null,
    marginLeft: carouselMarginLeft || null
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

  const openLink = () => {
    window.open(href, linkLocation || "_blank");
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const image = multi['multi' + currentIndex].image;
  const url = image['@link'];

  const HeadlineLevel = headlineLevel || "h1";
  const currentDownload = multi['multi' + currentIndex].download
  const downloadLink = currentDownload ? currentDownload['@link'] : baseUrl;  
  const href = multi['multi' + currentIndex].linkType === "page" ? multi['multi' + currentIndex].page : multi['multi' + currentIndex].linkType === "external" ? multi['multi' + currentIndex].external : downloadLink;
  
  const cursorPointer = clickableComponent === "true" ? "cursorPointer" : null;

  const linkIcons = linkIcon || linkConfigProps?.linkIcon || null;  

  const defLabelColor = labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || linkConfigProps?.labelHoverColor || defLabelColor;
  
  const defLinkBgColor = linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || linkConfigProps?.linkHoverBackColor || defLinkBgColor;

  const defChevronColor = chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;  

  const carouselTeaserWrapperStyles = { 
    width: carouselWidth || null,
    height: carouselHeight || null,
  }

  const carouselTeaserStyles = {
    width: width ||  carouselWidth || null,
    height: height || carouselHeight || null,
    justifyContent: teaserLayout || null,
    paddingTop: carouselPaddingTop || null,
    paddingRight: carouselPaddingRight || null,
    paddingBottom: carouselPaddingBottom || null,
    paddingLeft: carouselPaddingLeft || null,   
    borderColor: carouselBorderColor || null,
    borderWidth: carouselBorderWidth || null,
    borderStyle: carouselBorderStyle || null,
    borderRadius: carouselBorderRadius || null
  }

  const headlineWrapperStyles = {
    display: "flex",
    justifyContent: headlinePosition || null,
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,    
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: multi['multi' + currentIndex].titleColor || headlineColor || null,
    letterSpacing: headlineLetterSpacing || null,
    fontWeight: headlineBold || null,
    fontStyle: headlineItalic || null,
    textTransform: headlineTextTransform || null,
    paddingTop: headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || null,
    marginTop: headlineMarginTop || null,
    marginRight: headlineMarginRight || null,
    marginBottom: headlineMarginBottom || null,
    marginLeft: headlineMarginLeft || null
  }

  const descriptionLinkWrapperStyles = { 
    flexDirection: descLinkLayout || "column",
    gap: descLinkGap || null,
    alignItems: descLinkPosition || null
  }

  const descriptionStyles = {
    width: descRowLayoutWidth || null,
    paddingTop: descriptionPaddingTop || null,
    paddingRight: descriptionPaddingRight || null,
    paddingBottom: descriptionPaddingBottom || null,
    paddingLeft: descriptionPaddingLeft || null,
    borderColor: descriptionBorderColor || null,
    borderWidth: descriptionBorderWidth || null,
    borderStyle: descriptionBorderStyle || null,
    borderRadius: descriptionBorderRadius || null,
    textAlign: descriptionAlign || null,
    color: descriptionColor || null
  }

  const linkComponentStyles = {
    width: linkRowLayoutWidth || null,
    paddingTop: linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null,
    justifyContent: linkHorizontalPosition || "flex-start",
    alignItems: linkVerticalPosition || "flex-start"
  }

  const linkStyles = {
    backgroundColor: defLinkBgColor,
    color: defLabelColor,
    paddingTop: labelPaddingTop || linkConfigProps?.labelPaddingTop || null,
    paddingRight: labelPaddingRight || linkConfigProps?.labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || linkConfigProps?.labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || linkConfigProps?.labelPaddingLeft || null, 
    borderColor: linkBorderColor || linkConfigProps?.linkBorderColor || null,
    borderWidth: linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || linkConfigProps?.linkWidth || "max-content",
    height: linkHeight || linkConfigProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent: linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems: linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontSize: linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    fontFamily: linkFontFamily || linkConfigProps?.linkFontFamily || null,
    lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || linkConfigProps?.linkItalic || null
  }   

  const addArrowsVar = addArrows || "false";

  return (
    <Wrapper className='carouselWrapper configComponents'
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className='carouselTeaserComponent' style={carouselTeaserComponentStyles}>
        <div className={`carousel carouselArea`} style={carouselStyles}>
          {arrowType !== "unset" &&
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
                 onClick={clickableComponent === "true" ? openLink : null}
                 style={carouselTeaserStyles}
            >
              {multi['multi' + currentIndex].headline && 
                <div className='headlineWrapper' style={headlineWrapperStyles}>
                  <HeadlineLevel className={`headline ${multi['multi' + currentIndex].titleBackground || headlineBackground || null}`} style={headlineStyles}>
                    <span className='customHeadlineArrows' style={{ height: multi['multi' + currentIndex].arrowsHeight || arrowsHeight || null }}>
                      {(multi['multi' + currentIndex].addArrows === "true" || (multi['multi' + currentIndex].addArrows === undefined && addArrowsVar !== "false")) && <ArrowsIcon/>}
                    </span>{multi['multi' + currentIndex].headline  || null}
                  </HeadlineLevel>
                </div>
              }   
              <div className='descriptionLinkWrapper flex' style={descriptionLinkWrapperStyles}>
                {multi['multi' + currentIndex].description &&
                  <div className={`description ${descriptionStyle || null} ${multi['multi' + currentIndex].descBackground || descriptionBackground || null}`} 
                       dangerouslySetInnerHTML={{ __html:multi['multi' + currentIndex].description || null }}
                       style={descriptionStyles}
                  ></div>
                }
                {(linkIcons || multi['multi' + currentIndex].linkLabel) &&
                  <div className='linkComponent flex' style={linkComponentStyles}>
                    <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer"style={linkStyles}> 
                      {multi['multi' + currentIndex].linkLabel || ""} 
                      {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                    </a>
                  </div>
                }
              </div>
            </div>
          </div>
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
    </Wrapper>
  )
}

export default CarouselTeaserConfig;
import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../../images/home/DownloadIcon.svg';

function findNodeById(node, targetId) {
  if (!node || typeof node !== 'object') return null;

  if (node['@id'] === targetId) {
    return node;
  }

  if (node['@nodes'] && Array.isArray(node['@nodes'])) {
    for (const childName of node['@nodes']) {
      const found = findNodeById(node[childName], targetId);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

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

function ImageTeaserConfig ({
  headline,   
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
  headlineBackground,
  headlineTextTransform,
  addArrows,
  arrowsHeight,
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
  description,
  descriptionAlign,
  descriptionStyle,
  descriptionColor,
  descriptionPaddingTop,
  descriptionPaddingRight,
  descriptionPaddingBottom,
  descriptionPaddingLeft,
  descriptionBorderRadius,
  descriptionBorderColor,
  descriptionBorderStyle,
  descriptionBorderWidth,
  image,
  linkType,
  page,
  external,
  download,
  linkLabel,
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
  componentPaddingTop,
  componentPaddingRight,
  componentPaddingBottom,
  componentPaddingLeft,
  componentBorderColor,
  componentBorderHoverColor,
  componentBorderWidth,
  componentBorderStyle,
  componentBorderRadius,
  componentWidth,
  componentHeight,
  componentPosition,    
  teaserLayout,
  descLinkLayout,
  descRowLayoutWidth,
  linkRowLayoutWidth,
  descLinkGap,
  descLinkPosition,
  descLinkPadding,
  descLinkMargin,
  descLinkBackColor,
  descLinkMinHeight,
  linkHorizontalPosition,
  linkVerticalPosition,
  clickableComponent,
  linkStyleName,
  linkNoStyles,
  styleName,
  }) {
  
  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  }; 

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
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

  const [resolvedPath, setResolvedPath] = useState(page);  

  useEffect(() => {
    if (linkType !== 'page') return;

    if (!isUuid(page)) {
      setResolvedPath(page);
      return;
    }

    async function resolveUuidToPath() {
      try {
        const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
        const response = await fetch(url);
        const data = await response.json();

        const foundNode = findNodeById(data, page);
        if (foundNode && foundNode['@path']) {
          setResolvedPath(foundNode['@path']);
        } else {
          setResolvedPath(page);
        }
      } catch (e) {
        console.error('Greška prilikom dohvata navigacije ili kod traženja čvora:', e);
        setResolvedPath(page);
      }
    }

    resolveUuidToPath();
  }, [page, linkType, apiBase]);

  const downloadLink = download ? download['@link'] : baseUrl;
  const href = linkType === "page"
    ? (getRouterBasename() + resolvedPath)
        .replace("//", "/")
        .replace("Home/Home", "Home")
    : linkType === "external"
      ? external
      : downloadLink;

  const openLink = () => {
    window.open(href, linkLocation || linkConfigProps?.linkLocation || "_blank");
  };

  const HeadlineLevel = headlineLevel || "h1";  

  const cursorPointer = clickableComponent === "true" ? "cursorPointer" : null;
  
  const defBorderColor = componentBorderColor || null;
  const hovBorderColor = componentBorderHoverColor || defBorderColor;

  const defLabelColor = labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || linkConfigProps?.labelHoverColor || defLabelColor;
  
  const defLinkBgColor = linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || linkConfigProps?.linkHoverBackColor || defLinkBgColor;

  const defChevronColor = chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;

  const linkIcons = linkIcon || linkConfigProps?.linkIcon || null; 

  const imageTeaserComponentStyles = {
    width: componentWidth || null,
    height: componentHeight || null,
    margin: componentPosition || null    
  }

  const imageTeaserStyles = {
    width: width ||  componentWidth || null,
    height: height || componentHeight || null,
    justifyContent: teaserLayout || null,
    paddingTop: componentPaddingTop || null,
    paddingRight: componentPaddingRight || null,
    paddingBottom: componentPaddingBottom || null,
    paddingLeft: componentPaddingLeft || null,    
    borderColor: componentBorderColor || null,
    borderWidth: componentBorderWidth || null,
    borderStyle: componentBorderStyle || null,
    borderRadius: componentBorderRadius || null
  }

  const headlineWrapperStyles = {
    display: "flex",
    justifyContent: headlinePosition || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: headlineColor || null,
    letterSpacing:  headlineLetterSpacing || null,
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
    alignItems: descLinkPosition || null,
    padding: descLinkPadding || null,
    margin: descLinkMargin || null,
    backgroundColor: descLinkBackColor || null,
    minHeight: descLinkMinHeight || null,
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
    borderColor: defLinkBorderColor,
    borderWidth: linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || linkConfigProps?.linkWidth || "max-content",
    height: linkHeight || linkConfigProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent:  linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems:  linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontFamily: linkFontFamily || linkConfigProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight:  linkBold || linkConfigProps?.linkBold || null,
    fontStyle:  linkItalic || linkConfigProps?.linkItalic || null
  }

  const addArrowsVar = addArrows || "false";
  const arrowsHeightVar = { height: arrowsHeight || null };

  return (
    <Wrapper className='imageTeaserWrapper configComponents'
      hovBorderColor={hovBorderColor}
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
      <div className={`imageTeaserComponent flex`} style={imageTeaserComponentStyles} ref={dimensionsRef}>
        <img className="image" src={image['@link']} alt="" />
        <div className={`imageTeaser flexColumn ${cursorPointer}` }
             onClick={clickableComponent === "true" ? openLink : null}
             style={imageTeaserStyles}
        >
          {headline &&
            <div className='headlineWrapper' style={headlineWrapperStyles}>
              <HeadlineLevel className={`headline ${headlineBackground}`} style={headlineStyles}>
                <span className='customHeadlineArrows' style={arrowsHeightVar}>
                  {(addArrowsVar !== "false" || false) && <ArrowsIcon/>}
                </span>{headline || null}
              </HeadlineLevel>
            </div>
          }   
          <div className='descriptionLinkWrapper flex' style={descriptionLinkWrapperStyles}>
            {description &&
              <div className={`description ${descriptionStyle || null}`}
                   dangerouslySetInnerHTML={{ __html:description || null }}
                   style={descriptionStyles}
              ></div>
            }
            {(linkIcons || linkLabel) &&
              <div className='linkComponent flex' style={linkComponentStyles}>
                <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer" style={linkStyles}>
                  {linkLabel || ""} 
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ImageTeaserConfig;

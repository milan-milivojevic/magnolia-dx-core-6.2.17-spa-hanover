import React, { useState, useEffect, useRef, useId } from 'react';
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
  .globalLayoutComponent:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
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
  .image1:hover, .video1Component video:hover  {
    background-color: ${(props) => props.img1HovBgColor && props.img1HovBgColor + "!important"};
  }
  .image2:hover, .video2Component video:hover {
    background-color: ${(props) => props.img2HovBgColor && props.img2HovBgColor + "!important"};
  }
}`

function GlobalLayoutComponentConfig ({
  headline,   
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
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
  description,
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
  linkType,
  page,
  external,
  download,
  linkLabel,
  linkLocation,
  linkPaddingTop,
  linkPaddingRight,
  linkPaddingBottom,
  linkPaddingLeft,
  labelDefaultColor,
  labelHoverColor,
  linkDefaultBackColor,
  linkHoverBackColor,
  linkBorderColor,
  linkBorderHoverColor,
  linkBorderWidth,
  linkBorderStyle,
  linkBorderRadius,
  linkWidth,
  linkHeight,
  linkIcon,
  linkLabelDecoration,
  linkLabelVerticalPosition,
  linkLabelHorizontalPosition,
  linkLabelFontSize,
  linkFontFamily,
  linkLabelLineHeight,
  labelPaddingTop,
  labelPaddingBottom,
  labelPaddingRight,
  labelPaddingLeft,
  linkBold,
  linkItalic,
  chevronDefaultColor,
  chevronHoverColor,
  media1Type,
  image1,
  embed1,
  video1, 
  autoplay1,
  loop1,
  muted1,
  controls1,
  media2Type,
  image2,
  embed2,
  video2, 
  autoplay2,
  loop2,
  muted2,
  controls2,        
  image1BorderColor,
  image1BorderWidth,
  image1BorderStyle,
  image1BorderRadius,
  image2BorderColor,
  image2BorderWidth,
  image2BorderStyle,
  image2BorderRadius,
  image1PaddingTop,
  image1PaddingRight,
  image1PaddingBottom,
  image1PaddingLeft,
  image2PaddingTop,
  image2PaddingRight,
  image2PaddingBottom,
  image2PaddingLeft,
  image1DefaultBackColor,
  image1HoverBackColor,
  image2DefaultBackColor,
  image2HoverBackColor,    
  wrapperPaddingTop,
  wrapperPaddingRight,
  wrapperPaddingBottom,
  wrapperPaddingLeft,
  wrapperDefaultBackColor,
  wrapperHoverBackColor,
  wrapperBorderColor,
  wrapperBorderWidth,
  wrapperBorderStyle,
  wrapperBorderRadius,
  layout,
  descLinkLayout,
  descRowLayoutWidth,
  linkRowLayoutWidth,
  descLinkGap,
  descLinkPosition,
  linkHorizontalPosition,
  linkVerticalPosition,
  image1Width,
  image2Width,
  imagesPosition,
  imagesHeight,
  imagesGap,   
  imagesFit,
  imagesHorizontalPosition, 
  linkStyleName,
  linkNoStyles,
  styleName      
  }) {

  const id = useId(); 
  
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
        let result = data.find(item => item.styleName === linkStyleName );
        if (!result && linkNoStyles === (false || "false")) {
          result = data[0];
        } else if (linkNoStyles !== (false || "false")) {
          result = null;
        } 
        setLinkConfigProps(result);
      });
  }, [linkStyleName, linkNoStyles, apiBase, restPath, nodeName]);

  const linkExist = page || external || download || null;

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
        console.error('Error fetching navigation or searching for node:', e);
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

  const HeadlineLevel = headlineLevel || "h1";    

  const layouts = layout || "layout1";

  const defBgColor = wrapperDefaultBackColor || null;
  const hovBgColor = wrapperHoverBackColor || null;

  const defLinkBgColor = linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || linkConfigProps?.linkHoverBackColor || null;

  const defLabelColor = labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || linkConfigProps?.labelHoverColor || null;

  const defChevronColor = chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;

  const img1DefBgColor = image1DefaultBackColor || null;
  const img1HovBgColor = image1HoverBackColor || null;

  const img2DefBgColor = image2DefaultBackColor || null;
  const img2HovBgColor = image2HoverBackColor || null;
  
  const linkIcons = linkIcon || linkConfigProps?.linkIcon || "";

  const globalLayoutComponentStyles = {
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
    backgroundColor: defBgColor,
    borderColor: wrapperBorderColor || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderRadius: wrapperBorderRadius || null
  } 

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,
    textAlign: headlinePosition ||null,
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: headlineColor || null,
    letterSpacing: headlineLetterSpacing ||  null,
    fontWeight: headlineBold || null,
    fontStyle: headlineItalic || null,
    textTransform: headlineTextTransform || null,
    paddingTop: headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || null
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
    borderColor: defLinkBorderColor,
    borderWidth: linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || linkConfigProps?.linkWidth || "max-content",
    height: linkHeight || linkConfigProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent: linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems: linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontFamily: linkFontFamily || linkConfigProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || linkConfigProps?.linkItalic || null
  }

  const image1Styles = {
    objectPosition:  imagesPosition || null,
    objectFit: imagesFit || null,
    height: imagesHeight || null,
    width: "100%",
    borderColor: image1BorderColor || null,
    borderWidth: image1BorderWidth || null,
    borderStyle: image1BorderStyle || null,
    borderRadius: image1BorderRadius || null,
    paddingTop: image1PaddingTop || null,
    paddingRight: image1PaddingRight || null,
    paddingBottom: image1PaddingBottom || null,
    paddingLeft: image1PaddingLeft ||null,
    backgroundColor: img1DefBgColor
  }

  const image2Styles = {
    objectPosition:  imagesPosition || null,
    objectFit: imagesFit || null,
    height: imagesHeight || null,
    width: "100%",
    borderColor: image2BorderColor || null,
    borderWidth: image2BorderWidth || null,
    borderStyle: image2BorderStyle || null,
    borderRadius: image2BorderRadius || null,
    paddingTop: image2PaddingTop || null,
    paddingRight: image2PaddingRight || null,
    paddingBottom: image2PaddingBottom || null,
    paddingLeft: image2PaddingLeft ||null,
    backgroundColor: img2DefBgColor
  }
  
  return (
    <Wrapper className='globalLayoutComponentWrapper configComponents'
      hovBgColor={hovBgColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
      img1HovBgColor={img1HovBgColor} 
      img2HovBgColor={img2HovBgColor}     
    >      
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>  
      {layouts !== "layout4" ?
        <div className={`globalLayoutComponent ${layouts}`} style={globalLayoutComponentStyles}> 
          {headline &&         
            <HeadlineLevel className="headline"style={headlineStyles}>
              {headline ? headline : null}
            </HeadlineLevel>
          }
          <div className='imageComponentWrapper flex' style={{gap: imagesGap || null, justifyContent: imagesHorizontalPosition || null}}>
            {media1Type === "image1" && image1 &&
              <div style={{width:image1Width || "auto"}}>
                <img className="image image1" src={image1['@link']} alt="" style={image1Styles}/>
              </div>
            }
            {media1Type === "video1" && video1 &&
              <div className="video1Component" style={{width:image1Width || "auto"}}>
                <video 
                  src={video1['@link']} 
                  style={image1Styles}
                  preload="auto"
                  autoPlay={autoplay1 === (false || "false") ? null : "autoplay"}
                  controls="controls"
                  muted={autoplay1 === (false || "false") ? muted1 === (false || "false") ? null : "muted" : "muted"}
                  loop={loop1 === (false || "false") ? null : "loop"}
                  id={"video_" + id}
                  className="video"
                ></video>
              </div>
            }
            {media1Type === "embed1" && embed1 &&
              <div className="embedVideo1Component" style={{width:image1Width || "auto"}} 
                dangerouslySetInnerHTML={{ __html:embed1 || null }}>
              </div>
            }
            {media2Type === "image2" && image2 &&
              <div style={{width:image2Width || "auto"}}>
                <img className="image image2" src={image2['@link']} alt="" style={image2Styles}/>
              </div>
            }
            {media2Type === "video2" && video2 &&
              <div className="video2Component" style={{width:image2Width || "auto"}}>
                <video 
                  src={video2['@link']} 
                  style={image2Styles}
                  preload="auto"
                  autoPlay={autoplay2 === (false || "false") ? null : "autoplay"}
                  controls="controls"
                  muted={autoplay2 === (false || "false") ? muted2 === (false || "false") ? null : "muted" : "muted"}
                  loop={loop2 === (false || "false") ? null : "loop"}
                  id={"video_" + id}
                  className="video"
                ></video>
              </div>
            }
            {media2Type === "embed2" && embed2 &&
              <div className="embedVideo2Component" style={{width:image2Width || "auto"}} 
                dangerouslySetInnerHTML={{ __html:embed2 || null }}>
              </div>
            }
          </div>
          <div className='descriptionLinkWrapper flex' style={descriptionLinkWrapperStyles}>
            {description &&
              <div className={`description ${descriptionStyle}`} 
                  dangerouslySetInnerHTML={{ __html:description || null }} 
                  style={descriptionStyles}>                  
              </div>
            }
            {linkExist &&
              <div className='linkComponent flex' style={linkComponentStyles}>
                <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}>
                  {linkLabel ? linkLabel : ""} 
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }      
          </div>
        </div>
        :
        <div className={`globalLayoutComponent ${layouts}`} style={globalLayoutComponentStyles}> 
          {headline &&         
            <HeadlineLevel className="headline"style={headlineStyles}>
              {headline ? headline : null}
            </HeadlineLevel>
          }
          <div className='imageComponentWrapper flex' style={{gap: imagesGap || null, justifyContent: imagesHorizontalPosition || null}}>
            {media1Type === "image1" && image1 &&
              <div style={{width:image1Width || "auto"}}>
                <img className="image image1" src={image1['@link']} alt="" style={image1Styles}/>
              </div>
            }
            {media1Type === "video1" && video1 &&
              <div className="video1Component" style={{width:image1Width || "auto"}}>
                <video 
                  src={video1['@link']} 
                  style={image1Styles}
                  preload="auto"
                  autoPlay={autoplay1 === (false || "false") ? null : "autoplay"}
                  controls="controls"
                  muted={autoplay1 === (false || "false") ? muted1 === (false || "false") ? null : "muted" : "muted"}
                  loop={loop1 === (false || "false") ? null : "loop"}
                  id={"video_" + id}
                  className="video"
                ></video>
              </div>
            }
            {media1Type === "embed1" && embed1 &&
              <div className="embedVideo1Component" style={{width:image1Width || "auto"}} 
                dangerouslySetInnerHTML={{ __html:embed1 || null }}>
              </div>
            }
            {media2Type === "image2" && image2 &&
              <div style={{width:image2Width || "auto"}}>
                <img className="image image2" src={image2['@link']} alt="" style={image2Styles}/>
              </div>
            }
            {media2Type === "video2" && video2 &&
              <div className="video2Component" style={{width:image2Width || "auto"}}>
                <video 
                  src={video2['@link']} 
                  style={image2Styles}
                  preload="auto"
                  autoPlay={autoplay2 === (false || "false") ? null : "autoplay"}
                  controls="controls"
                  muted={autoplay2 === (false || "false") ? muted2 === (false || "false") ? null : "muted" : "muted"}
                  loop={loop2 === (false || "false") ? null : "loop"}
                  id={"video_" + id}
                  className="video"
                ></video>
              </div>
            }
            {media2Type === "embed2" && embed2 &&
              <div className="embedVideo2Component" style={{width:image2Width || "auto"}} 
                dangerouslySetInnerHTML={{ __html:embed2 || null }}>
              </div>
            }
          </div>
          {description &&
            <div className={`description ${descriptionStyle}`} 
                dangerouslySetInnerHTML={{ __html:description || null }} 
                style={descriptionStyles}>                  
            </div>
          }
          {linkExist &&
            <div className='linkComponent flex' style={linkComponentStyles}>
              <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}>
                {linkLabel ? linkLabel : ""} 
                {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
              </a>
            </div>
          }      
        </div>
      }
    </Wrapper>
  )
}

export default GlobalLayoutComponentConfig;

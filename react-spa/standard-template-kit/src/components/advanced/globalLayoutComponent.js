import React, { useState, useEffect, useId } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { IoAtSharp } from "react-icons/io5";
import { getAPIBase, getRouterBasename, isPublicInstance } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../images/home/DownloadIcon.svg';

function findNodeById(node, targetId) {
  if (!node || typeof node !== 'object') return null;

  if (node['@id'] === targetId) {
    return node;
  }

  if (node['@nodes'] && Array.isArray(node['@nodes'])) {
    // @nodes je polje stringova koji su imena children čvorova
    for (const childName of node['@nodes']) {
      // Svaki child je node[childName]
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

function GlobalLayoutComponent ({
  headline, 
  navigationId,  
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
  imagesHorizontalPosition,
  imagesHeight,
  imagesGap,   
  imagesFit,
  imagesPosition, 
  linkStyleName,
  linkNoStyles,
  styleName,
  noStyles,
}) {

  const id = useId(); 

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();  
  const isPublic = isPublicInstance();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    
    
  const [configProps, setconfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Layout-Components-Config/globalLayoutComponentComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles !== (false || "false")) {
          result = null;
        } 
        setconfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);
  
  const [linkConfigProps, setLinkConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/linkComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  linkStyleName || configProps?.linkStyleName || null;
        let result = data.find(item => item.styleName === styleName );
        if (!result && linkNoStyles === (false || "false")) {
          result = data[0];
        } else if (linkNoStyles !== (false || "false")) {
          result = null;
        } 
        setLinkConfigProps(result);
      });
  }, [linkStyleName, linkNoStyles, configProps?.linkStyleName, apiBase, restPath, nodeName]);
  

  const linkExist = page || external || download || null;

// ---------------- LOGIKA ZA "page" MOŽE BITI UUID ILI PATH ----------------
  // Čuvat ćemo konačni path koji želimo koristiti, npr. /Home/... 
  const [resolvedPath, setResolvedPath] = useState(page);

  useEffect(() => {
    if (linkType !== 'page') return;

    // Ako page nije UUID, znači već je path => postavi ga takvog
    if (!isUuid(page)) {
      setResolvedPath(page);
      return;
    }

    // Ako je UUID, fetch-amo navigaciju i pronađemo ga
    async function resolveUuidToPath() {
      try {
        const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
        const response = await fetch(url);
        const data = await response.json();

        const foundNode = findNodeById(data, page);
        if (foundNode && foundNode['@path']) {
          setResolvedPath(foundNode['@path']);
        } else {
          // Ako nije pronađen, fallback
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
  const externalLink = isPublic ? external.replace("cmsAuthor", "cmsPublic") : external.replace("cmsPublic", "cmsAuthor");
  const href = linkType === "page"
    ? (getRouterBasename() + resolvedPath)
        .replace("//", "/")
        .replace("Home/Home", "Home")   // stara zamjena
    : linkType === "external"
      ? externalLink
      : downloadLink;

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";    

  const layouts = layout || configProps?.layout || "layout1";

  const defBgColor = wrapperDefaultBackColor || configProps?.wrapperDefaultBackColor || null;
  const hovBgColor = wrapperHoverBackColor || configProps?.wrapperHoverBackColor || null;

  const defLinkBgColor = linkDefaultBackColor || configProps?.linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || configProps?.linkHoverBackColor ||  linkConfigProps?.linkHoverBackColor || null;

  const defLabelColor = labelDefaultColor || configProps?.labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || configProps?.labelHoverColor || linkConfigProps?.labelHoverColor || null;

  const defChevronColor = chevronDefaultColor || configProps?.chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || configProps?.chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || configProps?.linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || configProps?.linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;


  const img1DefBgColor = image1DefaultBackColor || configProps?.image1DefaultBackColor || null;
  const img1HovBgColor = image1HoverBackColor || configProps?.image1HoverBackColor || null;

  const img2DefBgColor = image2DefaultBackColor || configProps?.image2DefaultBackColor || null;
  const img2HovBgColor = image2HoverBackColor || configProps?.image2HoverBackColor || null;

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || "";
  
  const globalLayoutComponentStyles = {
    paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || null,
    backgroundColor: defBgColor,
    borderColor: wrapperBorderColor || configProps?.wrapperBorderColor || null,
    borderWidth: wrapperBorderWidth || configProps?.wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || configProps?.wrapperBorderStyle || null,
    borderRadius: wrapperBorderRadius || configProps?.wrapperBorderRadius ||  null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || configProps?.headlineFontFamily || null,
    textAlign: headlinePosition || configProps?.headlinePosition ||null,
    fontSize: headlineFontSize || configProps?.headlineFontSize || null,
    lineHeight: headlineLineHeight || configProps?.headlineLineHeight || null,
    color: headlineColor || configProps?.headlineColor || null,
    letterSpacing: headlineLetterSpacing || configProps?.headlineLetterSpacing ||  null,
    fontWeight: headlineBold || configProps?.headlineBold || null,
    fontStyle: headlineItalic || configProps?.headlineItalic || null,
    textTransform: headlineTextTransform || configProps?.headlineTextTransform || null,
    paddingTop: headlinePaddingTop || configProps?.headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || configProps?.headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || configProps?.headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || configProps?.headlinePaddingLeft || null
  }

  const descriptionLinkWrapperStyles = { 
    flexDirection: descLinkLayout || configProps?.descLinkLayout || "column",
    gap: descLinkGap || configProps?.descLinkGap || null,
    alignItems: descLinkPosition || configProps?.descLinkPosition || null
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
    fontFamily: linkFontFamily || configProps?.linkFontFamily || linkConfigProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || configProps?.linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || configProps?.linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || configProps?.linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || configProps?.linkItalic || linkConfigProps?.linkItalic || null
  }

  const image1Styles = {
    objectPosition:  imagesPosition || configProps?.imagesPosition || null,
    objectFit: imagesFit || configProps?.imagesFit || null,
    height: imagesHeight || configProps?.imagesHeight || null,
    width: "100%",
    borderColor: image1BorderColor || configProps?.image1BorderColor || null,
    borderWidth: image1BorderWidth || configProps?.image1BorderWidth || null,
    borderStyle: image1BorderStyle || configProps?.image1BorderStyle || null,
    borderRadius: image1BorderRadius || configProps?.image1BorderRadius || null,
    paddingTop: image1PaddingTop || configProps?.image1PaddingTop || null,
    paddingRight: image1PaddingRight || configProps?.image1PaddingRight || null,
    paddingBottom: image1PaddingBottom || configProps?.image1PaddingBottom || null,
    paddingLeft: image1PaddingLeft || configProps?.image1PaddingLeft || null,
    backgroundColor: img1DefBgColor
  }

  const image2Styles = {
    objectPosition:  imagesPosition || configProps?.imagesPosition || null,
    objectFit: imagesFit || configProps?.imagesFit || null,
    height: imagesHeight || configProps?.imagesHeight || null,
    width: "100%",
    borderColor: image2BorderColor || configProps?.image2BorderColor || null,
    borderWidth: image2BorderWidth || configProps?.image2BorderWidth || null,
    borderStyle: image2BorderStyle || configProps?.image2BorderStyle || null,
    borderRadius: image2BorderRadius || configProps?.image2BorderRadius || null,
    paddingTop: image2PaddingTop || configProps?.image2PaddingTop || null,
    paddingRight: image2PaddingRight || configProps?.image2PaddingRight || null,
    paddingBottom: image2PaddingBottom || configProps?.image2PaddingBottom || null,
    paddingLeft: image2PaddingLeft || configProps?.image2PaddingLeft || null,
    backgroundColor: img2DefBgColor
  }

  return (
    <Wrapper className='globalLayoutComponentWrapper'
      hovBgColor={hovBgColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
      img1HovBgColor={img1HovBgColor} 
      img2HovBgColor={img2HovBgColor}        
    >
      {layouts !== "layout4" ?
        <div className={`globalLayoutComponent ${layouts}`} style={globalLayoutComponentStyles}>         
          {headline &&          
            <HeadlineLevel id={navigationId && navigationId} className="headline"style={headlineStyles}>
              {headline ? headline : null}
            </HeadlineLevel>
          }       
          <div className='imageComponentWrapper flex' style={{gap: imagesGap || configProps?.imagesGap || null, justifyContent: imagesHorizontalPosition || configProps?.imagesHorizontalPosition || null}}>
            {media1Type === "image1" && image1 &&
              <div style={{width:image1Width || "auto"}}>
                {/* <img className="image image1" src={isPublic ? image1['@link'].replace("cmsAuthor", "cmsPublic") : image1['@link']} alt="" style={image1Styles}/> */}
                <img className="image image1" src={image1['@link']} alt="" style={image1Styles}/>
              </div>
            }
            {media1Type === "video1" && video1 &&
              <div className="video1Component" style={{width:image1Width || "auto"}}>
                <video 
                  // src={isPublic ? video1['@link'].replace("cmsAuthor", "cmsPublic") : video1['@link']} 
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
                {/* <img className="image image2" src={isPublic ? image2['@link'].replace("cmsAuthor", "cmsPublic") : image2['@link']} alt="" style={image2Styles}/> */}
                <img className="image image2" src={image2['@link']} alt="" style={image2Styles}/>
              </div>
            }
            {media2Type === "video2" && video2 &&
              <div className="video2Component" style={{width:image2Width || "auto"}}>
                <video 
                  src={video2['@link']} 
                  // src={isPublic ? video2['@link'].replace("cmsAuthor", "cmsPublic") : video2['@link']} 
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
                <a className='link' href={href} target={linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}>
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
            <HeadlineLevel id={navigationId && navigationId} className="headline"style={headlineStyles}>
              {headline ? headline : null}
            </HeadlineLevel>
          }       
          <div className='imageComponentWrapper flex' style={{gap: imagesGap || configProps?.imagesGap || null, justifyContent: imagesHorizontalPosition || configProps?.imagesHorizontalPosition || null}}>
            {media1Type === "image1" && image1 &&
              <div style={{width:image1Width || "auto"}}>
                {/* <img className="image image1" src={isPublic ? image1['@link'].replace("cmsAuthor", "cmsPublic") : image1['@link']} alt="" style={image1Styles}/> */}
                <img className="image image1" src={image1['@link']} alt="" style={image1Styles}/>
              </div>
            }
            {media1Type === "video1" && video1 &&
              <div className="video1Component" style={{width:image1Width || "auto"}}>
                <video 
                  // src={isPublic ? video1['@link'].replace("cmsAuthor", "cmsPublic") : video1['@link']} 
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
                {/* <img className="image image2" src={isPublic ? image2['@link'].replace("cmsAuthor", "cmsPublic") : image2['@link']} alt="" style={image2Styles}/> */}
                <img className="image image2" src={image2['@link']} alt="" style={image2Styles}/>
              </div>
            }
            {media2Type === "video2" && video2 &&
              <div className="video2Component" style={{width:image2Width || "auto"}}>
                <video 
                  src={video2['@link']} 
                  // src={isPublic ? video2['@link'].replace("cmsAuthor", "cmsPublic") : video2['@link']} 
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
              <a className={`link ${linkIcon}`} href={href} target={linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}>
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

export default GlobalLayoutComponent;

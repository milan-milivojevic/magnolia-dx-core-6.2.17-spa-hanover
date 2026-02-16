import React, { useState, useEffect, useId } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { IoAtSharp } from "react-icons/io5";
import { getAPIBase, getRouterBasename } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../images/home/DownloadIcon.svg';
import { isPublicInstance } from '../../helpers/AppHelpers';
import LinkModal from '../../helpers/LinkModal';

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
  .specialLayoutComponent:hover {
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
  figure:hover, .videoComponent:hover, .embedVideoComponent:hover {
    background-color: ${(props) => props.figureHovBgColor && props.figureHovBgColor + "!important"};
  }
  img:hover, video:hover {
    background-color: ${(props) => props.imgHovBgColor && props.imgHovBgColor + "!important"};
  }
}`

function SpecialLayoutComponent ({
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
    mediaType,
    embed,
    video, 
    autoplay,
    loop,
    muted,
    controls,
    image,
    imageCaption,
    imagePosition,
    imageFit,
    imageWidth,
    imageHeight,
    imageBorderColor,
    imageBorderWidth,
    imageBorderStyle,
    imageBorderRadius,
    imagePaddingTop,
    imagePaddingRight,
    imagePaddingBottom,
    imagePaddingLeft,
    imageDefaultBackColor,
    imageHoverBackColor,
    imageCaptionColor,
    imageCaptionLineHeight,
    imageCaptionFontSize,
    imageCaptionPosition,
    imageWrapperPosition,
    imageWrapperBorderColor,
    imageWrapperBorderWidth,
    imageWrapperBorderStyle,
    imageWrapperBorderRadius,
    imageWrapperPaddingTop,
    imageWrapperPaddingRight,
    imageWrapperPaddingBottom,
    imageWrapperPaddingLeft,
    imageWrapperDefaultBackColor,
    imageWrapperHoverBackColor,
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
    imageLayoutWidth,
    imageTextGap,
    descLinkVerticalPosition,
    linkPosition,
    linkStyleName,
    linkNoStyles,
    styleName,
    noStyles
  }) {

  const id = useId(); 

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const isPublic = isPublicInstance();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    
  
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [configProps, setconfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Layout-Components-Config/specialLayoutComponentComponents/@nodes`)
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

  const toggleLinkModal = (e) => {
    setShowLinkModal(!showLinkModal);
    e.preventDefault();
  }

  const closeLinkModal = () => {
    setShowLinkModal(false);
  }

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


  const imgDefBgColor = imageDefaultBackColor || configProps?.imageDefaultBackColor || null;
  const imgHovBgColor = imageHoverBackColor || configProps?.imageHoverBackColor || null;

  const figureDefBgColor = imageWrapperDefaultBackColor || configProps?.imageWrapperDefaultBackColor || null;
  const figureHovBgColor = imageWrapperHoverBackColor || configProps?.imageWrapperHoverBackColor || figureDefBgColor; 

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || "";
  const linkDestination = linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank";
  
  const specialLayoutComponentStyles = {
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

  const descriptionStyles = {
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
    paddingTop: linkPaddingTop || configProps?.linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || configProps?.linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null, 
    justifyContent: linkPosition || configProps?.linkPosition || null
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
  
  const figureWidth = imageLayoutWidth || configProps?.imageLayoutWidth || null
  
  const figureStyles = {
    alignItems: imageWrapperPosition || configProps?.imageWrapperPosition || null,
    width: figureWidth || null,
    borderColor: imageWrapperBorderColor || configProps?.imageWrapperBorderColor || null,
    borderWidth: imageWrapperBorderWidth || configProps?.imageWrapperBorderWidth || null,
    borderStyle: imageWrapperBorderStyle || configProps?.imageWrapperBorderStyle || null,
    borderRadius: imageWrapperBorderRadius || configProps?.imageWrapperBorderRadius || null,
    paddingTop: imageWrapperPaddingTop || configProps?.imageWrapperPaddingTop || null,
    paddingRight: imageWrapperPaddingRight || configProps?.imageWrapperPaddingRight || null,
    paddingBottom: imageWrapperPaddingBottom || configProps?.imageWrapperPaddingBottom || null,
    paddingLeft: imageWrapperPaddingLeft || configProps?.imageWrapperPaddingLeft || null,
    backgroundColor: figureDefBgColor
  }

  const figcaptionStyles = {
    textAlign:  imageCaptionPosition || configProps?.imageCaptionPosition ||  null,
    color: imageCaptionColor ||configProps?.imageCaptionColor ||  null,
    fontSize: imageCaptionFontSize || configProps?.imageCaptionFontSize||  null,
    lineHeight: imageCaptionLineHeight || configProps?.imageCaptionLineHeight ||  null,
    width: "100%"
  }

  const imageStyles = {
    objectPosition:  imagePosition || configProps?.imagePosition || null,
    objectFit: imageFit || configProps?.imageFit || null,
    width: imageWidth || configProps?.imageWidth || null,
    height: imageHeight || configProps?.imageHeight || null,
    borderColor: imageBorderColor || configProps?.imageBorderColor || null,
    borderWidth: imageBorderWidth || configProps?.imageBorderWidth || null,
    borderStyle: imageBorderStyle || configProps?.imageBorderStyle || null,
    borderRadius: imageBorderRadius || configProps?.imageBorderRadius || null,
    paddingTop: imagePaddingTop || configProps?.imagePaddingTop || null,
    paddingRight: imagePaddingRight || configProps?.imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || configProps?.imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || configProps?.imagePaddingLeft || null,
    backgroundColor: imgDefBgColor
  }

  return (
    <Wrapper className='specialLayoutComponentWrapper'
      hovBgColor={hovBgColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
      imgHovBgColor={imgHovBgColor} 
      figureHovBgColor={figureHovBgColor}    
    >
      <div className={`specialLayoutComponent ${layouts}`} style={specialLayoutComponentStyles}>         
        {headline &&          
          <HeadlineLevel id={navigationId && navigationId} className="headline"style={headlineStyles}>
            {headline ? headline : null}
          </HeadlineLevel>
        }
        <div className='specialLayouts' style={{columnGap: imageTextGap || configProps?.imageTextGap || null }}>
          {mediaType === "image" && image &&
            <figure className="imageComponent" style={figureStyles}>
              <img className="image" src={image['@link']} alt="" style={imageStyles}/>
              <figcaption style={figcaptionStyles}>{imageCaption || null}</figcaption>
            </figure> 
          }
          {mediaType === "video" && video &&
            <div className="videoComponent" style={figureStyles}>
              <video 
                src={baseUrl + video['@link']} 
                style={imageStyles}
                preload="auto"
                autoPlay={autoplay === (false || "false") ? null : "autoplay"}
                controls="controls"
                muted={muted === (false || "false") ? null : "muted"}
                loop={loop === (false || "false") ? null : "loop"}
                id={"video_" + id}
                className="video"
              ></video>
            </div>
          }
          {mediaType === "embed" && embed &&
            <div className="embedVideoComponent" style={figureStyles} 
              dangerouslySetInnerHTML={{ __html:embed || null }}>
            </div>
          }
          <div className='descLinkWrapper' style={{width: `calc(100% - ${figureWidth || configProps?.figureWidth} - ${imageTextGap || configProps?.imageTextGap || 0})`, justifyContent: descLinkVerticalPosition || configProps?.descLinkVerticalPosition}}>
            {description &&
              <div className={`description ${descriptionStyle || configProps?.descriptionStyle}`} 
                    dangerouslySetInnerHTML={{ __html:description || null }} 
                    style={descriptionStyles}>                      
              </div>
            }
            {linkExist && (linkDestination !== "iFrame") &&
              <div className='linkComponent' style={linkComponentStyles} >
                <a className={`link ${linkIcon}`} href={href} target={linkDestination} rel="noreferrer"style= {linkStyles}> 
                  {linkLabel ? linkLabel : ""} 
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
            {linkExist && (linkDestination === "iFrame") &&
              <div className='linkComponent' style={linkComponentStyles} >
                <a onClick={toggleLinkModal} className={`link ${linkIcon}`} style= {linkStyles}> 
                  {linkLabel ? linkLabel : ""} 
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
            {showLinkModal && linkExist && (linkDestination === "iFrame") && <LinkModal src={href} isOpen={showLinkModal} closeModal={closeLinkModal}></LinkModal>}            
          </div>
        </div>        
      </div>
    </Wrapper>
  )
}

export default SpecialLayoutComponent;

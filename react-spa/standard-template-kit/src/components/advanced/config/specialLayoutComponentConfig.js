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

function SpecialLayoutComponentConfig ({
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
    descriptionAlign,
    descriptionColor,
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

  const imgDefBgColor = imageDefaultBackColor || null;
  const imgHovBgColor = imageHoverBackColor || null;

  const figureDefBgColor = imageWrapperDefaultBackColor || null;  
  const figureHovBgColor = imageWrapperHoverBackColor || figureDefBgColor;
  
  const linkIcons = linkIcon || linkConfigProps?.linkIcon || "";

  const specialLayoutComponentStyles = {
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

  const descriptionStyles = {
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
    paddingTop: linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null,
    justifyContent: linkPosition || null
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
    fontFamily: linkFontFamily || linkConfigProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || linkConfigProps?.linkItalic || null
  }
  
  const figureWidth = imageLayoutWidth || null
  
  const figureStyles = {
    alignItems: imageWrapperPosition || null,
    width: figureWidth,
    borderColor: imageWrapperBorderColor || null,
    borderWidth: imageWrapperBorderWidth || null,
    borderStyle: imageWrapperBorderStyle || null,
    borderRadius: imageWrapperBorderRadius || null,
    paddingTop: imageWrapperPaddingTop || null,
    paddingRight: imageWrapperPaddingRight || null,
    paddingBottom: imageWrapperPaddingBottom || null,
    paddingLeft: imageWrapperPaddingLeft || null,
    backgroundColor: figureDefBgColor
  }

  const figcaptionStyles = {
    textAlign:  imageCaptionPosition || null,
    color: imageCaptionColor || null,
    fontSize: imageCaptionFontSize || null,
    lineHeight: imageCaptionLineHeight || null,
    width: "100%"
  }

  const imageStyles = {
    objectPosition:  imagePosition || null,
    objectFit: imageFit || null,
    width: imageWidth || null,
    height: imageHeight || null,
    borderColor: imageBorderColor || null,
    borderWidth: imageBorderWidth || null,
    borderStyle: imageBorderStyle || null,
    borderRadius: imageBorderRadius || null,
    paddingTop: imagePaddingTop || null,
    paddingRight: imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || null,
    backgroundColor: imgDefBgColor
  }
  
  return (
    <Wrapper className='specialLayoutComponentWrapper configComponents'
      hovBgColor={hovBgColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
      imgHovBgColor={imgHovBgColor} 
      figureHovBgColor={figureHovBgColor}     
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>  
      <div className={`specialLayoutComponent ${layouts}`} style={specialLayoutComponentStyles}> 
        {headline &&         
          <HeadlineLevel className="headline"style={headlineStyles}>
            {headline ? headline : null}
          </HeadlineLevel>
        }
        <div className='specialLayouts' style={{columnGap: imageTextGap || null }}>
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
          <div className='descLinkWrapper' style={{width: `calc(100% - ${figureWidth} - ${imageTextGap || 0})`, justifyContent: descLinkVerticalPosition}}>
            {description &&
              <div className={`description ${descriptionStyle}`} 
                    dangerouslySetInnerHTML={{ __html:description || null }} 
                    style={descriptionStyles}>                      
              </div>
            }
            {linkExist &&
              <div className='linkComponent' style={linkComponentStyles}>
                <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}>
                  {linkLabel ? linkLabel : ""} 
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

export default SpecialLayoutComponentConfig;

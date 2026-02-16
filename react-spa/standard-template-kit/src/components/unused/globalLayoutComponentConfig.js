import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../../helpers/AppHelpers';
import styled from 'styled-components';

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
  figure:hover {
    background-color: ${(props) => props.figureHovBgColor && props.figureHovBgColor + "!important"};
  }
  img:hover {
    background-color: ${(props) => props.imgHovBgColor && props.imgHovBgColor + "!important"};
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
    linkLabelLineHeight,
    labelPaddingTop,
    labelPaddingBottom,
    labelPaddingRight,
    labelPaddingLeft,
    linkBold,
    linkItalic,
    chevronDefaultColor,
    chevronHoverColor,
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
    linkPosition,
    linkRightLayout,
    linkRightPosition,
    imageLayoutWidth,
    imageTextGap,
    descLinkVerticalPosition,
    linkWrapperHeight,
    imageStyleName,
    imageNoStyles,
    linkStyleName,
    linkNoStyles,
    styleName      
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

  const [imageConfigProps, setImageConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/imageComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === imageStyleName);
        if (!result && imageNoStyles === (false || "false")) {
          result = data[0];
        } else if (imageNoStyles !== (false || "false")) {
          result = null;
        } 
        setImageConfigProps(result);
      });
  }, [imageStyleName, imageNoStyles, apiBase, restPath, nodeName]);

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

  const HeadlineLevel = headlineLevel || "h1";  
  const downloadLink = download ? baseUrl + download['@link'] : baseUrl; 
  const href = linkType === "page" ? (getRouterBasename() + page).replace("//", "/").replace("Home/Home", "Home") : linkType === "external" ? external : downloadLink;

  const validOddLayouts = ["layout1", "layout3", "layout5"];
  const validEvenLayouts = ["layout2", "layout4"];
  const validSpecialLayouts = ["layout6", "layout7"];

  const layouts = layout || "layout1";
  const linkRightLayouts = validEvenLayouts.includes(layouts) ? linkRightLayout : "auto";
  const oddLayoutsLinkPosition = validOddLayouts.includes(layouts) ? linkPosition : null;
  const evenLayoutsLinkPosition = validEvenLayouts.includes(layouts) || validSpecialLayouts.includes(layouts) ? linkRightPosition : "center_left";


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

  const imgDefBgColor = imageDefaultBackColor || imageConfigProps?.imageDefaultBackColor || null;
  const imgHovBgColor = imageHoverBackColor || imageConfigProps?.imageHoverBackColor || null;

  const figureDefBgColor = imageWrapperDefaultBackColor || null;  
  const figureHovBgColor = imageWrapperHoverBackColor || figureDefBgColor;
  
  const linkIcons = linkIcon || linkConfigProps?.linkIcon || "";

  const linkSpecialHeight = validSpecialLayouts.includes(layouts) ? linkWrapperHeight : null;

  const globalLayoutComponentStyles = {
    gridTemplateColumns: linkRightLayouts,
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
    textAlign: descriptionAlign || null       
  }

  // const linkWraperPaddingBottom = linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null;
  // console.log(linkPaddingBottom);
  // console.log(linkWraperPaddingBottom);
  // const fontSizeCalc = linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null;
  // const lineHeightCalc = linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null;

  // const linkWraperPaddingBottomCalculated = linkWraperPaddingBottom > (lineHeightCalc || fontSizeCalc) ? linkWraperPaddingBottom : (lineHeightCalc || fontSizeCalc);

  const linkComponentStyles = {
    height: linkSpecialHeight,
    paddingTop: linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    // paddingBottom: validSpecialLayouts.includes(layouts) ? linkWraperPaddingBottomCalculated : linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null, 
    justifySelf: oddLayoutsLinkPosition 
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
    lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || linkConfigProps?.linkItalic || null
  }
  
  const figureWidth = imageLayoutWidth || imageConfigProps?.imageLayoutWidth || null
  
  const figureStyles = {
    alignItems: imageWrapperPosition || imageConfigProps?.imageWrapperPosition || null,
    width: figureWidth,
    borderColor: imageWrapperBorderColor || imageConfigProps?.imageWrapperBorderColor || null,
    borderWidth: imageWrapperBorderWidth || imageConfigProps?.imageWrapperBorderWidth || null,
    borderStyle: imageWrapperBorderStyle || imageConfigProps?.imageWrapperBorderStyle || null,
    borderRadius: imageWrapperBorderRadius || imageConfigProps?.imageWrapperBorderRadius || null,
    paddingTop: imageWrapperPaddingTop || imageConfigProps?.imageWrapperPaddingTop || null,
    paddingRight: imageWrapperPaddingRight || imageConfigProps?.imageWrapperPaddingRight || null,
    paddingBottom: imageWrapperPaddingBottom || imageConfigProps?.imageWrapperPaddingBottom || null,
    paddingLeft: imageWrapperPaddingLeft || imageConfigProps?.imageWrapperPaddingLeft || null,
    backgroundColor: figureDefBgColor
  }

  const figcaptionStyles = {
    textAlign:  imageCaptionPosition || imageConfigProps?.imageCaptionPosition || null,
    color: imageCaptionColor || imageConfigProps?.imageCaptionColor || null,
    fontSize: imageCaptionFontSize || imageConfigProps?.imageCaptionFontSize || null,
    lineHeight: imageCaptionLineHeight || imageConfigProps?.imageCaptionLineHeight || null,
    width: "100%"
  }

  const imageStyles = {
    objectPosition:  imagePosition || imageConfigProps?.imagePosition || null,
    objectFit: imageFit || imageConfigProps?.imageFit || null,
    width: imageWidth || imageConfigProps?.imageWidth || null,
    height: imageHeight || imageConfigProps?.imageHeight || null,
    borderColor: imageBorderColor || imageConfigProps?.imageBorderColor || null,
    borderWidth: imageBorderWidth || imageConfigProps?.imageBorderWidth || null,
    borderStyle: imageBorderStyle || imageConfigProps?.imageBorderStyle || null,
    borderRadius: imageBorderRadius || imageConfigProps?.imageBorderRadius || null,
    paddingTop: imagePaddingTop || imageConfigProps?.imagePaddingTop || null,
    paddingRight: imagePaddingRight || imageConfigProps?.imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || imageConfigProps?.imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || imageConfigProps?.imagePaddingLeft || null,
    backgroundColor: imgDefBgColor
  }
  
  return (
    <Wrapper className='globalLayoutComponentWrapper configComponents'
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
      <div className={`globalLayoutComponent ${layouts} ${evenLayoutsLinkPosition}`} style={globalLayoutComponentStyles}> 
        {headline &&         
          <HeadlineLevel className="headline"style={headlineStyles}>
            {headline ? headline : null}
          </HeadlineLevel>
        }
        {!validSpecialLayouts.includes(layouts) ?
          <React.Fragment>
            {image &&
              <figure className="imageComponent" style={{alignItems: imageWrapperPosition || imageConfigProps?.imageWrapperPosition || null }} >
                <img className="image" src={baseUrl + image['@link']} alt="" style={imageStyles}/>
                <figcaption style={figcaptionStyles}>{imageCaption || null}</figcaption>
              </figure> 
            }
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
          </React.Fragment> 
        : 
          <div className='specialLayouts' style={{columnGap: imageTextGap || null }}>
            {image &&
              <figure className="imageComponent" style={figureStyles}>
                <img className="image" src={baseUrl + image['@link']} alt="" style={imageStyles}/>
                <figcaption style={figcaptionStyles}>{imageCaption || null}</figcaption>
              </figure> 
            }
            <div className='descLinkWrapper' style={{width: `calc(100% - ${figureWidth}`, justifyContent: descLinkVerticalPosition}}>
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
        } 
      </div>
    </Wrapper>
  )
}

export default GlobalLayoutComponentConfig;

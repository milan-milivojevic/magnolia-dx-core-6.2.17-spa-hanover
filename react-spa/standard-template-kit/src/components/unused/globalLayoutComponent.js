import React, { useState, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../helpers/AppHelpers';
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

function GlobalLayoutComponent ({
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
    imageStyleName,
    imageNoStyles,
    linkStyleName,
    linkNoStyles,
    styleName,
    noStyles,
    layout,
    linkPosition,
    linkRightLayout,
    linkRightPosition,
    imageLayoutWidth,
    imageTextGap,
    descLinkVerticalPosition,
    linkWrapperHeight
  }) {

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    
    
  const [configProps, setconfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Layout-Component-Config/globalLayoutComponentComponents/@nodes`)
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
  
  const [imageConfigProps, setImageConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/imageComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  imageStyleName || configProps?.imageStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && imageNoStyles === (false || "false")) {
          result = data[0];
        } else if (imageNoStyles !== (false || "false")) {
          result = null;
        } 
        setImageConfigProps(result);
      });
  }, [imageStyleName, imageNoStyles, configProps?.imageStyleName, apiBase, restPath, nodeName]);

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

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";  
  const downloadLink = download ? baseUrl + download['@link'] : baseUrl;  
  const href = linkType === "page" ? (getRouterBasename() + page).replace("//", "/").replace("Home/Home", "Home") : linkType === "external" ? external : downloadLink;

  const validOddLayouts = ["layout1", "layout3", "layout5"];
  const validEvenLayouts = ["layout2", "layout4"];
  const validSpecialLayouts = ["layout6", "layout7"];

  const layouts = layout || configProps?.layout || "layout1";
  const linkRightLayouts = validEvenLayouts.includes(layouts) ? linkRightLayout || configProps?.linkRightLayout : "auto";
  const oddLayoutsLinkPosition = validOddLayouts.includes(layouts) ? linkPosition || configProps?.linkPosition : null;
  const evenLayoutsLinkPosition = validEvenLayouts.includes(layouts) || validSpecialLayouts.includes(layouts) ? linkRightPosition || configProps?.linkRightPosition : "center_left";


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


  const imgDefBgColor = imageDefaultBackColor || configProps?.imageDefaultBackColor || imageConfigProps?.imageDefaultBackColor || null;
  const imgHovBgColor = imageHoverBackColor || configProps?.imageHoverBackColor || imageConfigProps?.imageHoverBackColor || null;

  const figureDefBgColor = imageWrapperDefaultBackColor || configProps?.imageWrapperDefaultBackColor || configProps?.imageWrapperDefaultBackColor || null;
  const figureHovBgColor = imageWrapperHoverBackColor || configProps?.imageWrapperHoverBackColor || configProps?.imageWrapperHoverBackColor || figureDefBgColor; 

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || "";

  const linkSpecialHeight = validSpecialLayouts.includes(layouts) ? (linkWrapperHeight || configProps?.linkWrapperHeight) : null;
  
  const globalLayoutComponentStyles = {
    gridTemplateColumns: linkRightLayouts,
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
    textAlign: descriptionAlign || configProps?.descriptionAlign || null       
  }

  // const linkWraperPaddingBottom = linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null;
  // const fontSizeCalc = linkLabelFontSize || configProps?.linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null;
  // const lineHeightCalc = linkLabelLineHeight || configProps?.linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null;

  // const linkWraperPaddingBottomCalculated = linkWraperPaddingBottom > (lineHeightCalc || fontSizeCalc) ? linkWraperPaddingBottom : (lineHeightCalc || fontSizeCalc);

  const linkComponentStyles = {
    height: linkSpecialHeight,
    paddingTop: linkPaddingTop || configProps?.linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || configProps?.linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    // paddingBottom: validSpecialLayouts.includes(layouts) ? linkWraperPaddingBottomCalculated : linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null, 
    justifySelf: oddLayoutsLinkPosition 
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
    lineHeight: linkLabelLineHeight || configProps?.linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || configProps?.linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || configProps?.linkItalic || linkConfigProps?.linkItalic || null
  }
  
  const figureWidth = imageLayoutWidth || configProps?.imageLayoutWidth || imageConfigProps?.imageLayoutWidth || null
  
  const figureStyles = {
    alignItems: imageWrapperPosition || configProps?.imageWrapperPosition || imageConfigProps?.imageWrapperPosition || null,
    width: figureWidth || null,
    borderColor: imageWrapperBorderColor || configProps?.imageWrapperBorderColor || configProps?.imageWrapperBorderColor || null,
    borderWidth: imageWrapperBorderWidth || configProps?.imageWrapperBorderWidth || configProps?.imageWrapperBorderWidth || null,
    borderStyle: imageWrapperBorderStyle || configProps?.imageWrapperBorderStyle || configProps?.imageWrapperBorderStyle || null,
    borderRadius: imageWrapperBorderRadius || configProps?.imageWrapperBorderRadius || configProps?.imageWrapperBorderRadius || null,
    paddingTop: imageWrapperPaddingTop || configProps?.imageWrapperPaddingTop || configProps?.imageWrapperPaddingTop || null,
    paddingRight: imageWrapperPaddingRight || configProps?.imageWrapperPaddingRight || configProps?.imageWrapperPaddingRight || null,
    paddingBottom: imageWrapperPaddingBottom || configProps?.imageWrapperPaddingBottom || configProps?.imageWrapperPaddingBottom || null,
    paddingLeft: imageWrapperPaddingLeft || configProps?.imageWrapperPaddingLeft || configProps?.imageWrapperPaddingLeft || null,
    backgroundColor: figureDefBgColor
  }

  const figcaptionStyles = {
    textAlign:  imageCaptionPosition || configProps?.imageCaptionPosition ||  imageConfigProps?.imageCaptionPosition || null,
    color: imageCaptionColor ||configProps?.imageCaptionColor ||  imageConfigProps?.imageCaptionColor || null,
    fontSize: imageCaptionFontSize || configProps?.imageCaptionFontSize||  imageConfigProps?.imageCaptionFontSize || null,
    lineHeight: imageCaptionLineHeight || configProps?.imageCaptionLineHeight ||  imageConfigProps?.imageCaptionLineHeight || null,
    width: "100%"
  }

  const imageStyles = {
    objectPosition:  imagePosition || configProps?.imagePosition || imageConfigProps?.imagePosition || null,
    objectFit: imageFit || configProps?.imageFit || imageConfigProps?.imageFit || null,
    width: imageWidth || configProps?.imageWidth || imageConfigProps?.imageWidth || null,
    height: imageHeight || configProps?.imageHeight || imageConfigProps?.imageHeight || null,
    borderColor: imageBorderColor || configProps?.imageBorderColor || imageConfigProps?.imageBorderColor || null,
    borderWidth: imageBorderWidth || configProps?.imageBorderWidth || imageConfigProps?.imageBorderWidth || null,
    borderStyle: imageBorderStyle || configProps?.imageBorderStyle || imageConfigProps?.imageBorderStyle || null,
    borderRadius: imageBorderRadius || configProps?.imageBorderRadius || imageConfigProps?.imageBorderRadius || null,
    paddingTop: imagePaddingTop || configProps?.imagePaddingTop || imageConfigProps?.imagePaddingTop || null,
    paddingRight: imagePaddingRight || configProps?.imagePaddingRight || imageConfigProps?.imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || configProps?.imagePaddingBottom || imageConfigProps?.imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || configProps?.imagePaddingLeft || imageConfigProps?.imagePaddingLeft || null,
    backgroundColor: imgDefBgColor
  }

  return (
    <Wrapper className='globalLayoutComponentWrapper'
      hovBgColor={hovBgColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
      imgHovBgColor={imgHovBgColor} 
      figureHovBgColor={figureHovBgColor}    
    >
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
              <div className={`description ${descriptionStyle || configProps?.descriptionStyle}`}
                   dangerouslySetInnerHTML={{ __html:description || null }} 
                   style={descriptionStyles}>                    
              </div>
            }
            {linkExist &&
              <div className='linkComponent' style= {linkComponentStyles}>
                <a className='link' href={href} target={linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}> 
                  {linkLabel ? linkLabel : ""} 
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
          </React.Fragment> 
        : 
          <div className='specialLayouts' style={{columnGap: imageTextGap || configProps?.imageTextGap || null }}>
            {image &&
              <figure className="imageComponent" style={figureStyles}>
                <img className="image" src={baseUrl + image['@link']} alt="" style={imageStyles}/>
                <figcaption style={figcaptionStyles}>{imageCaption || null}</figcaption>
              </figure> 
            }
            <div className='descLinkWrapper' style={{width: `calc(100% - ${figureWidth || configProps?.figureWidth }`, justifyContent: descLinkVerticalPosition || configProps?.descLinkVerticalPosition}}>
              {description &&
                <div className={`description ${descriptionStyle || configProps?.descriptionStyle}`} 
                     dangerouslySetInnerHTML={{ __html:description || null }} 
                     style={descriptionStyles}>                      
                </div>
              }
              {linkExist &&
                <div className='linkComponent' style={linkComponentStyles} >
                  <a className='link' href={href} target={linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank"} rel="noreferrer"style= {linkStyles}> 
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

export default GlobalLayoutComponent;

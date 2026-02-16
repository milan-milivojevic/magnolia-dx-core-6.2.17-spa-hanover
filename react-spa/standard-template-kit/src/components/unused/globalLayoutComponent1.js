import React, { useState, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getRouterBasename } from '../../helpers/AppHelpers';

function GlobalLayoutComponent1 ({
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
    image,
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
    video,
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
    linkRightPosition    
  }) {

    
  const [configProps, setconfigProps] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/magnoliaAuthor/.rest/pages/Main-Page/Advanced-Config/global/@nodes')
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === false) {
          result = data[0];
        } else if (noStyles === true) {
          result = null;
        } 
        setconfigProps(result);
      });
  }, [styleName, noStyles]);
  
  const [imageConfigProps, setImageConfigProps] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/magnoliaAuthor/.rest/pages/Main-Page/Basics-Config/imageComponents/@nodes')
      .then(response => response.json())
      .then(data => {
        let styleName =  imageStyleName || configProps?.imageStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && imageNoStyles === false) {
          result = data[0];
        } else if (imageNoStyles === true) {
          result = null;
        } 
        setImageConfigProps(result);
      });
  }, [imageStyleName, imageNoStyles, configProps?.imageStyleName]);

  const [linkConfigProps, setLinkConfigProps] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/magnoliaAuthor/.rest/pages/Main-Page/Basics-Config/linkComponents/@nodes')
      .then(response => response.json())
      .then(data => {
        let styleName =  linkStyleName || configProps?.linkStyleName || null;
        let result = data.find(item => item.styleName === styleName );
        if (!result && linkNoStyles === false) {
          result = data[0];
        } else if (linkNoStyles === true) {
          result = null;
        } 
        setLinkConfigProps(result);
      });
  }, [linkStyleName, linkNoStyles, configProps?.linkStyleName]);


  const defBgColor = wrapperDefaultBackColor || configProps?.wrapperDefaultBackColor || "transparent";
  const hovBgColor = wrapperHoverBackColor || configProps?.wrapperHoverBackColor || "transparent";

  const [bgColor, setBgColor] = useState(defBgColor);
  
  useEffect(() => {
    setBgColor(defBgColor)
  }, [defBgColor]);

  const defLinkBgColor = linkDefaultBackColor || configProps?.linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || "transparent";
  const hovLinkBgColor = linkHoverBackColor || configProps?.linkHoverBackColor ||  linkConfigProps?.linkHoverBackColor || "transparent";
  const defLabelColor = labelDefaultColor || configProps?.labelDefaultColor || linkConfigProps?.labelDefaultColor || "transparent";
  const hovLabelColor = labelHoverColor || configProps?.labelHoverColor || linkConfigProps?.labelHoverColor || "transparent";
  const imgDefBgColor = imageDefaultBackColor || configProps?.imageDefaultBackColor || imageConfigProps?.imageDefaultBackColor || "transparent";
  const imgHovBgColor = imageHoverBackColor || configProps?.imageHoverBackColor || imageConfigProps?.imageHoverBackColor || "transparent";

  const [linkBgColor, setLinkBgColor] = useState(defLinkBgColor);
  const [linkLabelColor, setLinkLabelColor] = useState(defLinkBgColor);
  const [imgBgColor, setImgBgColor] = useState(imgDefBgColor);
  
  useEffect(() => {
    setLinkBgColor(defLinkBgColor)
  }, [defLinkBgColor]);

  useEffect(() => {
    setLinkLabelColor(defLabelColor)
  }, [defLabelColor]);

  useEffect(() => {
    setImgBgColor(imgDefBgColor);
  }, [imgDefBgColor]); 

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";  
  const download = image ? "http://localhost:8080" + image['@link'] : "http://localhost:8080";  
  const href = linkType === "page" ? (getRouterBasename() + page).replace("//", "/").replace("Home/Home", "Home") : linkType === "external" ? external : downloadLink;

  const validOddLayouts = ["layout1", "layout3", "layout5"];
  const validEvenLayouts = ["layout2", "layout4"];

  const layouts = layout || configProps?.layout || "layout1";
  const linkRightLayouts = validEvenLayouts.includes(layouts) ? linkRightLayout || configProps?.linkRightLayout : "auto";
  const oddLayoutsLinkPosition = validOddLayouts.includes(layouts) ? linkPosition || configProps?.linkPosition : null;
  const evenLayoutsLinkPosition = validEvenLayouts.includes(layouts) ? linkRightPosition || configProps?.linkRightPosition : "center_left";

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || "";

  const globalLayoutComponentStyles = {
    gridTemplateColumns: linkRightLayouts,
    paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || null,
    backgroundColor: bgColor,
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
    borderRadius: descriptionBorderRadius || configProps?.descriptionBorderRadius || null
  }

  const linkWrapperStyles = {
    paddingTop: linkPaddingTop || configProps?.linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || configProps?.linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null, 
    justifySelf: oddLayoutsLinkPosition 
  }

  const linkComponentStyles = {
    backgroundColor: linkBgColor,
    color: linkLabelColor,
    paddingTop: labelPaddingTop || configProps?.labelPaddingTop || linkConfigProps?.labelPaddingTop || null,
    paddingRight: labelPaddingRight || configProps?.labelPaddingRight || linkConfigProps?.labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || configProps?.labelPaddingBottom || linkConfigProps?.labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || configProps?.labelPaddingLeft || linkConfigProps?.labelPaddingLeft || null, 
    borderColor: linkBorderColor || configProps?.linkBorderColor || linkConfigProps?.linkBorderColor || null,
    borderWidth: linkBorderWidth || configProps?.linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || configProps?.linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || configProps?.linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || configProps?.linkWidth || linkConfigProps?.linkWidth || null,
    height: linkHeight || configProps?.linkHeight || linkConfigProps?.linkHeight || null,
    textDecoration: linkLabelDecoration || configProps?.linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent: linkLabelHorizontalPosition || configProps?.linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems: linkLabelVerticalPosition || configProps?.linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontSize: linkLabelFontSize || configProps?.linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || configProps?.linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || configProps?.linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || configProps?.linkItalic || linkConfigProps?.linkItalic || null
  }

  const figcaptionStyles = {
    textAlign:  imageCaptionPosition || imageConfigProps?.imageCaptionPosition || null,
    color: imageCaptionColor || imageConfigProps?.imageCaptionColor || null,
    fontSize: imageCaptionFontSize || imageConfigProps?.imageCaptionFontSize || null,
    lineHeight: imageCaptionLineHeight || imageConfigProps?.imageCaptionLineHeight || null,
    width: imageWidth || imageConfigProps?.imageWidth || null
  }

  const imageStyles = {
    objectPosition:  imagePosition || imageConfigProps?.imagePosition || null,
    objectFit: imageFit || imageConfigProps?.imageFit || null,
    width: imageWidth || imageConfigProps?.imageWidth || "100%",
    height: imageHeight || imageConfigProps?.imageHeight || null,
    borderColor: imageBorderColor || imageConfigProps?.imageBorderColor || null,
    borderWidth: imageBorderWidth || imageConfigProps?.imageBorderWidth || null,
    borderStyle: imageBorderStyle || imageConfigProps?.imageBorderStyle || null,
    borderRadius: imageBorderRadius || imageConfigProps?.imageBorderRadius || null,
    paddingTop: imagePaddingTop || imageConfigProps?.imagePaddingTop || null,
    paddingRight: imagePaddingRight || imageConfigProps?.imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || imageConfigProps?.imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || imageConfigProps?.imagePaddingLeft || null,
    backgroundColor: imgBgColor
  }


  return (
    <div className='glc_editMode'>
      <div className={`globalLayoutComponent ${layouts} ${evenLayoutsLinkPosition}`}
        style={globalLayoutComponentStyles}
        onMouseEnter={() => setBgColor(hovBgColor)}
        onMouseLeave={() => setBgColor(defBgColor)} 
      >         
        <HeadlineLevel className="headline"style={headlineStyles}>
          {headline ? headline : null}
        </HeadlineLevel>
        
        <figure className="imageComponent" style={{alignItems: imageWrapperPosition || imageConfigProps?.imageWrapperPosition || null }} >
          <img className="image" src={"http://localhost:8080" + video['@link']} alt="" style={imageStyles}
            onMouseEnter={() => setImgBgColor(imgHovBgColor)}
            onMouseLeave={() => setImgBgColor(imgDefBgColor)} 
          />
          <figcaption style={figcaptionStyles}>{imageCaption || null}</figcaption>
        </figure> 
         
        <div className="description" dangerouslySetInnerHTML={{ __html:description ? description : null }} style={{descriptionStyles}}></div>

        <div className='linkWrapper' style= {linkWrapperStyles} >
          <a className='linkComponent' href={href} target={linkLocation ? linkLocation : "_blank"} rel="noreferrer"
              style= {linkComponentStyles}
              onMouseEnter={() => {setLinkBgColor(hovLinkBgColor); setLinkLabelColor(hovLabelColor)}}
              onMouseLeave={() => {setLinkBgColor(defLinkBgColor); setLinkLabelColor(defLabelColor)}} 
          > {linkLabel ? linkLabel : ""} 
            {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
          </a>
        </div>

      </div>
    </div>
  )
}

export default GlobalLayoutComponent1;

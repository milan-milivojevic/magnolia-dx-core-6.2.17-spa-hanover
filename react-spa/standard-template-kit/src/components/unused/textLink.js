import { React, useState, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getRouterBasename } from '../../helpers/AppHelpers';

function TextLink ({
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
    descriptionAlign,
    descriptionStyle,
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
    linkStyleName,
    linkNoStyles,
    textStyleName,
    textNoStyles,
    styleName,
    noStyles,
    layout,
    linkRightLayout,
    linkPositionLayout1,
    linkPositionLayout2
  }) {

    
  const [configProps, setconfigProps] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/magnoliaAuthor/.rest/pages/Main-Page/Advanced-Config/textLinkComponents/@nodes')
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

  const [textConfigProps, setTextConfigProps] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/magnoliaAuthor/.rest/pages/Main-Page/Basics-Config/textComponents/@nodes')
      .then(response => response.json())
      .then(data => {
        let styleName =  textStyleName || configProps?.textStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && textNoStyles === false) {
          result = data[0];
        } else if (textNoStyles === true) {
          result = null;
        } 
        setTextConfigProps(result);
      });
  }, [textStyleName, textNoStyles, configProps?.textStyleName]);
  
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

  const [linkBgColor, setLinkBgColor] = useState(defLinkBgColor);
  const [linkLabelColor, setLinkLabelColor] = useState(defLinkBgColor);
  
  useEffect(() => {
    setLinkBgColor(defLinkBgColor)
  }, [defLinkBgColor]);

  useEffect(() => {
    setLinkLabelColor(defLabelColor)
  }, [defLabelColor]);

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || textConfigProps?.headlineLevel || "h1";  
  const downloadLink = download ? "http://localhost:8080" + download['@link'] : "http://localhost:8080";  
  const href = linkType === "page" ? (getRouterBasename() + page).replace("//", "/").replace("Home/Home", "Home") : linkType === "external" ? external : downloadLink;

  const layouts = layout || configProps?.layout || "layout1";
  const linkRightLayouts = layout || configProps?.layout !== "layout1" ? linkRightLayout || configProps?.linkRightLayout : "auto";
  const linkPositionLayouts1 = layout || configProps?.layout === "layout1" ? linkPositionLayout1 || configProps?.linkPositionLayout1 : null;
  const linkPositionLayouts2 = layout || configProps?.layout !== "layout1" ? linkPositionLayout2 || configProps?.linkPositionLayout2 : "";

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || "";

  return (
    <div className='textLink_editMode'>
      <div className={`textLink ${layouts} ${linkPositionLayouts2}`}
        style={{gridTemplateColumns: linkRightLayouts,
                paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || textConfigProps?.wrapperPaddingTop || null,
                paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || textConfigProps?.wrapperPaddingRight || null,
                paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || textConfigProps?.wrapperPaddingBottom || null,
                paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || textConfigProps?.wrapperPaddingLeft || null,
                backgroundColor: bgColor,
                borderColor: wrapperBorderColor || configProps?.wrapperBorderColor || textConfigProps?.wrapperBorderColor || null,
                borderWidth: wrapperBorderWidth || configProps?.wrapperBorderWidth || textConfigProps?.wrapperBorderWidth || null,
                borderStyle: wrapperBorderStyle || configProps?.wrapperBorderStyle || textConfigProps?.wrapperBorderStyle || null,
                borderRadius: wrapperBorderRadius || configProps?.wrapperBorderRadius || textConfigProps?.wrapperBorderRadius || null
              }}
        onMouseEnter={() => setBgColor(hovBgColor)}
        onMouseLeave={() => setBgColor(defBgColor)} 
      >      
        <HeadlineLevel className="headline"
          style={{fontFamily: headlineFontFamily || configProps?.headlineFontFamily || textConfigProps?.headlineFontFamily || null,
                  textAlign: headlinePosition || configProps?.headlinePosition || textConfigProps?.headlinePosition || null,
                  fontSize: headlineFontSize || configProps?.headlineFontSize || textConfigProps?.headlineFontSize || null,
                  lineHeight: headlineLineHeight || configProps?.headlineLineHeight || textConfigProps?.headlineLineHeight || null,
                  color: headlineColor || configProps?.headlineColor || textConfigProps?.headlineColor || null,
                  letterSpacing: headlineLetterSpacing || configProps?.headlineLetterSpacing || textConfigProps?.headlineLetterSpacing || null,
                  fontWeight: headlineBold || configProps?.headlineBold || textConfigProps?.headlineBold || null,
                  fontStyle: headlineItalic || configProps?.headlineItalic || textConfigProps?.headlineItalic || null,
                  textTransform: headlineTextTransform || textConfigProps?.headlineTextTransform || configProps?.headlineTextTransform || null,
                  paddingTop: headlinePaddingTop || configProps?.headlinePaddingTop || textConfigProps?.headlinePaddingTop || null,
                  paddingRight: headlinePaddingRight || configProps?.headlinePaddingRight || textConfigProps?.headlinePaddingRight || null,
                  paddingBottom: headlinePaddingBottom || configProps?.headlinePaddingBottom || textConfigProps?.headlinePaddingBottom || null,
                  paddingLeft: headlinePaddingLeft || configProps?.headlinePaddingLeft || textConfigProps?.headlinePaddingLeft || null
                }}
        >{headline ? headline : null}</HeadlineLevel>
        <div className={`description ${descriptionStyle || configProps?.descriptionStyle || textConfigProps?.descriptionStyle}`} dangerouslySetInnerHTML={{ __html:description ? description : null }}
          style={{paddingTop: descriptionPaddingTop || configProps?.descriptionPaddingTop || textConfigProps?.descriptionPaddingTop || null,
                  paddingRight: descriptionPaddingRight || configProps?.descriptionPaddingRight || textConfigProps?.descriptionPaddingRight || null,
                  paddingBottom: descriptionPaddingBottom || configProps?.descriptionPaddingBottom || textConfigProps?.descriptionPaddingBottom || null,
                  paddingLeft: descriptionPaddingLeft || configProps?.descriptionPaddingLeft || textConfigProps?.descriptionPaddingLeft || null,
                  borderColor: descriptionBorderColor || configProps?.descriptionBorderColor || textConfigProps?.descriptionBorderColor || null,
                  borderWidth: descriptionBorderWidth || configProps?.descriptionBorderWidth || textConfigProps?.descriptionBorderWidth || null,
                  borderStyle: descriptionBorderStyle || configProps?.descriptionBorderStyle || textConfigProps?.descriptionBorderStyle || null,
                  borderRadius: descriptionBorderRadius || configProps?.descriptionBorderRadius || textConfigProps?.descriptionBorderRadius || null,
                  textAlign: descriptionAlign || configProps?.descriptionAlign || textConfigProps?.descriptionAlign || null 
                }}
        ></div>
        <div className='linkWrapper' 
            style= {{paddingTop: linkPaddingTop || configProps?.linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
                     paddingRight: linkPaddingRight || configProps?.linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
                     paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
                     paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null, 
                     justifySelf: linkPositionLayouts1 !== null ? linkPositionLayouts1 || configProps?.linkPositionLayouts1 : null                    
                    }}
        >
          <a className='linkComponent' href={href} target={linkLocation ? linkLocation : "_blank"} rel="noreferrer"
            style= {{ backgroundColor: linkBgColor,
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
                    }}
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

export default TextLink;

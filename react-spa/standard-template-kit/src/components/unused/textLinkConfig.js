import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../../helpers/AppHelpers';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .borderTeaser:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
  .borderTeaser .linkComponent:hover {
    background-color: ${(props) => props.hovLinkBgColor && props.hovLinkBgColor + "!important"};
    color: ${(props) => props.hovLabelColor && props.hovLabelColor + "!important"};
  }
}`

function TextLinkConfig ({
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
    layout,
    linkRightLayout,
    linkPositionLayout1,
    linkPositionLayout2
  }) {

  const linkBase = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [textConfigProps, setTextConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/textComponents/@nodes`)
    .then(response => response.json())
    .then(data => {
      let result = data.find(item => item.styleName === textStyleName);
      if (!result && textNoStyles === (false || "false")) {
        result = data[0];
      } else if (textNoStyles !== (false || "false")) {
        result = null;
      } 
      setTextConfigProps(result);
    });
  }, [textStyleName, textNoStyles, apiBase, restPath, nodeName]);
  
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

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const defBgColor = wrapperDefaultBackColor || null;  
  const hovBgColor = wrapperHoverBackColor || defBgColor || null; 

  const defLabelColor = labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || linkConfigProps?.labelHoverColor || defLabelColor || null;  

  const defLinkBgColor = linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || linkConfigProps?.linkHoverBackColor || defLinkBgColor || null;
  

  const HeadlineLevel = headlineLevel || textConfigProps?.headlineLevel || "h1";
  const downloadLink = download ? linkBase + download['@link'] : linkBase;  
  const href = linkType === "page" ? (getRouterBasename() + page).replace("//", "/").replace("Home/Home", "Home") : linkType === "external" ? external : downloadLink;

  const layouts = layout || "layout1";
  const linkRightLayouts = layout !== "layout1" ? linkRightLayout : "auto";
  const linkPositionLayouts1 = layout === "layout1" ? linkPositionLayout1 : null;
  const linkPositionLayouts2 = layout !== "layout1" ? linkPositionLayout2 : "";

  const linkIcons = linkIcon || linkConfigProps?.linkIcon || "";

  return (
    <div className='textLink_editMode'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyAccText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <GlobalStyles 
        hovBgColor={hovBgColor}
        hovLinkBgColor={hovLinkBgColor}
        hovLabelColor={hovLabelColor}
      />
      <div className={`textLink ${layouts} ${linkPositionLayouts2}`}
          style={{gridTemplateColumns: linkRightLayouts,
                  paddingTop: wrapperPaddingTop ? wrapperPaddingTop : null,
                  paddingRight: wrapperPaddingRight ? wrapperPaddingRight : null,
                  paddingBottom: wrapperPaddingBottom ? wrapperPaddingBottom : null,
                  paddingLeft: wrapperPaddingLeft ? wrapperPaddingLeft : null,    
                  backgroundColor: defBgColor,
                  borderColor: wrapperBorderColor ? wrapperBorderColor : null,
                  borderWidth: wrapperBorderWidth ? wrapperBorderWidth : null,
                  borderStyle: wrapperBorderStyle ? wrapperBorderStyle : null,
                  borderRadius: wrapperBorderRadius ? wrapperBorderRadius : null
                }}
      >
        {headline ? 
          <HeadlineLevel className="headline"
            style={{
                    fontFamily: headlineFontFamily || textConfigProps?.headlineFontFamily || null,
                    textAlign:  headlinePosition || textConfigProps?.headlinePosition || null,
                    fontSize: headlineFontSize || textConfigProps?.headlineFontSize || null,
                    lineHeight: headlineLineHeight || textConfigProps?.headlineLineHeight || null,
                    color: headlineColor || textConfigProps?.headlineColor || null,
                    letterSpacing:  headlineLetterSpacing || textConfigProps?.headlineLetterSpacing || null,
                    fontWeight: headlineBold || textConfigProps?.headlineBold || null,
                    fontStyle: headlineItalic || textConfigProps?.headlineItalic || null,
                    textTransform: headlineTextTransform || textConfigProps?.headlineTextTransform || null,
                    paddingTop: headlinePaddingTop || textConfigProps?.headlinePaddingTop || null,
                    paddingRight: headlinePaddingRight || textConfigProps?.headlinePaddingRight || null,
                    paddingBottom: headlinePaddingBottom || textConfigProps?.headlinePaddingBottom || null,
                    paddingLeft: headlinePaddingLeft || textConfigProps?.headlinePaddingLeft || null,
                  }}
          >{headline ? headline : null}</HeadlineLevel>
        : null}   
        { description ?
          <div className={`description ${descriptionStyle || textConfigProps?.descriptionStyle}`} dangerouslySetInnerHTML={{ __html:description ? description : null }}
            style={{
                    paddingTop: descriptionPaddingTop || textConfigProps?.descriptionPaddingTop || null,
                    paddingRight: descriptionPaddingRight || textConfigProps?.descriptionPaddingRight || null,
                    paddingBottom: descriptionPaddingBottom || textConfigProps?.descriptionPaddingBottom || null,
                    paddingLeft: descriptionPaddingLeft || textConfigProps?.descriptionPaddingLeft || null,
                    borderColor: descriptionBorderColor || textConfigProps?.descriptionBorderColor || null,
                    borderWidth: descriptionBorderWidth || textConfigProps?.descriptionBorderWidth || null,
                    borderStyle: descriptionBorderStyle || textConfigProps?.descriptionBorderStyle || null,
                    borderRadius: descriptionBorderRadius || textConfigProps?.descriptionBorderRadius || null,
                    textAlign: descriptionAlign || textConfigProps?.descriptionAlign || null
                  }}
          ></div>
        : null }
        { linkIcons || linkLabel ?
          <div className='linkWrapper' 
              style={{
                      paddingTop: linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
                      paddingRight: linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
                      paddingBottom: linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
                      paddingLeft: linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null,
                      justifySelf: linkPositionLayouts1 || null,
                    }}
          >
            <a className='linkComponent' href={href} target={linkLocation ? linkLocation : "_blank"} rel="noreferrer"
              style={{backgroundColor: defLinkBgColor,
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
                      justifyContent:  linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
                      alignItems:  linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
                      fontSize: linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
                      lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
                      fontWeight:  linkBold || linkConfigProps?.linkBold || null,
                      fontStyle:  linkItalic || linkConfigProps?.linkItalic || null
                    }}
            > {linkLabel ? linkLabel : ""} 
              {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
            </a>
          </div>
        : null }
      </div>
    </div>
  )
}

export default TextLinkConfig;

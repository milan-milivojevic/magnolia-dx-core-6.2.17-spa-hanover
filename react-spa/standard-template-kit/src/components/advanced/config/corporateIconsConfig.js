import React, { useState, useEffect, useRef } from 'react';
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase } from '../../../helpers/AppHelpers';

function CorporateIconsConfig ({
    title,
    subtitle,   
    linkDefault,
    smallIconLink,
    external1,
    download1,
    mediumIconLink,
    external2,
    download2,
    largeIconLink,
    external3,
    download3,
    borderWidth,
    borderStyle,
    borderColor,
    image1,
    image2,
    image3,
    titleLevel,
    titlePosition,
    titleFontFamily,
    titleTextTransform,
    titleBold,
    titleItalic,    
    titleFontSize,
    titleLineHeight,   
    titleColor,     
    titleLetterSpacing,    
    titlePaddingTop,
    titlePaddingRight,
    titlePaddingBottom,
    titlePaddingLeft,
    subtitleLevel,
    subtitlePosition,
    subtitleFontFamily,
    subtitleTextTransform,
    subtitleBold,
    subtitleItalic,    
    subtitleFontSize,
    subtitleLineHeight,   
    subtitleColor,     
    subtitleLetterSpacing,    
    subtitlePaddingTop,
    subtitlePaddingRight,
    subtitlePaddingBottom,
    subtitlePaddingLeft,
    styleName,
    dividerStyleName,
    dividerNoStyles,
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
  const [dividerConfigProps, setDividerConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/dividerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === dividerStyleName);
        if (!result && dividerNoStyles === (false || "false")) {
          result = data[0];
        } else if (dividerNoStyles !== (false || "false")) {
          result = null;
        } 
        setDividerConfigProps(result);
      });
  }, [dividerStyleName, dividerNoStyles, apiBase, restPath, nodeName]);

  const downloadLink1 = download1 ? download1['@link'] : linkDefault;  
  const href1 = smallIconLink === "external" && external1 ? external1 : downloadLink1;
  const downloadLink2 = download2 ? download2['@link'] : linkDefault;  
  const href2 = mediumIconLink === "external" && external2 ? external2 : downloadLink2;
  const downloadLink3 = download3 ? download3['@link'] : linkDefault;  
  const href3 = largeIconLink === "external" && external3 ? external3 : downloadLink3;

  const TitleLevel = titleLevel || "h1";  
  const SubtitleLevel = subtitleLevel || "h3";  
  
  const dividerStyles = {
    borderBottomWidth: borderWidth || dividerConfigProps?.borderWidth || null,
    borderBottomStyle: borderStyle || dividerConfigProps?.borderStyle || null,
    borderBottomColor: borderColor || dividerConfigProps?.borderColor || null,
  }

  const titleStyles = {
    fontFamily: titleFontFamily || null,
    textAlign: titlePosition || null,
    fontSize: titleFontSize || null,
    lineHeight: titleLineHeight || null,
    color: titleColor || null,
    letterSpacing: titleLetterSpacing ||  null,
    fontWeight: titleBold || null,
    fontStyle: titleItalic || null,
    textTransform: titleTextTransform || null,
    paddingTop: titlePaddingTop || null,
    paddingRight: titlePaddingRight || null,
    paddingBottom: titlePaddingBottom || null,
    paddingLeft: titlePaddingLeft || null
  }

  const subtitleStyles = {
    fontFamily: subtitleFontFamily || null,
    textAlign: subtitlePosition || null,
    fontSize: subtitleFontSize || null,
    lineHeight: subtitleLineHeight || null,
    color: subtitleColor || null,
    letterSpacing: subtitleLetterSpacing || null,
    fontWeight: subtitleBold || null,
    fontStyle: subtitleItalic || null,
    textTransform: subtitleTextTransform || null,
    paddingTop: subtitlePaddingTop || null,
    paddingRight: subtitlePaddingRight || null,
    paddingBottom: subtitlePaddingBottom || null,
    paddingLeft: subtitlePaddingLeft || null
  } 

  return (
    <div className='corporateIconsWrapper'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || 0}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className={`corporateIcons`}>         

        <div className="divider" style={dividerStyles}></div>

        <TitleLevel className="headline"style={titleStyles}>
          {title || null}
        </TitleLevel>

        <SubtitleLevel className="headline"style={subtitleStyles}>
          {subtitle || null}
        </SubtitleLevel>

        <div className='iconsWrapper'> 
          { image1 ?
            <div className="iconSmallWrapper">
              <img className="iconSmall" src={image1['@link']} alt="" />
              <a className='iconSmallLink' href={href1} target={"_blank"} rel="noreferrer">
                <TfiDownload />
              </a>
            </div>
          : <div></div> }
          { image2 ?
            <div className="iconMediumWrapper">
              <img className="iconMedium" src={image2['@link']} alt="" />
              <a className='iconMediumLink' href={href2} target={"_blank"} rel="noreferrer">
                <TfiDownload />
              </a>
            </div>
          : <div></div>  }
          { image3 ?
            <div className="iconLargeWrapper">
              <img className="iconLarge" src={image3['@link']} alt="" />   
              <a className='iconLargeLink' href={href3} target={"_blank"} rel="noreferrer">
                <TfiDownload />
              </a>
            </div>
          : <div></div> }
        </div>
        
      </div>
    </div>
  )
}

export default CorporateIconsConfig;

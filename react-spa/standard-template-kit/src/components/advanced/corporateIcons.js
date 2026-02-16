import React, { useState, useEffect } from 'react';
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase } from '../../helpers/AppHelpers';

function CorporateIcons ({
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
  noStyles,
  dividerStyleName,
  dividerNoStyles,
}) {

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE; 
    
  const [configProps, setConfigProps] = useState();

  
  const [dividerConfigProps, setDividerConfigProps] = useState();

  const downloadLink1 = download1 ? download1['@link'] : linkDefault;  
  const href1 = smallIconLink === "external" && external1 ? external1 : downloadLink1;
  const downloadLink2 = download2 ? download2['@link'] : linkDefault;  
  const href2 = mediumIconLink === "external" && external2 ? external2 : downloadLink2;
  const downloadLink3 = download3 ? download3['@link'] : linkDefault;  
  const href3 = largeIconLink === "external" && external3 ? external3 : downloadLink3;

  const TitleLevel = titleLevel || configProps?.titleLevel || "h3";  
  const SubtitleLevel = subtitleLevel || configProps?.subtitleLevel || "h3";  

  const titleStyles = {
    fontFamily: titleFontFamily || configProps?.titleFontFamily || null,
    textAlign: titlePosition || configProps?.titlePosition ||null,
    fontSize: titleFontSize || configProps?.titleFontSize || null,
    lineHeight: titleLineHeight || configProps?.titleLineHeight || null,
    color: titleColor || configProps?.titleColor || null,
    letterSpacing: titleLetterSpacing || configProps?.titleLetterSpacing ||  null,
    fontWeight: titleBold || configProps?.titleBold || null,
    fontStyle: titleItalic || configProps?.titleItalic || null,
    textTransform: titleTextTransform || configProps?.titleTextTransform || null,
    paddingTop: titlePaddingTop || configProps?.titlePaddingTop || null,
    paddingRight: titlePaddingRight || configProps?.titlePaddingRight || null,
    paddingBottom: titlePaddingBottom || configProps?.titlePaddingBottom || null,
    paddingLeft: titlePaddingLeft || configProps?.titlePaddingLeft || null
  }

  const subtitleStyles = {
    fontFamily: subtitleFontFamily || configProps?.subtitleFontFamily || null,
    textAlign: subtitlePosition || configProps?.subtitlePosition ||null,
    fontSize: subtitleFontSize || configProps?.subtitleFontSize || null,
    lineHeight: subtitleLineHeight || configProps?.subtitleLineHeight || null,
    color: subtitleColor || configProps?.subtitleColor || null,
    letterSpacing: subtitleLetterSpacing || configProps?.subtitleLetterSpacing ||  null,
    fontWeight: subtitleBold || configProps?.subtitleBold || null,
    fontStyle: subtitleItalic || configProps?.subtitleItalic || null,
    textTransform: subtitleTextTransform || configProps?.subtitleTextTransform || null,
    paddingTop: subtitlePaddingTop || configProps?.subtitlePaddingTop || null,
    paddingRight: subtitlePaddingRight || configProps?.subtitlePaddingRight || null,
    paddingBottom: subtitlePaddingBottom || configProps?.subtitlePaddingBottom || null,
    paddingLeft: subtitlePaddingLeft || configProps?.subtitlePaddingLeft || null
  }

  const dividerStyles = {
    borderBottomWidth: borderWidth || configProps?.borderWidth || dividerConfigProps?.borderWidth || null,
    borderBottomStyle: borderStyle || configProps?.borderStyle || dividerConfigProps?.borderStyle || null,
    borderBottomColor: borderColor || configProps?.borderColor || dividerConfigProps?.borderColor || null,
}
  
  return (
    <div className='corporateIcons_editMode'>

      <div className={`corporateIcons`}>         

        <div className="divider" style={dividerStyles}></div>

        <TitleLevel className="title" style={titleStyles}>
          {title || null}
        </TitleLevel>

        <SubtitleLevel className="subtitle" style={subtitleStyles}>
          {subtitle || null}
        </SubtitleLevel>
        
        
        <div className='iconsWrapper'> 
          { image1 ?
            <div className="iconSmallWrapper">
              <img className="iconSmall" src={image1['@link']} alt="" />
              { href1 &&
                <a className='iconSmallLink' href={href1} target={"_blank"} rel="noreferrer">
                  <TfiDownload />
                </a>
              }
            </div>
          : <div></div> }
          { image2 ?
            <div className="iconMediumWrapper">
              <img className="iconMedium" src={image2['@link']} alt="" />
              { href2 &&
                <a className='iconMediumLink' href={href2} target={"_blank"} rel="noreferrer">
                  <TfiDownload />
                </a>
              }
            </div>
          : <div></div>  }
          { image3 ?
            <div className="iconLargeWrapper">
              <img className="iconLarge" src={image3['@link']} alt="" />   
              {href3 &&
                <a className='iconLargeLink' href={href3} target={"_blank"} rel="noreferrer">
                  <TfiDownload />
                </a>
              }
            </div>
          : <div></div> }
        </div>
        
      </div>
    </div>
  )
}

export default CorporateIcons;

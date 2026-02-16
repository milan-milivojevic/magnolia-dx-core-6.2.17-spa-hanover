import React, { useState, useEffect } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { aclCheck } from '../../helpers/ACL';

const Wrapper = styled.div`
  .textComponent:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
`;

function Text ({
    headline,   
    navigationId,
    headlineLevel,
    headlineFontFamily,
    headlinePosition,
    headlineTextTransform,    
    addArrows,
    arrowsHeight,
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
    wrapperWidth,
    wrapperHeight,
    wrapperPosition,
    styleName,
    noStyles,

    allowedGroups = [],
    deniedGroups = [],
    hideComponent = false
  }) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [aclValue, setAclValue] = useState(false);
  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");
  
  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/textComponents/@nodes`)
    .then(response => response.json())
    .then(data => {
      let result = data.find(item => item.styleName === styleName);
      if (!result && (noStyles === (false || "false"))) {
        result = data[0];
      } else if (noStyles !== (false || "false")) {
        result = null;
      } 
      setConfigProps(result);
    });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";

  const defBgColor = wrapperDefaultBackColor || configProps?.wrapperDefaultBackColor || null;
  const hovBgColor = wrapperHoverBackColor || configProps?.wrapperHoverBackColor || defBgColor;

  const textComponentStyles = {
    paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: wrapperBorderColor || configProps?.wrapperBorderColor || null,
    borderWidth: wrapperBorderWidth || configProps?.wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || configProps?.wrapperBorderStyle || null,
    borderRadius: wrapperBorderRadius || configProps?.wrapperBorderRadius || null,
    maxWidth: wrapperWidth || configProps?.wrapperWidth || null,
    height: wrapperHeight || configProps?.wrapperHeight || null,
    margin: wrapperPosition || configProps?.wrapperPosition || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || configProps?.headlineFontFamily || null,
    textAlign:  headlinePosition || configProps?.headlinePosition || null,
    fontSize: headlineFontSize || configProps?.headlineFontSize || null,
    lineHeight: headlineLineHeight || configProps?.headlineLineHeight || null,
    color: headlineColor || configProps?.headlineColor || null,
    letterSpacing:  headlineLetterSpacing || configProps?.headlineLetterSpacing || null,
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

  const addArrowsVar = addArrows || configProps?.addArrows || "false";
  const arrowsHeightVar = {height: arrowsHeight || configProps?.arrowsHeight || null};

  useEffect(() => {
    if (editMode === false && basicAclCheck === false) {
      aclCheck(allowedGroups, deniedGroups, hideComponent)
        .then((response) => {
          setAclValue(response); 
        })
        .catch((error) => {
          console.error("Error executing aclCheck:", error);
          setAclValue(false);
        });
    } else setAclValue(true);
  });

  if (editMode === false && aclValue === false && basicAclCheck === false) {
    return null;
  } 

  return (
    <Wrapper className='textWrapper'
      hovBgColor={hovBgColor}
    >  
      <div className='textComponent' style={textComponentStyles}>
        {headline &&
          <HeadlineLevel className="headline" id={navigationId && navigationId} style={headlineStyles}>
            <span className='customHeadlineArrows' style={arrowsHeightVar}>
              {(addArrowsVar !== "false" || false) && <ArrowsIcon/>}
            </span>{headline || null}
          </HeadlineLevel>
        }     
        {description &&
          <div className={`description ${descriptionStyle || configProps?.descriptionStyle}`} 
               dangerouslySetInnerHTML={{ __html:description || null }}
               style={descriptionStyles}
          ></div>
        }
      </div>
    </Wrapper>
  )
}

export default Text;

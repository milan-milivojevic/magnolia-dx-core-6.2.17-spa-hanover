import React, { useState, useEffect } from "react";
import { EditableArea } from "@magnolia/react-editor";
import { getAPIBase } from '../../helpers/AppHelpers';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styled from 'styled-components';
import { aclCheck } from '../../helpers/ACL';

const Wrapper = styled.div`
  .accordion .item > .title: hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
    color: ${(props) => props.hoverTitleColor && props.hoverTitleColor + "!important"};
  }
  .accordion .item > .title:hover svg { 
    color: ${(props) => props.hoverChevronColor && props.hoverChevronColor + "!important"};
  }
`

function Accordion ({
  accordionComponents,
  title,
  titleLevel,
  titleFontFamily,
  titleFontSize,
  titleLineHeight,
  titleColor,
  titleHoverColor,
  chevronColor,
  chevronHoverColor,
  chevronFontSize,      
  accordionInnerPaddingTop,
  accordionInnerPaddingRight,
  accordionInnerPaddingBottom,
  accordionInnerPaddingLeft,
  accordionOuterPaddingTop,
  accordionOuterPaddingRight,
  accordionOuterPaddingBottom,
  accordionOuterPaddingLeft,
  accordionDefaultBackColor,
  accordionHoverBackColor,
  width,
  position,
  accordionBorderWidth,
  accordionBorderStyle,
  accordionBorderColor,
  accordionBorderRadius,
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
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Advanced-Config/accordionComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles !== (false || "false")) {
          result = null;
        } 
        setConfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  const HeadlineLevel = titleLevel || configProps?.titleLevel || "h3";

  const defBgColor = accordionDefaultBackColor || configProps?.accordionDefaultBackColor || null;    
  const hovBgColor = accordionHoverBackColor || configProps?.accordionHoverBackColor || defBgColor || null;

  const defTitleColor = titleColor || configProps?.titleColor || null; 
  const hoverTitleColor = titleHoverColor || configProps?.titleHoverColor || defTitleColor;

  const defChevronColor = chevronColor || configProps?.chevronColor || null;    
  const hoverChevronColor = chevronHoverColor || configProps?.chevronHoverColor || defChevronColor;

  const itemStyles = {
    paddingTop: accordionOuterPaddingTop || configProps?.accordionOuterPaddingTop || null,
    paddingRight: accordionOuterPaddingRight || configProps?.accordionOuterPaddingRight || null,
    paddingBottom: accordionOuterPaddingBottom || configProps?.accordionOuterPaddingBottom || null,
    paddingLeft: accordionOuterPaddingLeft || configProps?.accordionOuterPaddingLeft || null,
    width: width || configProps?.width || "100%"
  }

  const titleStyles = {
    fontFamily: titleFontFamily || configProps?.titleFontFamily || null,
    paddingTop: accordionInnerPaddingTop || configProps?.accordionInnerPaddingTop || null,
    paddingRight: accordionInnerPaddingRight || configProps?.accordionInnerPaddingRight || null,
    paddingBottom: accordionInnerPaddingBottom || configProps?.accordionInnerPaddingBottom || null,
    paddingLeft: accordionInnerPaddingLeft || configProps?.accordionInnerPaddingLeft || null,
    borderTopWidth: accordionBorderWidth || configProps?.accordionBorderWidth || null,
    borderTopStyle: accordionBorderStyle || configProps?.accordionBorderStyle || null,
    borderTopColor: accordionBorderColor || configProps?.accordionBorderColor || null,
    borderTopRadius: accordionBorderRadius || configProps?.accordionBorderRadius || null,
    fontSize: titleFontSize || configProps?.titleFontSize || null,
    lineHeight: titleLineHeight || configProps?.titleLineHeight || null,
    color: defTitleColor,
    backgroundColor: defBgColor
  }

  const chevronStyles = {
    fontSize: chevronFontSize || configProps?.chevronFontSize || null,
    color: defChevronColor
  }  

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
    <Wrapper className="accordionWrapper"
      hovBgColor={hovBgColor}
      hoverChevronColor={hoverChevronColor}
      hoverTitleColor={hoverTitleColor}
    >
      <div className="accordion" style={{justifyContent: position || configProps?.position || "center"}}>
        <div className="item" style={itemStyles}>
          <HeadlineLevel className="title" onClick={() => toggle()} style={titleStyles}>
            {title} 
            {open ?
              <BsChevronUp style={chevronStyles}/> :
              <BsChevronDown style={chevronStyles}/>
            }
          </HeadlineLevel>
          <div className={open ? 'content show' : 'content hide'}>
            {accordionComponents ? <EditableArea className='accordionArea' content={accordionComponents} /> : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Accordion;

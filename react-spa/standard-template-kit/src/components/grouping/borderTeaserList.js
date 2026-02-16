import React, { useState, useEffect } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { getAPIBase } from '../../helpers/AppHelpers';
import { aclCheck } from '../../helpers/ACL';

function BorderTeaserList ({ 
  column1,
  layout,
  columnGap,
  rowGap,
  width,
  position,  
  headline,
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
  headlineFontSize,
  headlineColor,
  headlineLineHeight,
  headlineLetterSpacing,
  headlinePaddingTop,
  headlinePaddingRight,
  headlinePaddingBottom,
  headlinePaddingLeft,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
  wrapperBorderWidth,
  wrapperBorderStyle,
  wrapperBorderColor,
  wrapperBorderRadius,
  styleName,
  noStyles,
  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
}) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");
  const [aclValue, setAclValue] = useState(false);

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Grouping-Config/borderTeaserListComponents/@nodes`)
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

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";

  const listComponentStyles = {
    width: width || null,
    margin: position || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || configProps?.headlineFontFamily || null,
    textAlign:  headlinePosition || configProps?.headlinePosition || null,
    fontSize: headlineFontSize || configProps?.headlineFontSize || null,
    lineHeight: headlineLineHeight || configProps?.headlineLineHeight || null,
    color: headlineColor || configProps?.headlineColor || null,
    letterSpacing:  headlineLetterSpacing || configProps?.headlineLetterSpacing || null,
    paddingTop: headlinePaddingTop || configProps?.headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || configProps?.headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || configProps?.headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || configProps?.headlinePaddingLeft || null,
  }

  const listStyles = {
    gridColumnGap: columnGap || configProps?.columnGap || null,
    gridRowGap: rowGap || configProps?.rowGap || null,
    paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || null,
    borderWidth: wrapperBorderWidth || configProps?.wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || configProps?.wrapperBorderStyle || null,
    borderColor: wrapperBorderColor || configProps?.wrapperBorderColor || null,
    borderRadius: wrapperBorderRadius || configProps?.wrapperBorderRadius || null                     
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
    <div className='borderTeaserListWrapper'>
      <div className='borderTeaserListComponent' style={listComponentStyles}>
      {headline && <HeadlineLevel className="headline" style={headlineStyles}>{headline || null}</HeadlineLevel>}   
      <ul className={`borderTeaserList`}style={listStyles}>
        { column1 && <EditableArea className={`listComponents borderTeasersArea layout${layout || configProps?.layout}`} content={column1}/>}
      </ul>
      </div>
    </div>
  );
}

export default BorderTeaserList;
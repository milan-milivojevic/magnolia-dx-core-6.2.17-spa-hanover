import React, { useState, useEffect } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { aclCheck } from '../../helpers/ACL';

function InnerSection ({ 
  column1, 
  column2,
  column3,
  column4,
  column5,
  column6,
  layout,
  col1width,
  col2width,
  col3width,
  col4width,
  col5width,
  col6width,
  gap,
  className,
  columnsAlignment,
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

  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
}) {

  const [aclValue, setAclValue] = useState(false);
  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");
  
  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  let list = [column1, column2, column3, column4, column5, column6];

  const HeadlineLevel = headlineLevel || "h1";
  let columnsCount = Math.floor(layout / 10) === 0 ? layout : Math.floor(layout / 10);

  let activeColumnWidths = [];

  if (layout === "Custom") {  
    const columnWidths = [col1width, col2width, col3width, col4width, col5width, col6width];    

    activeColumnWidths = columnWidths.filter((colWidth) => {
      return colWidth !== undefined;
    })    

    columnsCount = activeColumnWidths.length;

    if (columnsCount === 0) {
      columnsCount = 1;
      activeColumnWidths = ["100%"];
    }    
  }
  
  const headlineStyles = {
    fontFamily: headlineFontFamily || null,
    textAlign:  headlinePosition || null,
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: headlineColor || null,
    letterSpacing:  headlineLetterSpacing || null,
    paddingTop: headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || null,    
  }

  const innerSectionStyles = {
    gap: gap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderColor: wrapperBorderColor || null,
    borderRadius: wrapperBorderRadius || null,
    alignItems: columnsAlignment || null
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
    <React.Fragment>
      {headline && <HeadlineLevel className="headline"style={headlineStyles}>{headline || null}</HeadlineLevel>}   
      <ul className={`innerSection ${className || ""} columnSections layout${layout}`} style={innerSectionStyles}> 
      {list.slice(0, columnsCount).map((item, i) => item ? <div key={i} className={`column-${i} innerSectionArea`} style={{width: activeColumnWidths[i] || null}}><EditableArea content={item} /></div> : null)}
      </ul>
    </React.Fragment>
  );
}

export default InnerSection;
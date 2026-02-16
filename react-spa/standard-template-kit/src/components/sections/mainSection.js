import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function MainSection ({ 
  column1, 
  column2,
  column3,
  column4,
  column5,
  column6,
  layout,
  gap,
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
  wrapperPaddingTop
}) {

  let list = [column1, column2, column3, column4, column5, column6];
  
  const HeadlineLevel = headlineLevel || "h1";
  const columnsCount = Math.floor(layout / 10) === 0 ? layout : Math.floor(layout / 10);
  
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

  const mainSectionStyles = {
    gap: gap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null
  }

  return (
    <React.Fragment>
      {headline && <HeadlineLevel className="headline" style={headlineStyles}>{headline || null}</HeadlineLevel>}   
      <ul className={`mainSection columnSections layout${layout}`} style={mainSectionStyles}>
        {list.slice(0, columnsCount).map((item, i) => item ? <EditableArea key={i} className={`column-${i} sectionAllArea`} content={item} /> : null)}
      </ul>
    </React.Fragment>
  );
}

export default MainSection;
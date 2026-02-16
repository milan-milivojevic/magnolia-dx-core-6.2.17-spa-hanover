import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function W2PTemplatesList ({ 
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
  navigationId
}) {

  const HeadlineLevel = headlineLevel || "h1";

  const listComponentStyles = {
    width: width || null,
    margin: position || null
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

  const listStyles = {
    gridColumnGap: columnGap || null,
    gridRowGap: rowGap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderColor: wrapperBorderColor || null,
    borderRadius: wrapperBorderRadius || null                
  }

  return (
    <div className='mpAssetsListWrapper' id={navigationId && navigationId}>
      <div className='mpAssetsListComponent' style={listComponentStyles}>
      {headline && <HeadlineLevel className="headline" style={headlineStyles}>{headline || null}</HeadlineLevel>}   
      <ul className={`mpAssetsList`} style={listStyles}>
        { column1 && <EditableArea className={`listComponents mpAssetsListArea layout${layout}`} content={column1}/>}
      </ul>
      </div>
    </div>
  );
}

export default W2PTemplatesList;
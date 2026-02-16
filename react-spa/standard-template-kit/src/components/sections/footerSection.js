import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function FooterSection ({ 
  column1, 
  column2,
  column3,
  column4,
  column5,
  column6,
  layout,
  gap,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
  wrapperBorderWidth,
  wrapperBorderStyle,
  wrapperBorderColor,
  wrapperBorderRadius
}) {

  let list = [column1, column2, column3, column4, column5, column6];
  const columnsCount = Math.floor(layout / 10) === 0 ? layout : Math.floor(layout / 10);

  const footerSectionStyles = {
    gap: gap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,                
    topBorderWidth: wrapperBorderWidth || null,
    topBorderStyle: wrapperBorderStyle || null,
    topBorderColor: wrapperBorderColor || null,
    topBorderRadius: wrapperBorderRadius || null,
  }

  return (
    <div className="footerSectionWrapper">
      <ul className={`footerSection columnSections layout${layout}`} style={footerSectionStyles}>
        {list.slice(0, columnsCount).map((item, i) => item ? <EditableArea key={i} className={`column-${i} footerSectionArea`} content={item} /> : null)}
      </ul>
    </div>
  );
}

export default FooterSection;
import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function MainSectionConfig ({ 
  column1, 
  column2,
  column3,
  column4,
  column5,
  column6,
  layout,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
}) {
  let list = [column1, column2, column3, column4, column5, column6];

  return (
    <ul className={`sectionAll columnSections layout${layout}`}
    style={{paddingTop: wrapperPaddingTop !== undefined ? wrapperPaddingTop : null,
            paddingRight: wrapperPaddingRight !== undefined ? wrapperPaddingRight : null,
            paddingBottom: wrapperPaddingBottom !== undefined ? wrapperPaddingBottom : null,
            paddingLeft: wrapperPaddingLeft !== undefined ? wrapperPaddingLeft : null
          }}    
    >
      {list.slice(0, Math.floor(layout)).map((item, i) => <EditableArea key="{i}" className={`column-${i} sectionAllArea`} content={item} />)}
    </ul>
  );
}

export default MainSectionConfig;
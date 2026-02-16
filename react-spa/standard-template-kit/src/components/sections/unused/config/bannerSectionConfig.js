import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function BannerSectionConfig ({ 
  bannerSection,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
}) {

  return (
    <ul className={`bannerSection columnSections layout1`}
    style={{paddingTop: wrapperPaddingTop !== undefined ? wrapperPaddingTop : null,
            paddingRight: wrapperPaddingRight !== undefined ? wrapperPaddingRight : null,
            paddingBottom: wrapperPaddingBottom !== undefined ? wrapperPaddingBottom : null,
            paddingLeft: wrapperPaddingLeft !== undefined ? wrapperPaddingLeft : null
          }} 
    >
      <EditableArea className='bannerSectionArea' content={bannerSection} />
    </ul>
  );
}

export default BannerSectionConfig;
import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function BannerSection ({ 
  bannerSection,
  wrapperPaddingLeft,
  wrapperPaddingBottom,
  wrapperPaddingRight,
  wrapperPaddingTop,
}) {

  const bannerSectionStyles = {
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null
  }

  return (
    <div className={`bannerSection columnSections`} style={bannerSectionStyles}>
      {bannerSection && <EditableArea className='bannerSectionArea' content={bannerSection} />}
    </div>
  );
}

export default BannerSection;
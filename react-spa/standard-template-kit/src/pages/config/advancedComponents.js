import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';

function AdvancedComponentsConfiguration (props) {
  const { 
    accordionComponents,
    carouselComponents,
    carouselDividedComponents,
    // corporateFontsComponents,
    corporateIconsComponents,
    corporateIdentityColorsComponents,
    // footerNavigationComponents,
    textLinkComponents
  } = props;

  return (    
    <div className='configComponentsPage'>
      <h2 className='titles'>Text Link Components</h2>
      <div>{textLinkComponents && <EditableArea content={textLinkComponents} />}</div>      

      <h2 className='titles'>Accordion Components</h2>
      <div>{accordionComponents && <EditableArea content={accordionComponents} />}</div>
      <h2 className='titles'>Carousel Components</h2>
      <div>{carouselComponents && <EditableArea content={carouselComponents} />}</div>
      <h2 className='titles'>Carousel Divided Components</h2>
      <div>{carouselDividedComponents && <EditableArea content={carouselDividedComponents} />}</div>     
      <h2 className='titles'>Corporate Icons Components</h2>
      <div>{corporateIconsComponents && <EditableArea content={corporateIconsComponents} />}</div>      
      <h2 className='titles'>Corporate Identity Colors Components</h2>
      <div>{corporateIdentityColorsComponents && <EditableArea content={corporateIdentityColorsComponents} />}</div>      
      {/* <h2 className='titles'>Corporate Fonts Components</h2>
      <div>{corporateFontsComponents && <EditableArea content={corporateFontsComponents} />}</div> */}
      {/* <h2 className='titles'>Footer Navigation Components</h2>
      <div>{footerNavigationComponents && <EditableArea content={footerNavigationComponents} />}</div> */}
    </div>
  );
}

export default AdvancedComponentsConfiguration;
import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';

function GroupingComponentsConfiguration (props) {
  const { 
    accordionListComponents,
    borderTeaserListComponents,
    cardTeaserListComponents,
    imageGalleryComponents,
    imageTeaserListComponents,
    linkListComponents,
    tabsComponents,
    textLinkListComponents 
  } = props;

  return (    
    <div className='configComponentsPage'>
      <h2 className='titles'>Accordion List Components</h2>
      <div>{accordionListComponents && <EditableArea content={accordionListComponents} />}</div>
      <h2 className='titles'>Tabs Group Components</h2>
      <div>{tabsComponents && <EditableArea content={tabsComponents} />}</div>
      <h2 className='titles'>Image Gallery Components</h2>
      <div>{imageGalleryComponents && <EditableArea content={imageGalleryComponents} />}</div>
      <h2 className='titles'>Border Teaser List Component</h2>
      <div>{borderTeaserListComponents && <EditableArea content={borderTeaserListComponents} />}</div>
      <h2 className='titles'>Card Teaser List Component</h2>
      <div>{cardTeaserListComponents && <EditableArea content={cardTeaserListComponents} />}</div>          
      <h2 className='titles'>Image Teaser List Component</h2>
      <div>{imageTeaserListComponents && <EditableArea content={imageTeaserListComponents} />}</div>
      <h2 className='titles'>Link List Component</h2>
      <div>{linkListComponents && <EditableArea content={linkListComponents} />}</div>          
      <h2 className='titles'>Text & Link List Component</h2>
      <div>{textLinkListComponents && <EditableArea content={textLinkListComponents} />}</div>
    </div>
  );
}

export default GroupingComponentsConfiguration;
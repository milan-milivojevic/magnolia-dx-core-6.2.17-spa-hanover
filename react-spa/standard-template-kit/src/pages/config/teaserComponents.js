import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';

function TeaserComponentsConfiguration (props) {
  const { 
    borderTeaserComponents,
    cardTeaserComponents,
    carouselTeaserComponents,
    imageTeaserComponents,
  } = props;

  return (    
    <div className='configComponentsPage'>      
      <h2 className='titles'>Border Teaser Components</h2>
      <div>{borderTeaserComponents && <EditableArea content={borderTeaserComponents} />}</div>
      <h2 className='titles'>Card Teaser Components</h2>
      <div>{cardTeaserComponents && <EditableArea content={cardTeaserComponents} />}</div>
      <h2 className='titles'>Image Teaser Components</h2>
      <div>{imageTeaserComponents && <EditableArea content={imageTeaserComponents} />}</div>              
      <h2 className='titles'>Carousel Teaser Components</h2>
      <div>{carouselTeaserComponents && <EditableArea content={carouselTeaserComponents} />}</div>      
    </div>
  );
}

export default TeaserComponentsConfiguration;
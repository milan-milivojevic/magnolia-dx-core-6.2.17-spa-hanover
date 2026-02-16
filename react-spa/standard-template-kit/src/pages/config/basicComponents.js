import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';

function BasicComponentsConfiguration (props) {
  const { 
    audioComponents,
    dividerComponents,
    iframeComponents,
    imageComponents,
    linkComponents, 
    separationBlockComponents,
    spacerComponents,   
    textComponents,
    videoComponents,
  } = props;

  return (
    <div className='configComponentsPage'>
      <h2 className='titles'>Text Components</h2>
      <div>{textComponents && <EditableArea content={textComponents} />}</div>
      <h2 className='titles'>Link Components</h2>
      <div>{linkComponents && <EditableArea content={linkComponents} />}</div>   
      <h2 className='titles'>Image Components</h2>
      <div>{imageComponents && <EditableArea content={imageComponents} />}</div>
      <h2 className='titles'>Video Components</h2>
      <div>{videoComponents && <EditableArea content={videoComponents} />}</div>
      <h2 className='titles'>Audio Components</h2>
      <div>{audioComponents && <EditableArea content={audioComponents} />}</div>
      <h2 className='titles'>iFrame Components</h2>
      <div>{iframeComponents && <EditableArea content={iframeComponents} />}</div>
      <h2 className='titles'>Spacer Components</h2>
      <div>{spacerComponents && <EditableArea content={spacerComponents} />}</div>
      <h2 className='titles'>Divider Components</h2>
      <div>{dividerComponents && <EditableArea content={dividerComponents} />}</div>
      <h2 className='titles'>Separation Block Components</h2>
      <div>{separationBlockComponents && <EditableArea content={separationBlockComponents} />}</div>
      {}
    </div>
  );
}

export default BasicComponentsConfiguration;

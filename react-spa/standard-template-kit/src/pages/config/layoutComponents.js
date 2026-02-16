import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';

function LayoutComponentsConfiguration (props) {
  const { 
    globalLayoutComponentComponents,
    specialLayoutComponentComponents
  } = props;

  return (    
    <div className='configComponentsPage'>
      <h2 className='titles'>Global Layout Components</h2>
      <div>{globalLayoutComponentComponents && <EditableArea content={globalLayoutComponentComponents} />}</div>       
      <h2 className='titles'>Special Layout Components</h2>
      <div>{specialLayoutComponentComponents && <EditableArea content={specialLayoutComponentComponents} />}</div>       
    </div>
  );
}

export default LayoutComponentsConfiguration;
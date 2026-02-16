import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';

function SectionComponentsConfiguration (props) {
  const { 
    accordionInnerSectionComponents,
    bannerSectionComponents,
    innerSectionComponents,
    mainSectionComponents,
    tabsInnerSectionComponents
  } = props;

  return (
    <div className='configComponentsPage'>
      <h2 className='titles'>Accordion Inner Section Components</h2>
      <div>{accordionInnerSectionComponents && <EditableArea content={accordionInnerSectionComponents} />}</div>
      <h2 className='titles'>Banner Section Components</h2>
      <div>{bannerSectionComponents && <EditableArea content={bannerSectionComponents} />}</div>
      <h2 className='titles'>Inner Section Components</h2>
      <div>{innerSectionComponents && <EditableArea content={innerSectionComponents} />}</div>
      <h2 className='titles'>Main Section Components</h2>
      <div>{mainSectionComponents && <EditableArea content={mainSectionComponents} />}</div>
      <h2 className='titles'>Tabs Inner Section Components</h2>
      <div>{tabsInnerSectionComponents && <EditableArea content={tabsInnerSectionComponents} />}</div>
    </div>
  );
}

export default SectionComponentsConfiguration;
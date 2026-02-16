import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function MpSearchPage (props) {
  const { mpSearchArea, title } = props;

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <div className='mpSearchPage'>
        <div className='mpSearchArea'>{mpSearchArea && <EditableArea content={mpSearchArea} />}</div>
      </div>
    </HelmetProvider>
  );
}

export default MpSearchPage;
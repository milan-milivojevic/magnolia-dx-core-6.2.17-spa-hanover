import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function W2PSearchPage (props) {
  const { w2pSearchArea, title } = props;

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <div className='w2pSearchPage'>
        <div className='w2pSearchArea'>{w2pSearchArea && <EditableArea content={w2pSearchArea} />}</div>
      </div>
    </HelmetProvider>
  );
}

export default W2PSearchPage;
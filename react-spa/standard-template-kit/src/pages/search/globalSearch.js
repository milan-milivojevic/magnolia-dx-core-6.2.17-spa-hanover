import React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../../css.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function GlobalSearchPage (props) {
  const { globalSearchArea, title } = props;

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <div className='mpSearchPage'>
        <div className='globalSearchArea'>{globalSearchArea && <EditableArea content={globalSearchArea} />}</div>
      </div>
    </HelmetProvider>
  );
}

export default GlobalSearchPage;
import React from 'react';

function Html({ editHTML }) {
  return <div className='html_component' 
              dangerouslySetInnerHTML={{ __html:editHTML || null }}>
         </div>
}

export default Html;
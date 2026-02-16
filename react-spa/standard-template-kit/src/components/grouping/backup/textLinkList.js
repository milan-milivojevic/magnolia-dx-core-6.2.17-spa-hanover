import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function TextLinkList ({ 
  column1, 
  column2,
  column3,
  column4,
  column5,
  column6,
  layout,
}) {
  let list = [column1, column2, column3, column4, column5, column6];

  return (
    <ul className={`columnsSectionAll layout${layout}`}>
      {list.slice(0, Math.floor(layout)).map((item, i) => <EditableArea className={'column-' + i} content={item} />)}
    </ul>
  );
}

export default TextLinkList;
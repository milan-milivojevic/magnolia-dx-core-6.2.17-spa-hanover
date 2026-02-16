import React, { useRef } from 'react';

function DividerConfig ({ 
    borderWidth,
    borderStyle,
    borderColor,
    styleName
 }) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };
  
  const dividerStyles = { 
    borderBottomWidth:  borderWidth || null,
    borderBottomStyle:  borderStyle || null,
    borderBottomColor:  borderColor || null
  }

  return (
    <div className='dividerWrapper configComponents'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className="divider" style={dividerStyles}></div>
    </div>
  );
}

export default DividerConfig;
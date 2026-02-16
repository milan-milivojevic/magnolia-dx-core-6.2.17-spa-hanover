import React, { useRef } from 'react';

function SpacerConfig ({ spacer, styleName }) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const spacerStyles = {
    paddingTop:  spacer || null,
    borderTop: "1px solid #bdbdbd",
    borderBottom: "1px solid #bdbdbd",
  }

  return (
    <div className='spacerWrapper configComponents'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>  
      <div className='spacer' style={spacerStyles}></div>
    </div>
  );
}

export default SpacerConfig;
import React, { useId, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .iframeWrapper iframe:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
}`

function IFrameConfig ({ 
  link,
  position,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  defaultBackColor,
  hoverBackColor,
  borderColor,
  borderWidth,
  borderStyle,
  borderRadius,
  width,
  height,
  styleName
 }) {

  const id = useId();
  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const defBgColor = defaultBackColor || null;
  const hovBgColor = hoverBackColor || defBgColor;  

  const iframeStyles = { 
    paddingTop: paddingTop || null,
    paddingRight: paddingRight || null,
    paddingBottom: paddingBottom || null,
    paddingLeft: paddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: borderColor || null,
    borderWidth: borderWidth || null,
    borderStyle: borderStyle || null,
    borderRadius: borderRadius || null
 }

  return (
    <Wrapper className='iframeWrapper configComponents' hovBgColor={hovBgColor}>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className='iframeComponent' style={{ justifyContent: position || "left" }}>
        <iframe 
          src={link}
          width={width || "100%"}
          height={height || "auto"}
          title={"iframe_title_" + id}
          id={"iframe_" + id}
          className="iframe"
          display="block"
          position="relative"
          style={iframeStyles}
        ></iframe>
      </div>
    </Wrapper>
  ) 
}

export default IFrameConfig;
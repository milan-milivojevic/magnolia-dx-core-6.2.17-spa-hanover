import React, { useId, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  video:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
`;

function VideoConfig ({ 
  videoType,
  video, 
  embed,
  autoplay,
  loop,
  muted,
  controls,
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

  const myRef = useRef(null);
  const id = useId();

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;   

  const defBgColor = defaultBackColor || null;
  const hovBgColor = hoverBackColor || defBgColor;  

  const videoStyles = {
    paddingTop: paddingTop || null,
    paddingRight: paddingRight || null,
    paddingBottom: paddingBottom || null,
    paddingLeft: paddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: borderColor || null,
    borderWidth: borderWidth || null,
    borderStyle: borderStyle || null,
    borderRadius: borderRadius || null,
    width: width || "100%",
    height: height || null
  }

  const embedVideoStyles = {
    paddingTop: paddingTop || null,
    paddingRight: paddingRight || null,
    paddingBottom: paddingBottom || null,
    paddingLeft: paddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: borderColor || null,
    borderWidth: borderWidth || null,
    borderStyle: borderStyle || null,
    borderRadius: borderRadius || null,
    width: width || "100%",
    height: height || null,
    justifyContent: position || "left"
  }

  return (
    <Wrapper className='videoWrapper configComponents'
      hovBgColor={hovBgColor} 
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      {videoType === "video" && video &&
        <div className='videoComponent' style={{ justifyContent: position || "left"}}> 
          <video 
            src={video['@link']} 
            preload="auto"
            autoPlay={autoplay === (false || "false") ? null : "autoplay"}
            controls="controls"
            muted={autoplay === (false || "false") ? muted === (false || "false") ? null : "muted" : "muted"}
            loop={loop === (false || "false") ? null : "loop"}
            id={"video_" + id}
            className="video"
            style={videoStyles}    
          ></video>
        </div>
      }
      {videoType === "embed" && embed &&
        <div className='videoComponent' style={embedVideoStyles}
          dangerouslySetInnerHTML={{ __html:embed || null }}>
        </div>
      }
    </Wrapper>
  )
}

export default VideoConfig;
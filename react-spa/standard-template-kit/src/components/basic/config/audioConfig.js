import React, { useId, useRef } from 'react';

function AudioConfig ({ 
    audio,
    autoplay,
    loop,
    muted,
    controls,
    position,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    borderColor,
    borderWidth,
    borderStyle,
    borderRadius,
    width,
    styleName
}) {

  const id = useId();

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  const audioStyles = {
    marginTop: marginTop || null,
    marginRight: marginRight || null,
    marginBottom: marginBottom || null,
    marginLeft: marginLeft || null,    
    borderColor: borderColor || null,
    borderWidth: borderWidth || null,
    borderStyle: borderStyle || null,
    borderRadius: borderRadius || null,
    width: width || "100%"
  }  

  return (
      <div className='audioWrapper configComponents'>
        <div className="copyStyleName">
          <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
          <button onClick={handleClick}>
            Copy Style Name
          </button>
        </div>
        <div className='audioComponent' style={{justifyContent: position || "left"}}>
          <audio
            src={audio['@link']}
            preload="auto"
            autoPlay={autoplay === (false || "false") ? null : "autoplay"}
            controls="controls"
            muted={muted === (false || "false") ? null : "muted"}
            loop={loop === (false || "false") ? null : "loop"} 
            id={"audio_" + id}
            className="audio"
            style={audioStyles}
          ></audio>    
        </div>
      </div>      
  )
}

export default AudioConfig;
import React, { useId, useState, useEffect } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';

function Audio ({ 
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
    styleName,
    noStyles
}) {
  const id = useId();

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    
  
  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/audioComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles !== (false || "false")) {
          result = null;
        } 
        setConfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);  

  const audioStyles = {
    marginTop: marginTop || configProps?.marginTop || null,
    marginRight: marginRight || configProps?.marginRight || null,
    marginBottom: marginBottom || configProps?.marginBottom || null,
    marginLeft: marginLeft || configProps?.marginLeft || null,    
    borderColor: borderColor || configProps?.borderColor || null,
    borderWidth: borderWidth || configProps?.borderWidth || null,
    borderStyle: borderStyle || configProps?.borderStyle || null,
    borderRadius: borderRadius || configProps?.borderRadius || null,
    width: width || configProps?.width || "100%"
  } 

  return (  
    <div className='audioWrapper'>      
      <div className='audioComponent' style={{justifyContent: position || configProps?.position || "left"}}>
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

export default Audio;
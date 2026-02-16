import React, { useId } from 'react';

function Youtube ({ 
  video,
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
  height
}) {

  const id = useId();
  const justifyContent = position;

  return (
    <div className='youtubeEditMode'> {/* this div is workaround for editMode problem. */}
      <div className='youtubeWrapper'
        style={{display: 'flex',
                justifyContent: justifyContent !== undefined ? justifyContent : "left"
              }}
      ><video 
        src={"http://localhost:8080" + video['@link']} 
        preload="auto"
        autoplay={autoplay !== undefined ? autoplay : false}
        controls={controls !== undefined ? controls : true}
        muted={muted !== undefined ? muted : false}
        loop={loop !== undefined ? loop : false} 
        id={"video_" + id}
        className="youtube"
        style={{paddingTop: paddingTop !== undefined ? paddingTop : null,
                paddingRight: paddingRight !== undefined ? paddingRight : null,
                paddingBottom: paddingBottom !== undefined ? paddingBottom : null,
                paddingLeft: paddingLeft !== undefined ? paddingLeft : null,    
                backgroundColor: defaultBackColor !== undefined ? defaultBackColor : null,
                borderColor: borderColor !== undefined ? borderColor: null,
                borderWidth: borderWidth !== undefined ? borderWidth: null,
                borderStyle: borderStyle !== undefined ? borderStyle: null,
                borderRadius: borderRadius !== undefined ? borderRadius: null,
                width: width !== undefined ? width : null,
                height: height !== undefined ? height : null
              }}     
        ></video>
      </div>
    </div>
  )
}

export default Youtube;
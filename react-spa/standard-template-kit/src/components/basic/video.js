import React, { useId, useState, useEffect } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';
import { aclCheck } from '../../helpers/ACL';
import styled from 'styled-components';

const Wrapper = styled.div`
  video:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
`;

function Video ({ 
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
  styleName,
  noStyles,

  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
}) {

  const [aclValue, setAclValue] = useState(false);
  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");
  
  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const id = useId(); 

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/videoComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles === (false || "false")) {
          result = null;
        } 
        setConfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);  

    useEffect(() => {
    if (editMode === false && basicAclCheck === false) {
      aclCheck(allowedGroups, deniedGroups, hideComponent)
        .then((response) => {
          setAclValue(response); 
        })
        .catch((error) => {
          console.error("Error executing aclCheck:", error);
          setAclValue(false);
        });
    } else setAclValue(true);
  });

  const defBgColor = defaultBackColor || configProps?.defaultBackColor || null;
  const hovBgColor = hoverBackColor || configProps?.hoverBackColor || defBgColor;

  const videoStyles = {
    paddingTop: paddingTop || configProps?.paddingTop || null,
    paddingRight: paddingRight || configProps?.paddingRight || null,
    paddingBottom: paddingBottom || configProps?.paddingBottom || null,
    paddingLeft: paddingLeft || configProps?.paddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: borderColor || configProps?.borderColor || null,
    borderWidth: borderWidth || configProps?.borderWidth || null,
    borderStyle: borderStyle || configProps?.borderStyle || null,
    borderRadius: borderRadius || configProps?.borderRadius || null,
    width: width || configProps?.width || "100%",
    height: height || configProps?.height || null,
  }

  const embedVideoStyles = {
    paddingTop: paddingTop || configProps?.paddingTop || null,
    paddingRight: paddingRight || configProps?.paddingRight || null,
    paddingBottom: paddingBottom || configProps?.paddingBottom || null,
    paddingLeft: paddingLeft || configProps?.paddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: borderColor || configProps?.borderColor || null,
    borderWidth: borderWidth || configProps?.borderWidth || null,
    borderStyle: borderStyle || configProps?.borderStyle || null,
    borderRadius: borderRadius || configProps?.borderRadius || null,
    width: width || configProps?.width || "100%",
    height: height || configProps?.height || null,
    justifyContent: position || configProps?.position || "left"
  }

  if (editMode === false && aclValue === false && basicAclCheck === false) {
    return null;
  }   

  return (
    <Wrapper className='videoWrapper' 
      hovBgColor={hovBgColor} 
    >     
      {videoType === "video" && video &&
        <div className='videoComponent' style={{ justifyContent: position || configProps?.position || "left"}}> 
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

export default Video;
import React, { useId, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAPIBase } from '../../helpers/AppHelpers';

const Wrapper = styled.div`
  .iframeWrapper iframe:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
}`

function IFrame({ 
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
  styleName,
  noStyles
 }) {

  const id = useId();

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/iframeComponents/@nodes`)
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

  const defBgColor = defaultBackColor || configProps?.defaultBackColor || null;
  const hovBgColor = hoverBackColor || configProps?.hoverBackColor || defBgColor;
  
  const iframeStyles = { 
    paddingTop: paddingTop || configProps?.paddingTop || null,
    paddingRight: paddingRight || configProps?.paddingRight || null,
    paddingBottom: paddingBottom || configProps?.paddingBottom || null,
    paddingLeft: paddingLeft || configProps?.paddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: borderColor || configProps?.borderColor || null,
    borderWidth: borderWidth || configProps?.borderWidth || null,
    borderStyle: borderStyle || configProps?.borderStyle || null,
    borderRadius: borderRadius || configProps?.borderRadius || null,
  }

  return (
    <Wrapper className='iframeWrapper' hovBgColor={hovBgColor}>
      <div className='iframeComponent' style={{ justifyContent: position || configProps?.position || "left" }}>
        <iframe 
          src={link}
          width={width || configProps?.width || "100%"}
          height={height || configProps?.height || "auto"}
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

export default IFrame;
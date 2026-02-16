import React, { useState, useEffect } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';

function SeparationBlock({ 
    spaceTop, 
    spaceBottom,
    borderWidth,
    borderStyle,
    borderColor,
    styleName,
    noStyles,
    spaceTopNoStyles,
    spaceTopStyleName,
    spaceBottomNoStyles,
    spaceBottomStyleName,
    dividerNoStyles,
    dividerStyleName
}) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;   

  const [configProps, setconfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/separationBlockComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles !== (false || "false")) {
          result = null;
        } 
        setconfigProps(result);
      });
  }, [styleName, noStyles, apiBase, restPath, nodeName]);

  const [spaceTopConfigProps, setSpaceTopConfigProps] = useState();
  
  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/spacerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  spaceTopStyleName || configProps?.spaceTopStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && spaceTopNoStyles === (false || "false")) {
          result = data[0];
        } else if (spaceTopNoStyles !== (false || "false")) {
          result = null;
        } 
        setSpaceTopConfigProps(result);
      });
  }, [spaceTopStyleName, spaceTopNoStyles, configProps?.spaceTopStyleName, apiBase, restPath, nodeName]);

  const [spaceBottomConfigProps, setSpaceBottomConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/spacerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  spaceBottomStyleName || configProps?.spaceBottomStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && spaceBottomNoStyles === (false || "false")) {
          result = data[0];
        } else if (spaceBottomNoStyles !== (false || "false")) {
          result = null;
        } 
        setSpaceBottomConfigProps(result);
      });
  }, [spaceBottomStyleName, spaceBottomNoStyles, configProps?.spaceBottomStyleName, apiBase, restPath, nodeName]);

  const [dividerConfigProps, setDividerConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/dividerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  dividerStyleName || configProps?.dividerStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && dividerNoStyles === (false || "false")) {
          result = data[0];
        } else if (dividerNoStyles !== (false || "false")) {
          result = null;
        } 
        setDividerConfigProps(result);
      });
  }, [dividerStyleName, dividerNoStyles, configProps?.dividerStyleName, apiBase, restPath, nodeName]);

  const spacerStyles = {
    paddingTop: spaceTop || configProps?.spaceTop || spaceTopConfigProps?.spacer || null,
    paddingBottom: spaceBottom || configProps?.spaceBottom || spaceBottomConfigProps?.spacer || null
  }

  const dividerStyles = {
    borderBottomWidth: borderWidth || configProps?.borderWidth || dividerConfigProps?.borderWidth || null,
    borderBottomStyle: borderStyle || configProps?.borderStyle || dividerConfigProps?.borderStyle || null,
    borderBottomColor: borderColor || configProps?.borderColor || dividerConfigProps?.borderColor || null,
  }

  return (
    <div className='separationBlockWrapper'>
      <div className='spacer' style={spacerStyles}> 
        <div className="divider" style={dividerStyles}></div>
      </div>
    </div>
  );

}

export default SeparationBlock;
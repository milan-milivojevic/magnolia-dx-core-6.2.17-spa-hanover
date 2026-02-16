import React, { useState, useEffect, useRef } from 'react';
import { getAPIBase } from '../../../helpers/AppHelpers';

function SeparationBlockConfig({ 
    spaceTop, 
    spaceBottom,
    borderWidth,
    borderStyle,
    borderColor,
    styleName,
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

  const [spaceTopConfigProps, setSpaceTopConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/spacerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === spaceTopStyleName);
        if (!result && spaceTopNoStyles === (false || "false")) {
          result = data[0];
        } else if (spaceTopNoStyles !== (false || "false")) {
          result = null;
        } 
        setSpaceTopConfigProps(result);
      });
  }, [spaceTopStyleName, spaceTopNoStyles, apiBase, restPath, nodeName]);

  const [spaceBottomConfigProps, setSpaceBottomConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/spacerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === spaceBottomStyleName);
        if (!result && spaceBottomNoStyles === (false || "false")) {
          result = data[0];
        } else if (spaceBottomNoStyles !== (false || "false")) {
          result = null;
        } 
        setSpaceBottomConfigProps(result);
      });
  }, [spaceBottomStyleName, spaceBottomNoStyles, apiBase, restPath, nodeName]);

  const [dividerConfigProps, setDividerConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/dividerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === dividerStyleName);
        if (!result && dividerNoStyles === (false || "false")) {
          result = data[0];
        } else if (dividerNoStyles !== (false || "false")) {
          result = null;
        } 
        setDividerConfigProps(result);
      });
  }, [dividerStyleName, dividerNoStyles, apiBase, restPath, nodeName]);

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const spacerStyles = {
    paddingTop: spaceTop || spaceTopConfigProps?.spacer || null,
    paddingBottom: spaceBottom || spaceBottomConfigProps?.spacer || null,
    borderTop: "1px solid #bdbdbd",
    borderBottom: "1px solid #bdbdbd",
  }

  const dividerStyles = {
    borderBottomWidth: borderWidth || dividerConfigProps?.borderWidth || null,
    borderBottomStyle: borderStyle || dividerConfigProps?.borderStyle || null,
    borderBottomColor: borderColor || dividerConfigProps?.borderColor || null,
}

  return (
    <div className='separationBlockWrapper configComponents'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className='spacer' style={spacerStyles}> 
        <div className="divider" style={dividerStyles}></div>
      </div>
    </div>
  );

}

export default SeparationBlockConfig;
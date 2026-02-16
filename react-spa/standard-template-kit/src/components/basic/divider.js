import React, { useEffect, useState } from "react";
import { getAPIBase } from '../../helpers/AppHelpers';

function Divider({ 
    borderWidth,
    borderStyle,
    borderColor,
    styleName,
    noStyles
 }) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/dividerComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === styleName);
        if (!result && noStyles === (false || "false")) {
          result = data[0];
        } else if (noStyles !== (false || "false")) {
          result = null;
        } 
        setConfigProps(result);
      })
  }, [styleName, noStyles, apiBase, restPath, nodeName]);

  const dividerStyles = { 
    borderBottomWidth:  borderWidth || configProps?.borderWidth || null,
    borderBottomStyle:  borderStyle || configProps?.borderStyle || null,
    borderBottomColor:  borderColor || configProps?.borderColor || null
  }

  return (
    <div className='dividerWrapper'>  
      <div className="divider" style={dividerStyles}></div>
    </div>
  );
}

export default Divider;
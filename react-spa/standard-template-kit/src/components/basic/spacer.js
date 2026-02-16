import React, { useState, useEffect } from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';

function Spacer({ spacer, styleName, noStyles }) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/spacerComponents/@nodes`)
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

  return (
    <div className='spacerWrapper'>  
      <div className='spacer' style={{paddingTop:  spacer || configProps?.spacer || null}}></div>
    </div>
  );
}

export default Spacer;
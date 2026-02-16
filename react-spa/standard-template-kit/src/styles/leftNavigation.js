import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  .leftHandNav {
    width: ${(props) => props.leftNavWidth};
    background-color: ${(props) => props.leftNavBackColor};
    border-right-width: ${(props) => props.rightBorderWidth};
    border-right-style: ${(props) => props.rightBorderStyle};
    border-right-color: ${(props) => props.rightBorderColor};
    padding-top: ${(props) => props.leftNavPaddingTop};
  }
  .leftHandNav > .menus {
    padding-bottom: ${(props) => props.leftNavPaddingBottom};
    padding-left: ${(props) => props.leftNavPaddingLeft};
    padding-right: ${(props) => props.leftNavPaddingRight};
    background-color: ${(props) => props.leftNavBackColor};
  }
  .leftNavChevron {
    margin-left: ${(props) => props.leftNavChevronPaddingLeft};
    color: ${(props) => props.leftNavChevronColor};
  }
  .leftHandNav .dropdown.level-2 {
    display: ${(props) => (props.lvl3AlwaysOpen === false || "false" ? "" : "block")};
  }
  .rightMainContent {
    width: ${(props) => "calc(100% - " + props.leftNavWidth + ")"};
  }
`;

function LeftNavigationStyles() {  

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/leftNavConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const leftNavWidth = configProps?.leftNavWidth || "";
  const leftNavBackColor = configProps?.leftNavBackColor || "";
  const rightBorderWidth = configProps?.rightBorderWidth || "";
  const rightBorderStyle = configProps?.rightBorderStyle || "";
  const rightBorderColor = configProps?.rightBorderColor || "";  
  const leftNavPaddingTop = configProps?.leftNavPaddingTop || "";
  const leftNavPaddingBottom = configProps?.leftNavPaddingBottom || "";
  const leftNavPaddingLeft = configProps?.leftNavPaddingLeft || "";
  const leftNavPaddingRight = configProps?.leftNavPaddingRight || "";

  const leftNavChevronColor = configProps?.leftNavChevronColor || "";
  const leftNavChevronPaddingLeft = configProps?.leftNavChevronPaddingLeft || "";

  const lvl3AlwaysOpen = configProps?.lvl3AlwaysOpen || false;

  return (
    <GlobalStyles 
      leftNavWidth={leftNavWidth}
      leftNavBackColor={leftNavBackColor}    
      rightBorderWidth={rightBorderWidth}
      rightBorderStyle={rightBorderStyle}
      rightBorderColor={rightBorderColor}      
      leftNavPaddingTop={leftNavPaddingTop}
      leftNavPaddingBottom={leftNavPaddingBottom}
      leftNavPaddingLeft={leftNavPaddingLeft}
      leftNavPaddingRight={leftNavPaddingRight}   
      
      leftNavChevronColor={leftNavChevronColor} 
      leftNavChevronPaddingLeft={leftNavChevronPaddingLeft}

      lvl3AlwaysOpen={lvl3AlwaysOpen}
    />
  );
}

export default LeftNavigationStyles;
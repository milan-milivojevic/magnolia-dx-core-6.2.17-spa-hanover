import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  .topNav .menus {
    width: ${(props) => props.topNavWidth};
    justify-content: ${(props) => props.topNavAligment};
    background-color: ${(props) => props.topNavBackColor};
    border-top-width: ${(props) => props.topBorderWidth};
    border-top-style: ${(props) => props.topBorderStyle};
    border-top-color: ${(props) => props.topBorderColor};
    border-bottom-width: ${(props) => props.bottomBorderWidth};
    border-bottom-style: ${(props) => props.bottomBorderStyle};
    border-bottom-color: ${(props) => props.bottomBorderColor};
    padding-top: ${(props) => props.topNavPaddingTop};
    padding-bottom: ${(props) => props.topNavPaddingBottom};
    padding-left: ${(props) => props.topNavPaddingLeft};
    padding-right: ${(props) => props.topNavPaddingRight};
    box-shadow: ${(props) => props.bottomShadow};
  }
  .topNav .menus > .menu-item {
    width: ${(props) => (props.topNavAligment === 'unset' ? "" : "auto")};
  }
  .topNav .menus > .menu-item > .dropdown {
    width: ${(props) => props.dropdownWidth};
    height: ${(props) => props.dropdownHeight};
    background-color: ${(props) => props.dropdownBackColor};
    margin-top: ${(props) => (props.bottomBorderStyle !== "none" ? props.bottomBorderWidth : "")};
    display: ${(props) => (props.showOnlyFirstLevel === "false" || false ? "" : "none !important")};
    padding-top: ${(props) => props.dropdownPaddingTop};
    padding-bottom: ${(props) => props.dropdownPaddingBottom};
    padding-left: ${(props) => props.dropdownPaddingLeft};
    padding-right: ${(props) => props.dropdownPaddingRight};
    gap: ${(props) => props.level2Gap};
  }
  
`;

function TopNavigationStyles() {  

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/topNavConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const topNavWidth = configProps?.topNavWidth || "";
  const topNavBackColor = configProps?.topNavBackColor || "";
  const topNavAligment = configProps?.topNavAligment || "unset";
  const topNavPaddingTop = configProps?.topNavPaddingTop || "";
  const topNavPaddingRight = configProps?.topNavPaddingRight || "";
  const topNavPaddingBottom = configProps?.topNavPaddingBottom || "";
  const topNavPaddingLeft = configProps?.topNavPaddingLeft || "";  
  const topBorderWidth = configProps?.topBorderWidth || "";
  const topBorderStyle = configProps?.topBorderStyle || "";
  const topBorderColor = configProps?.topBorderColor || "";
  const bottomBorderWidth = configProps?.bottomBorderWidth || "";
  const bottomBorderStyle = configProps?.bottomBorderStyle || "";
  const bottomBorderColor = configProps?.bottomBorderColor || "";  
  const bottomShadow = configProps?.bottomShadow || "";
  const showOnlyFirstLevel = configProps?.showOnlyFirstLevel || false;
  const dropdownWidth = configProps?.dropdownWidth || "";
  const dropdownHeight = configProps?.dropdownHeight || "";
  const dropdownBackColor = configProps?.dropdownBackColor || "#fff";
  const dropdownPaddingTop = configProps?.dropdownPaddingTop || "";
  const dropdownPaddingRight = configProps?.dropdownPaddingRight || "";
  const dropdownPaddingBottom = configProps?.dropdownPaddingBottom || "";
  const dropdownPaddingLeft = configProps?.dropdownPaddingLeft || "";  
  const level2Gap = configProps?.level2Gap || "";  

  return (
    <GlobalStyles 
      topNavWidth={topNavWidth}
      topNavAligment={topNavAligment}    
      topNavBackColor={topNavBackColor}    
      topNavPaddingTop={topNavPaddingTop}
      topNavPaddingRight={topNavPaddingRight}    
      topNavPaddingBottom={topNavPaddingBottom}
      topNavPaddingLeft={topNavPaddingLeft}  
      topBorderWidth={topBorderWidth}
      topBorderStyle={topBorderStyle}    
      topBorderColor={topBorderColor}
      bottomBorderWidth={bottomBorderWidth}    
      bottomBorderStyle={bottomBorderStyle}
      bottomBorderColor={bottomBorderColor}           
      bottomShadow={bottomShadow} 
      showOnlyFirstLevel={showOnlyFirstLevel}    
      dropdownWidth={dropdownWidth}    
      dropdownHeight={dropdownHeight} 
      dropdownBackColor={dropdownBackColor}   
      dropdownPaddingTop={dropdownPaddingTop}
      dropdownPaddingRight={dropdownPaddingRight}    
      dropdownPaddingBottom={dropdownPaddingBottom}
      dropdownPaddingLeft={dropdownPaddingLeft}  
      level2Gap={level2Gap}  
    />
  );
}

export default TopNavigationStyles;
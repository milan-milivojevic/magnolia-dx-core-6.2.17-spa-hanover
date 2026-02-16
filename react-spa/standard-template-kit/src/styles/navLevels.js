import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  .level-0 > button > a {
    font-size: ${(props) => props.l1FontSize};
    line-height: ${(props) => props.l1FontSize};
    font-family: ${(props) => props.l1FontFamily};
    text-align: ${(props) => props.l1TextAlign};  
    text-transform: ${(props) => props.l1TextTransform};
    color: ${(props) => props.l1Color};
    background-color: ${(props) => props.l1DefBackColor};    
    padding-top: ${(props) => props.l1PaddingTop};
    padding-bottom: ${(props) => props.l1PaddingBottom};
    padding-left: ${(props) => props.l1PaddingLeft};
    padding-right: ${(props) => props.l1PaddingRight};    
    border-right-width: ${(props) => props.l1SeparationBorderWidth};
    border-right-style: ${(props) => props.l1SeparationBorderStyle};
    border-right-color: ${(props) => props.l1SeparationBorderColor};
  }
  .level-0 > button > a:hover {
    color: ${(props) => props.l1HoverColor};
    background-color: ${(props) => props.l1HoverBackColor};
  }
  .level-0 > button > a.active {
    color: ${(props) => props.l1ActiveColor};
    background-color: ${(props) => props.l1ActiveDefBackColor};    
  }
  .level-0 > button > a.active:hover {
    color: ${(props) => props.l1ActiveHoverColor};
    background-color: ${(props) => props.l1ActiveHoverBackColor};
  }
  .level-0:last-child > button > a {
    border: none;
  }

  .level-1 > button > a {
    font-size: ${(props) => props.l2FontSize};
    line-height: ${(props) => props.l2FontSize};
    font-family: ${(props) => props.l2FontFamily};
    text-align: ${(props) => props.l2TextAlign};  
    text-transform: ${(props) => props.l2TextTransform};
    color: ${(props) => props.l2Color};
    background-color: ${(props) => props.l2DefBackColor};    
    padding-top: ${(props) => props.l2PaddingTop};
    padding-bottom: ${(props) => props.l2PaddingBottom};
    padding-left: ${(props) => props.l2PaddingLeft};
    padding-right: ${(props) => props.l2PaddingRight};
  }
  .level-1 > button > a:hover {
    color: ${(props) => props.l2HoverColor};
    background-color: ${(props) => props.l2HoverBackColor};
  }
  .level-1 > button > a.active {
    color: ${(props) => props.l2ActiveColor};
    background-color: ${(props) => props.l2ActiveDefBackColor};    
  }
  .level-1 > button > a.active:hover {
    color: ${(props) => props.l2ActiveHoverColor};
    background-color: ${(props) => props.l2ActiveHoverBackColor};
  }

  .level-2 > button > a {
    line-height: ${(props) => props.l3FontSize};
    font-size: ${(props) => props.l3FontSize};
    font-family: ${(props) => props.l3FontFamily};
    text-align: ${(props) => props.l3TextAlign};  
    text-transform: ${(props) => props.l3TextTransform};
    color: ${(props) => props.l3Color};
    background-color: ${(props) => props.l3DefBackColor};    
    padding-top: ${(props) => props.l3PaddingTop};
    padding-bottom: ${(props) => props.l3PaddingBottom};
    padding-left: ${(props) => props.l3PaddingLeft};
    padding-right: ${(props) => props.l3PaddingRight};    
    margin-top: ${(props) => props.l3MarginTop};
    margin-bottom: ${(props) => props.l3MarginBottom};
    margin-left: ${(props) => props.l3MarginLeft};
    margin-right: ${(props) => props.l3MarginRight};
  }
  .level-2:first-child > button > a {    
    margin-top: ${(props) => "calc(" + props.l3MarginTop + " + " + props.l3MarginBottom + ")"};
  }

  .level-2 > button > a:hover {
    color: ${(props) => props.l3HoverColor};
    background-color: ${(props) => props.l3HoverBackColor};
  }
  .level-2 > button > a.active {
    color: ${(props) => props.l3ActiveColor};
    background-color: ${(props) => props.l3ActiveDefBackColor};    
  }
  .level-2 > button > a.active:hover {
    color: ${(props) => props.l3ActiveHoverColor};
    background-color: ${(props) => props.l3ActiveHoverBackColor};
  }
  
  .level-3 > button > a {
    line-height: ${(props) => props.l4FontSize};
    font-size: ${(props) => props.l4FontSize};
    font-family: ${(props) => props.l4FontFamily};
    text-align: ${(props) => props.l4TextAlign};  
    text-transform: ${(props) => props.l4TextTransform};
    color: ${(props) => props.l4Color};
    background-color: ${(props) => props.l4DefBackColor};    
    padding-top: ${(props) => props.l4PaddingTop};
    padding-bottom: ${(props) => props.l4PaddingBottom};
    padding-left: ${(props) => props.l4PaddingLeft};
    padding-right: ${(props) => props.l4PaddingRight};
  }
  .level-3 > button > a:hover {
    color: ${(props) => props.l4HoverColor};
    background-color: ${(props) => props.l4HoverBackColor};
  }
  .level-3 > button > a.active {
    color: ${(props) => props.l4ActiveColor};
    background-color: ${(props) => props.l4ActiveDefBackColor};    
  }
  .level-3 > button > a.active:hover {
    color: ${(props) => props.l4ActiveHoverColor};
    background-color: ${(props) => props.l4ActiveHoverBackColor};
  }
  .topNav .dropdown-submenu.level-3 {
    bottom: ${(props) => props.l3MarginTop};
    top: unset;
  }
  .topNav .menu-items.level-2:first-child .dropdown-submenu.level-3 {
    top: ${(props) => "calc(" + props.l3MarginTop + " + " + props.l3MarginBottom + ")"};
    bottom: unset;
  }
  
`;

function NavLevelsStyles() {  

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/navLevelsConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  
  const l1FontSize = configProps?.l1FontSize || "";
  const l1FontFamily = configProps?.l1FontFamily || "";
  const l1TextAlign = configProps?.l1TextAlign || "";
  const l1TextTransform = configProps?.l1TextTransform || "";
  const l1Color = configProps?.l1Color || "";
  const l1DefBackColor = configProps?.l1DefBackColor || "";
  const l1PaddingTop = configProps?.l1PaddingTop || "";
  const l1PaddingBottom = configProps?.l1PaddingBottom || "";
  const l1PaddingLeft = configProps?.l1PaddingLeft || "";
  const l1PaddingRight = configProps?.l1PaddingRight || "";
  const l1HoverColor = configProps?.l1HoverColor || "";
  const l1HoverBackColor = configProps?.l1HoverBackColor || "";
  const l1ActiveColor = configProps?.l1ActiveColor || "";
  const l1ActiveDefBackColor = configProps?.l1ActiveDefBackColor || "";
  const l1ActiveHoverColor = configProps?.l1ActiveHoverColor || "";
  const l1ActiveHoverBackColor = configProps?.l1ActiveHoverBackColor || "";
  const l1SeparationBorderWidth = configProps?.l1SeparationBorderWidth || "";
  const l1SeparationBorderStyle = configProps?.l1SeparationBorderStyle || "";
  const l1SeparationBorderColor = configProps?.l1SeparationBorderColor || "";

  const l2FontSize = configProps?.l2FontSize || "";
  const l2FontFamily = configProps?.l2FontFamily || "";
  const l2TextAlign = configProps?.l2TextAlign || "";
  const l2TextTransform = configProps?.l2TextTransform || "";
  const l2Color = configProps?.l2Color || "";
  const l2DefBackColor = configProps?.l2DefBackColor || "";
  const l2PaddingTop = configProps?.l2PaddingTop || "";
  const l2PaddingBottom = configProps?.l2PaddingBottom || "";
  const l2PaddingLeft = configProps?.l2PaddingLeft || "";
  const l2PaddingRight = configProps?.l2PaddingRight || "";
  const l2HoverColor = configProps?.l2HoverColor || "";
  const l2HoverBackColor = configProps?.l2HoverBackColor || "";
  const l2ActiveColor = configProps?.l2ActiveColor || "";
  const l2ActiveDefBackColor = configProps?.l2ActiveDefBackColor || "";
  const l2ActiveHoverColor = configProps?.l2ActiveHoverColor || "";
  const l2ActiveHoverBackColor = configProps?.l2ActiveHoverBackColor || "";

  const l3FontSize = configProps?.l3FontSize || "";
  const l3FontFamily = configProps?.l3FontFamily || "";
  const l3TextAlign = configProps?.l3TextAlign || "";
  const l3TextTransform = configProps?.l3TextTransform || "";
  const l3Color = configProps?.l3Color || "";
  const l3DefBackColor = configProps?.l3DefBackColor || "";
  const l3PaddingTop = configProps?.l3PaddingTop || "";
  const l3PaddingBottom = configProps?.l3PaddingBottom || "";
  const l3PaddingLeft = configProps?.l3PaddingLeft || "";
  const l3PaddingRight = configProps?.l3PaddingRight || "";
  const l3MarginTop = configProps?.l3MarginTop || "";
  const l3MarginBottom = configProps?.l3MarginBottom || "";
  const l3MarginLeft = configProps?.l3MarginLeft || "";
  const l3MarginRight = configProps?.l3MarginRight || "";
  const l3HoverColor = configProps?.l3HoverColor || "";
  const l3HoverBackColor = configProps?.l3HoverBackColor || "";
  const l3ActiveColor = configProps?.l3ActiveColor || "";
  const l3ActiveDefBackColor = configProps?.l3ActiveDefBackColor || "";
  const l3ActiveHoverColor = configProps?.l3ActiveHoverColor || "";
  const l3ActiveHoverBackColor = configProps?.l3ActiveHoverBackColor || "";

  const l4FontSize = configProps?.l4FontSize || "";
  const l4FontFamily = configProps?.l4FontFamily || "";
  const l4TextAlign = configProps?.l4TextAlign || "";
  const l4TextTransform = configProps?.l4TextTransform || "";
  const l4Color = configProps?.l4Color || "";
  const l4DefBackColor = configProps?.l4DefBackColor || "";
  const l4PaddingTop = configProps?.l4PaddingTop || "";
  const l4PaddingBottom = configProps?.l4PaddingBottom || "";
  const l4PaddingLeft = configProps?.l4PaddingLeft || "";
  const l4PaddingRight = configProps?.l4PaddingRight || "";
  const l4HoverColor = configProps?.l4HoverColor || "";
  const l4HoverBackColor = configProps?.l4HoverBackColor || "";
  const l4ActiveColor = configProps?.l4ActiveColor || "";
  const l4ActiveDefBackColor = configProps?.l4ActiveDefBackColor || "";
  const l4ActiveHoverColor = configProps?.l4ActiveHoverColor || "";
  const l4ActiveHoverBackColor = configProps?.l4ActiveHoverBackColor || "";

  return (
    <GlobalStyles
      l1FontSize={l1FontSize}
      l1FontFamily={l1FontFamily}
      l1TextAlign={l1TextAlign}
      l1TextTransform={l1TextTransform}
      l1Color={l1Color}
      l1DefBackColor={l1DefBackColor}
      l1PaddingTop={l1PaddingTop}
      l1PaddingBottom={l1PaddingBottom}
      l1PaddingLeft={l1PaddingLeft}
      l1PaddingRight={l1PaddingRight}
      l1HoverColor={l1HoverColor}
      l1HoverBackColor={l1HoverBackColor}
      l1ActiveColor={l1ActiveColor}
      l1ActiveDefBackColor={l1ActiveDefBackColor}
      l1ActiveHoverColor={l1ActiveHoverColor}
      l1ActiveHoverBackColor={l1ActiveHoverBackColor}
      l1SeparationBorderWidth={l1SeparationBorderWidth}
      l1SeparationBorderStyle={l1SeparationBorderStyle}
      l1SeparationBorderColor={l1SeparationBorderColor}
      
      l2FontSize={l2FontSize}
      l2FontFamily={l2FontFamily}
      l2TextAlign={l2TextAlign}
      l2TextTransform={l2TextTransform}
      l2Color={l2Color}
      l2DefBackColor={l2DefBackColor}
      l2PaddingTop={l2PaddingTop}
      l2PaddingBottom={l2PaddingBottom}
      l2PaddingLeft={l2PaddingLeft}
      l2PaddingRight={l2PaddingRight}
      l2HoverColor={l2HoverColor}
      l2HoverBackColor={l2HoverBackColor}
      l2ActiveColor={l2ActiveColor}
      l2ActiveDefBackColor={l2ActiveDefBackColor}
      l2ActiveHoverColor={l2ActiveHoverColor}
      l2ActiveHoverBackColor={l2ActiveHoverBackColor}

      l3FontSize={l3FontSize}
      l3FontFamily={l3FontFamily}
      l3TextAlign={l3TextAlign}
      l3TextTransform={l3TextTransform}
      l3Color={l3Color}
      l3DefBackColor={l3DefBackColor}
      l3PaddingTop={l3PaddingTop}
      l3PaddingBottom={l3PaddingBottom}
      l3PaddingLeft={l3PaddingLeft}
      l3PaddingRight={l3PaddingRight}
      l3MarginTop={l3MarginTop}
      l3MarginBottom={l3MarginBottom}
      l3MarginLeft={l3MarginLeft}
      l3MarginRight={l3MarginRight}
      l3HoverColor={l3HoverColor}
      l3HoverBackColor={l3HoverBackColor}
      l3ActiveColor={l3ActiveColor}
      l3ActiveDefBackColor={l3ActiveDefBackColor}
      l3ActiveHoverColor={l3ActiveHoverColor}
      l3ActiveHoverBackColor={l3ActiveHoverBackColor}

      l4FontSize={l4FontSize}
      l4FontFamily={l4FontFamily}
      l4TextAlign={l4TextAlign}
      l4TextTransform={l4TextTransform}
      l4Color={l4Color}
      l4DefBackColor={l4DefBackColor}
      l4PaddingTop={l4PaddingTop}
      l4PaddingBottom={l4PaddingBottom}
      l4PaddingLeft={l4PaddingLeft}
      l4PaddingRight={l4PaddingRight}
      l4HoverColor={l4HoverColor}
      l4HoverBackColor={l4HoverBackColor}
      l4ActiveColor={l4ActiveColor}
      l4ActiveDefBackColor={l4ActiveDefBackColor}
      l4ActiveHoverColor={l4ActiveHoverColor}
      l4ActiveHoverBackColor={l4ActiveHoverBackColor}
    />
  );
}

export default NavLevelsStyles;
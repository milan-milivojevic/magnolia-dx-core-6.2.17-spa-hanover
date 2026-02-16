import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  .logo {
    width: ${(props) => props.logoWidth};
    align-items: ${(props) => props.logoPosition};
  }
  header {
    height: ${(props) => props.headerHeight};
    background-color: ${(props) => props.headerBackColor};
    background-image: ${(props) => "linear-gradient(" + props.headerGradientBackColor + ")"};
    padding-top: ${(props) => props.headerPaddingTop};
    padding-bottom: ${(props) => props.headerPaddingBottom};
    padding-left: ${(props) => props.headerPaddingLeft};
    padding-right: ${(props) => props.headerPaddingRight};
  }
  .header {
    max-width: ${(props) => props.headerWidth};
  }
  .logout div {
    color: ${(props) => props.logoutColor};
    background-color: ${(props) => props.logoutBackColor};
    border-width: ${(props) => props.logoutBorderWidth};
    border-style: ${(props) => props.logoutBorderStyle};
    border-color: ${(props) => props.logoutBorderColor};
    border-radus: ${(props) => props.logoutBorderRadius};
  }
  .logout:hover div {
    color: ${(props) => props.logoutHoverColor};
    background-color: ${(props) => props.logoutBackHoverColor};
  }
  .languages {
    font-size: ${(props) => props.languageFontSize};
    font-family: ${(props) => props.languageFontFamily};
    color: ${(props) => props.languageColor};
  } 
  .languages span:hover {
    color: ${(props) => props.languageHoverColor};
  } 
  .userLinks a {
    font-size: ${(props) => props.userFontSize};
    font-family: ${(props) => props.userFontFamily};
    color: ${(props) => props.userColor};
  } 
  .userLinks a:hover {
    color: ${(props) => props.userHoverColor};
  } 
`;

function HeaderStyles() {  
  
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/headerConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const logoWidth = configProps?.logoWidth || "";
  const logoHeight = configProps?.logoHeight || "";
  const logoPosition = configProps?.logoPosition || "";

  const headerWidth = configProps?.headerWidth || "";
  const headerHeight = configProps?.headerHeight || "";
  const headerBackColor = configProps?.headerBackColor || "";
  const headerGradientBackColor = configProps?.headerGradientBackColor || "";
  const headerPaddingTop = configProps?.headerPaddingTop || "";
  const headerPaddingBottom = configProps?.headerPaddingBottom || "";
  const headerPaddingLeft = configProps?.headerPaddingLeft || "";
  const headerPaddingRight = configProps?.headerPaddingRight || "";

  const logoutColor = configProps?.logoutColor || "transparent";
  const logoutHoverColor = configProps?.logoutHoverColor || "";
  const logoutBackColor = configProps?.logoutBackColor || "";
  const logoutBackHoverColor = configProps?.logoutBackHoverColor || "";

  const logoutBorderWidth = configProps?.logoutBorderWidth || "1px";
  const logoutBorderStyle = configProps?.logoutBorderStyle || "solid";
  const logoutBorderColor = configProps?.logoutBorderColor || configProps?.logoutBackColor || "transparent";
  const logoutBorderRadius = configProps?.logoutBorderRadius || "";

  const userColor = configProps?.userColor || "";
  const userHoverColor = configProps?.userHoverColor || "";
  const userFontSize = configProps?.userFontSize || "";
  const userFontFamily = configProps?.userFontFamily || "";

  const languageColor = configProps?.languageColor || "";
  const languageHoverColor = configProps?.languageHoverColor || "";
  const languageFontSize = configProps?.languageFontSize || "";
  const languageFontFamily = configProps?.languageFontFamily || "";

  return (
    <GlobalStyles 
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      logoPosition={logoPosition}

      headerWidth={headerWidth}
      headerHeight={headerHeight}
      headerBackColor={headerBackColor}
      headerGradientBackColor={headerGradientBackColor}
      headerPaddingTop={headerPaddingTop}
      headerPaddingBottom={headerPaddingBottom}
      headerPaddingLeft={headerPaddingLeft}
      headerPaddingRight={headerPaddingRight}      

      logoutColor={logoutColor}
      logoutHoverColor={logoutHoverColor}
      logoutBackColor={logoutBackColor}
      logoutBackHoverColor={logoutBackHoverColor}

      logoutBorderWidth={logoutBorderWidth}
      logoutBorderStyle={logoutBorderStyle}
      logoutBorderColor={logoutBorderColor}
      logoutBorderRadius={logoutBorderRadius}

      userColor={userColor}
      userHoverColor={userHoverColor}
      userFontSize={userFontSize}
      userFontFamily={userFontFamily}

      languageColor={languageColor}
      languageHoverColor={languageHoverColor}
      languageFontSize={languageFontSize}
      languageFontFamily={languageFontFamily}
    />
  );
}

export default HeaderStyles;
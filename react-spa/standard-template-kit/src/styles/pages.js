import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.bodyBackColor};
  }
  .homePage {
    max-width: ${(props) => props.homePageWidth};
    background-color: ${(props) => props.homePageBackColor};
    padding-top: ${(props) => props.homePagePaddingTop};
    padding-bottom: ${(props) => props.homePagePaddingBottom};
    padding-left: ${(props) => props.homePagePaddingLeft};
    padding-right: ${(props) => props.homePagePaddingRight};
  }
  .contentPage {
    max-width: ${(props) => props.contentPagesWidth};
    background-color: ${(props) => props.contentPagesBackColor};
    padding-top: ${(props) => props.contentPagesPaddingTop};
    padding-bottom: ${(props) => props.contentPagesPaddingBottom};
    padding-left: ${(props) => props.contentPagesPaddingLeft};
    padding-right: ${(props) => props.contentPagesPaddingRight};
  }
  .rightMainContent {
    max-width: ${(props) => props.lhnPagesWidth};
    background-color: ${(props) => props.lhnPagesBackColor};
  }
  .rightMainContent .mainSection {
    padding-top: ${(props) => props.lhnPagesPaddingTop};
    padding-bottom: ${(props) => props.lhnPagesPaddingBottom};
    padding-left: ${(props) => props.lhnPagesPaddingLeft};
    padding-right: ${(props) => props.lhnPagesPaddingRight};
  }
`;

function PagesStyles() {  

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/pagesConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const bodyBackColor = configProps?.bodyBackColor || "";
  const homePageWidth = configProps?.homePageWidth || "";
  const homePageBackColor = configProps?.homePageBackColor || "";
  const homePagePaddingTop = configProps?.homePagePaddingTop || "";
  const homePagePaddingBottom = configProps?.homePagePaddingBottom || "";
  const homePagePaddingLeft = configProps?.homePagePaddingLeft || "";
  const homePagePaddingRight = configProps?.homePagePaddingRight || "";

  const contentPagesWidth = configProps?.contentPagesWidth || "";
  const contentPagesBackColor = configProps?.contentPagesBackColor || "";
  const contentPagesPaddingTop = configProps?.contentPagesPaddingTop || "";
  const contentPagesPaddingBottom = configProps?.contentPagesPaddingBottom || "";
  const contentPagesPaddingLeft = configProps?.contentPagesPaddingLeft || "";
  const contentPagesPaddingRight = configProps?.contentPagesPaddingRight || "";

  const lhnPagesWidth = configProps?.lhnPagesWidth || "";
  const lhnPagesBackColor = configProps?.lhnPagesBackColor || "";
  const lhnPagesPaddingTop = configProps?.lhnPagesPaddingTop || "";
  const lhnPagesPaddingBottom = configProps?.lhnPagesPaddingBottom || "";
  const lhnPagesPaddingLeft = configProps?.lhnPagesPaddingLeft || "";
  const lhnPagesPaddingRight = configProps?.lhnPagesPaddingRight || "";

  return (
    <GlobalStyles 
      bodyBackColor={bodyBackColor}
      homePageWidth={homePageWidth}
      homePageBackColor={homePageBackColor}    
      homePagePaddingTop={homePagePaddingTop}
      homePagePaddingBottom={homePagePaddingBottom}
      homePagePaddingLeft={homePagePaddingLeft} 
      homePagePaddingRight={homePagePaddingRight}  

      contentPagesWidth={contentPagesWidth}
      contentPagesBackColor={contentPagesBackColor}    
      contentPagesPaddingTop={contentPagesPaddingTop}
      contentPagesPaddingBottom={contentPagesPaddingBottom}
      contentPagesPaddingLeft={contentPagesPaddingLeft} 
      contentPagesPaddingRight={contentPagesPaddingRight}  

      lhnPagesWidth={lhnPagesWidth}
      lhnPagesBackColor={lhnPagesBackColor}    
      lhnPagesPaddingTop={lhnPagesPaddingTop}
      lhnPagesPaddingBottom={lhnPagesPaddingBottom}
      lhnPagesPaddingLeft={lhnPagesPaddingLeft} 
      lhnPagesPaddingRight={lhnPagesPaddingRight}  
    />
  );
}

export default PagesStyles;
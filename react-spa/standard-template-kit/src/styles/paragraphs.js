import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  p {
    font-size: ${(props) => props.pDefaultFontSize};
    font-family: ${(props) => props.pDefaultFontFamily};
    font-weight: ${(props) => props.pDefaultBold};
    font-style: ${(props) => props.pDefaultItalic};  
    letter-spacing: ${(props) => props.pDefaultLetterSpacing};
    color: ${(props) => props.pDefaultColor};
    line-height: ${(props) => props.pDefaultLineHeight};
    text-align: ${(props) => props.pDefaultPosition}; 
    text-transform: ${(props) => props.pDefaultTextTransform};
    padding-top: ${(props) => props.pDefaultPaddingTop};
    padding-bottom: ${(props) => props.pDefaultPaddingBottom};
    padding-left: ${(props) => props.pDefaultPaddingLeft};
    padding-right: ${(props) => props.pDefaultPaddingRight};
  }

  li {
    font-size: ${(props) => props.pDefaultFontSize};
    font-family: ${(props) => props.pDefaultFontFamily};
    font-weight: ${(props) => props.pDefaultBold};
    font-style: ${(props) => props.pDefaultItalic};  
    letter-spacing: ${(props) => props.pDefaultLetterSpacing};
    color: ${(props) => props.pDefaultColor};
    line-height: ${(props) => props.pDefaultLineHeight};
    text-align: ${(props) => props.pDefaultPosition}; 
    text-transform: ${(props) => props.pDefaultTextTransform};
  }

  .small p {
    font-size: ${(props) => props.pSmallFontSize};
    font-family: ${(props) => props.pSmallFontFamily};
    font-weight: ${(props) => props.pSmallBold};
    font-style: ${(props) => props.pSmallItalic};  
    letter-spacing: ${(props) => props.pSmallLetterSpacing};
    color: ${(props) => props.pSmallColor};
    line-height: ${(props) => props.pSmallLineHeight};
    text-align: ${(props) => props.pSmallPosition}; 
    text-transform: ${(props) => props.pSmallTextTransform};
    padding-top: ${(props) => props.pSmallPaddingTop};
    padding-bottom: ${(props) => props.pSmallPaddingBottom};
    padding-left: ${(props) => props.pSmallPaddingLeft};
    padding-right: ${(props) => props.pSmallPaddingRight};
  }

  .normal p {
    font-size: ${(props) => props.pNormalFontSize};
    font-family: ${(props) => props.pNormalFontFamily};
    font-weight: ${(props) => props.pNormalBold};
    font-style: ${(props) => props.pNormalItalic};  
    letter-spacing: ${(props) => props.pNormalLetterSpacing};
    color: ${(props) => props.pNormalColor};
    line-height: ${(props) => props.pNormalLineHeight};
    text-align: ${(props) => props.pNormalPosition}; 
    text-transform: ${(props) => props.pNormalTextTransform};
    padding-top: ${(props) => props.pNormalPaddingTop};
    padding-bottom: ${(props) => props.pNormalPaddingBottom};
    padding-left: ${(props) => props.pNormalPaddingLeft};
    padding-right: ${(props) => props.pNormalPaddingRight};
  }

  .big p {
    font-size: ${(props) => props.pBigFontSize};
    font-family: ${(props) => props.pBigFontFamily};
    font-weight: ${(props) => props.pBigBold};
    font-style: ${(props) => props.pBigItalic};  
    letter-spacing: ${(props) => props.pBigLetterSpacing};
    color: ${(props) => props.pBigColor};
    line-height: ${(props) => props.pBigLineHeight};
    text-align: ${(props) => props.pBigPosition}; 
    text-transform: ${(props) => props.pBigTextTransform};
    padding-top: ${(props) => props.pBigPaddingTop};
    padding-bottom: ${(props) => props.pBigPaddingBottom};
    padding-left: ${(props) => props.pBigPaddingLeft};
    padding-right: ${(props) => props.pBigPaddingRight};
  }
  figcaption {
    font-size: ${(props) => props.captionFontSize};
    font-family: ${(props) => props.captionFontFamily};
    font-weight: ${(props) => props.captionBold};
    font-style: ${(props) => props.captionItalic};  
    letter-spacing: ${(props) => props.captionLetterSpacing};
    color: ${(props) => props.captionColor};
    line-height: ${(props) => props.captionLineHeight};
    text-align: ${(props) => props.captionPosition}; 
    text-transform: ${(props) => props.captionTextTransform};
  }
`;

function HeadlinesStyles() {  

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/paragraphsConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const pDefaultFontSize = configProps?.pDefaultFontSize || "";
  const pDefaultFontFamily = configProps?.pDefaultFontFamily || "";
  const pDefaultPosition = configProps?.pDefaultPosition || "";
  const pDefaultBold = configProps?.pDefaultBold || "";
  const pDefaultItalic = configProps?.pDefaultItalic || "";
  const pDefaultLetterSpacing = configProps?.pDefaultLetterSpacing || "";
  const pDefaultColor = configProps?.pDefaultColor || "";
  const pDefaultLineHeight = configProps?.pDefaultLineHeight || "";
  const pDefaultTextTransform = configProps?.pDefaultTextTransform || "";
  const pDefaultPaddingTop = configProps?.pDefaultPaddingTop || "";
  const pDefaultPaddingBottom = configProps?.pDefaultPaddingBottom || "";
  const pDefaultPaddingLeft = configProps?.pDefaultPaddingLeft || "";
  const pDefaultPaddingRight = configProps?.pDefaultPaddingRight || "";

  const pSmallFontSize = configProps?.pSmallFontSize || "unset";
  const pSmallFontFamily = configProps?.pSmallFontFamily || "unset";
  const pSmallPosition = configProps?.pSmallPosition || "unset";
  const pSmallBold = configProps?.pSmallBold || "unset";
  const pSmallItalic = configProps?.pSmallItalic || "unset";
  const pSmallLetterSpacing = configProps?.pSmallLetterSpacing || "unset";
  const pSmallColor = configProps?.pSmallColor || "unset";
  const pSmallLineHeight = configProps?.pSmallLineHeight || "unset";
  const pSmallTextTransform = configProps?.pSmallTextTransform || "unset";
  const pSmallPaddingTop = configProps?.pSmallPaddingTop || "unset";
  const pSmallPaddingBottom = configProps?.pSmallPaddingBottom || "unset";
  const pSmallPaddingLeft = configProps?.pSmallPaddingLeft || "unset";
  const pSmallPaddingRight = configProps?.pSmallPaddingRight || "unset";

  const pNormalFontSize = configProps?.pNormalFontSize || "unset";
  const pNormalFontFamily = configProps?.pNormalFontFamily || "unset";
  const pNormalPosition = configProps?.pNormalPosition || "unset";
  const pNormalBold = configProps?.pNormalBold || "unset";
  const pNormalItalic = configProps?.pNormalItalic || "unset";
  const pNormalLetterSpacing = configProps?.pNormalLetterSpacing || "unset";
  const pNormalColor = configProps?.pNormalColor || "unset";
  const pNormalLineHeight = configProps?.pNormalLineHeight || "unset";
  const pNormalTextTransform = configProps?.pNormalTextTransform || "unset";
  const pNormalPaddingTop = configProps?.pNormalPaddingTop || "unset";
  const pNormalPaddingBottom = configProps?.pNormalPaddingBottom || "unset";
  const pNormalPaddingLeft = configProps?.pNormalPaddingLeft || "unset";
  const pNormalPaddingRight = configProps?.pNormalPaddingRight || "unset";

  const pBigFontSize = configProps?.pBigFontSize || "unset";
  const pBigFontFamily = configProps?.pBigFontFamily || "unset";
  const pBigPosition = configProps?.pBigPosition || "unset";
  const pBigBold = configProps?.pBigBold || "unset";
  const pBigItalic = configProps?.pBigItalic || "unset";
  const pBigLetterSpacing = configProps?.pBigLetterSpacing || "unset";
  const pBigColor = configProps?.pBigColor || "unset";
  const pBigLineHeight = configProps?.pBigLineHeight || "unset";
  const pBigTextTransform = configProps?.pBigTextTransform || "unset";
  const pBigPaddingTop = configProps?.pBigPaddingTop || "unset";
  const pBigPaddingBottom = configProps?.pBigPaddingBottom || "unset";
  const pBigPaddingLeft = configProps?.pBigPaddingLeft || "unset";
  const pBigPaddingRight = configProps?.pBigPaddingRight || "unset";

  const captionFontSize = configProps?.captionFontSize || "";
  const captionFontFamily = configProps?.captionFontFamily || "";
  const captionPosition = configProps?.captionPosition || "";
  const captionBold = configProps?.captionBold || "";
  const captionItalic = configProps?.captionItalic || "";
  const captionLetterSpacing = configProps?.captionLetterSpacing || "";
  const captionColor = configProps?.captionColor || "";
  const captionLineHeight = configProps?.captionLineHeight || "";
  const captionTextTransform = configProps?.captionTextTransform || "";

  return (
    <GlobalStyles 
      pDefaultFontSize={pDefaultFontSize}
      pDefaultFontFamily={pDefaultFontFamily}
      pDefaultPosition={pDefaultPosition}
      pDefaultBold={pDefaultBold}
      pDefaultItalic={pDefaultItalic}
      pDefaultLetterSpacing={pDefaultLetterSpacing}
      pDefaultColor={pDefaultColor}
      pDefaultLineHeight={pDefaultLineHeight}
      pDefaultTextTransform={pDefaultTextTransform}
      pDefaultPaddingTop={pDefaultPaddingTop}
      pDefaultPaddingBottom={pDefaultPaddingBottom}
      pDefaultPaddingLeft={pDefaultPaddingLeft}
      pDefaultPaddingRight={pDefaultPaddingRight}

      pSmallFontSize={pSmallFontSize}
      pSmallFontFamily={pSmallFontFamily}
      pSmallPosition={pSmallPosition}
      pSmallBold={pSmallBold}
      pSmallItalic={pSmallItalic}
      pSmallLetterSpacing={pSmallLetterSpacing}
      pSmallColor={pSmallColor}
      pSmallLineHeight={pSmallLineHeight}
      pSmallTextTransform={pSmallTextTransform}
      pSmallPaddingTop={pSmallPaddingTop}
      pSmallPaddingBottom={pSmallPaddingBottom}
      pSmallPaddingLeft={pSmallPaddingLeft}
      pSmallPaddingRight={pSmallPaddingRight}

      pNormalFontSize={pNormalFontSize}
      pNormalFontFamily={pNormalFontFamily}
      pNormalPosition={pNormalPosition}
      pNormalBold={pNormalBold}
      pNormalItalic={pNormalItalic}
      pNormalLetterSpacing={pNormalLetterSpacing}
      pNormalColor={pNormalColor}
      pNormalLineHeight={pNormalLineHeight}
      pNormalTextTransform={pNormalTextTransform}
      pNormalPaddingTop={pNormalPaddingTop}
      pNormalPaddingBottom={pNormalPaddingBottom}
      pNormalPaddingLeft={pNormalPaddingLeft}
      pNormalPaddingRight={pNormalPaddingRight}

      pBigFontSize={pBigFontSize}
      pBigFontFamily={pBigFontFamily}
      pBigPosition={pBigPosition}
      pBigBold={pBigBold}
      pBigItalic={pBigItalic}
      pBigLetterSpacing={pBigLetterSpacing}
      pBigColor={pBigColor}
      pBigLineHeight={pBigLineHeight}
      pBigTextTransform={pBigTextTransform}
      pBigPaddingTop={pBigPaddingTop}
      pBigPaddingBottom={pBigPaddingBottom}
      pBigPaddingLeft={pBigPaddingLeft}
      pBigPaddingRight={pBigPaddingRight}

      captionFontSize={captionFontSize}
      captionFontFamily={captionFontFamily}
      captionPosition={captionPosition}
      captionBold={captionBold}
      captionItalic={captionItalic}
      captionLetterSpacing={captionLetterSpacing}
      captionColor={captionColor}
      captionLineHeight={captionLineHeight}
      captionTextTransform={captionTextTransform}
    />
  );
}

export default HeadlinesStyles;
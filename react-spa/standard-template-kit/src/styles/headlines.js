import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { getAPIBase } from "../helpers/AppHelpers";

const GlobalStyles = createGlobalStyle`
  h1 {
    font-size: ${(props) => props.h1FontSize};
    font-family: ${(props) => props.h1FontFamily};
    font-weight: ${(props) => props.h1Bold};
    font-style: ${(props) => props.h1Italic};  
    letter-spacing: ${(props) => props.h1LetterSpacing};
    color: ${(props) => props.h1Color};
    line-height: ${(props) => props.h1LineHeight};
    text-align: ${(props) => props.h1Position};  
    text-transform: ${(props) => props.h1TextTransform};
    padding-top: ${(props) => props.h1PaddingTop};
    padding-bottom: ${(props) => props.h1PaddingBottom};
    padding-left: ${(props) => props.h1PaddingLeft};
    padding-right: ${(props) => props.h1PaddingRight};
  }
  h2 {
    font-size: ${(props) => props.h2FontSize};
    font-family: ${(props) => props.h2FontFamily};
    font-weight: ${(props) => props.h2Bold};
    font-style: ${(props) => props.h2Italic};  
    letter-spacing: ${(props) => props.h2LetterSpacing};
    color: ${(props) => props.h2Color};
    line-height: ${(props) => props.h2LineHeight};
    text-align: ${(props) => props.h2Position};
    text-transform: ${(props) => props.h2TextTransform};
    padding-top: ${(props) => props.h2PaddingTop};
    padding-bottom: ${(props) => props.h2PaddingBottom};
    padding-left: ${(props) => props.h2PaddingLeft};
    padding-right: ${(props) => props.h2PaddingRight};
  }
  h3 {
    font-size: ${(props) => props.h3FontSize};
    font-family: ${(props) => props.h3FontFamily};
    font-weight: ${(props) => props.h3Bold};
    font-style: ${(props) => props.h3Italic};  
    letter-spacing: ${(props) => props.h3LetterSpacing};
    color: ${(props) => props.h3Color};
    line-height: ${(props) => props.h3LineHeight};
    text-align: ${(props) => props.h3Position}; 
    text-transform: ${(props) => props.h3TextTransform};
    padding-top: ${(props) => props.h3PaddingTop};
    padding-bottom: ${(props) => props.h3PaddingBottom};
    padding-left: ${(props) => props.h3PaddingLeft};
    padding-right: ${(props) => props.h3PaddingRight};
  }
  h4 {
    font-size: ${(props) => props.h4FontSize};
    font-family: ${(props) => props.h4FontFamily};
    font-weight: ${(props) => props.h4Bold};
    font-style: ${(props) => props.h4Italic};  
    letter-spacing: ${(props) => props.h4LetterSpacing};
    color: ${(props) => props.h4Color};
    line-height: ${(props) => props.h4LineHeight};
    text-align: ${(props) => props.h4Position}; 
    text-transform: ${(props) => props.h4TextTransform};
    padding-top: ${(props) => props.h4PaddingTop};
    padding-bottom: ${(props) => props.h4PaddingBottom};
    padding-left: ${(props) => props.h4PaddingLeft};
    padding-right: ${(props) => props.h4PaddingRight};
  }
  h5 {
    font-size: ${(props) => props.h5FontSize};
    font-family: ${(props) => props.h5FontFamily};
    font-weight: ${(props) => props.h5Bold};
    font-style: ${(props) => props.h5Italic};  
    letter-spacing: ${(props) => props.h5LetterSpacing};
    color: ${(props) => props.h5Color};
    line-height: ${(props) => props.h5LineHeight};
    text-align: ${(props) => props.h5Position}; 
    text-transform: ${(props) => props.h5TextTransform};
    padding-top: ${(props) => props.h5PaddingTop};
    padding-bottom: ${(props) => props.h5PaddingBottom};
    padding-left: ${(props) => props.h5PaddingLeft};
    padding-right: ${(props) => props.h5PaddingRight};
  }
  h6 {
    font-size: ${(props) => props.h6FontSize};
    font-family: ${(props) => props.h6FontFamily};
    font-weight: ${(props) => props.h6Bold};
    font-style: ${(props) => props.h6Italic};  
    letter-spacing: ${(props) => props.h6LetterSpacing};
    color: ${(props) => props.h6Color};
    line-height: ${(props) => props.h6LineHeight};
    text-align: ${(props) => props.h6Position}; 
    text-transform: ${(props) => props.h6TextTransform};
    padding-top: ${(props) => props.h6PaddingTop};
    padding-bottom: ${(props) => props.h6PaddingBottom};
    padding-left: ${(props) => props.h6PaddingLeft};
    padding-right: ${(props) => props.h6PaddingRight};
  }
  p  {
    font-size: ${(props) => props.pFontSize};
    font-family: ${(props) => props.pFontFamily};
    font-weight: ${(props) => props.pBold};
    font-style: ${(props) => props.pItalic};  
    letter-spacing: ${(props) => props.pLetterSpacing};
    color: ${(props) => props.pColor};
    line-height: ${(props) => props.pLineHeight};
    text-transform: ${(props) => props.pTextTransform};
    padding-top: ${(props) => props.pPaddingTop};
    padding-bottom: ${(props) => props.pPaddingBottom};
    padding-left: ${(props) => props.pPaddingLeft};
    padding-right: ${(props) => props.pPaddingRight};
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
`;

function HeadlinesStyles() {  
  
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/headlinesConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const h1FontSize = configProps?.h1FontSize || "";
  const h1FontFamily = configProps?.h1FontFamily || "";
  const h1Position = configProps?.h1Position || "";
  const h1Bold = configProps?.h1Bold || "";
  const h1Italic = configProps?.h1Italic || "";
  const h1LetterSpacing = configProps?.h1LetterSpacing || "";
  const h1Color = configProps?.h1Color || "";
  const h1LineHeight = configProps?.h1LineHeight || "";
  const h1TextTransform = configProps?.h1TextTransform || "";
  const h1PaddingTop = configProps?.h1PaddingTop || "";
  const h1PaddingBottom = configProps?.h1PaddingBottom || "";
  const h1PaddingLeft = configProps?.h1PaddingLeft || "";
  const h1PaddingRight = configProps?.h1PaddingRight || "";

  const h2FontSize = configProps?.h2FontSize || "";
  const h2FontFamily = configProps?.h2FontFamily || "";
  const h2Position = configProps?.h2Position || "";
  const h2Bold = configProps?.h2Bold || "";
  const h2Italic = configProps?.h2Italic || "";
  const h2LetterSpacing = configProps?.h2LetterSpacing || "";
  const h2Color = configProps?.h2Color || "";
  const h2LineHeight = configProps?.h2LineHeight || "";
  const h2TextTransform = configProps?.h2TextTransform || "";
  const h2PaddingTop = configProps?.h2PaddingTop || "";
  const h2PaddingBottom = configProps?.h2PaddingBottom || "";
  const h2PaddingLeft = configProps?.h2PaddingLeft || "";
  const h2PaddingRight = configProps?.h2PaddingRight || "";

  const h3FontSize = configProps?.h3FontSize || "";
  const h3FontFamily = configProps?.h3FontFamily || "";
  const h3Position = configProps?.h3Position || "";
  const h3Bold = configProps?.h3Bold || "";
  const h3Italic = configProps?.h3Italic || "";
  const h3LetterSpacing = configProps?.h3LetterSpacing || "";
  const h3Color = configProps?.h3Color || "";
  const h3LineHeight = configProps?.h3LineHeight || "";
  const h3TextTransform = configProps?.h3TextTransform || "";
  const h3PaddingTop = configProps?.h3PaddingTop || "";
  const h3PaddingBottom = configProps?.h3PaddingBottom || "";
  const h3PaddingLeft = configProps?.h3PaddingLeft || "";
  const h3PaddingRight = configProps?.h3PaddingLeft || "";

  const h4FontSize = configProps?.h4FontSize || "";
  const h4FontFamily = configProps?.h4FontFamily || "";
  const h4Position = configProps?.h4Position || "";
  const h4Bold = configProps?.h4Bold || "";
  const h4Italic = configProps?.h4Italic || "";
  const h4LetterSpacing = configProps?.h4LetterSpacing || "";
  const h4Color = configProps?.h4Color || "";
  const h4LineHeight = configProps?.h4LineHeight || "";
  const h4TextTransform = configProps?.h4TextTransform || "";
  const h4PaddingTop = configProps?.h4PaddingTop || "";
  const h4PaddingBottom = configProps?.h4PaddingBottom || "";
  const h4PaddingLeft = configProps?.h4PaddingLeft || "";
  const h4PaddingRight = configProps?.h4PaddingRight || "";

  const h5FontSize = configProps?.h5FontSize || "";
  const h5FontFamily = configProps?.h5FontFamily || "";
  const h5Position = configProps?.h5Position || "";
  const h5Bold = configProps?.h5Bold || "";
  const h5Italic = configProps?.h5Italic || "";
  const h5LetterSpacing = configProps?.h5LetterSpacing || "";
  const h5Color = configProps?.h5Color || "";
  const h5LineHeight = configProps?.h5LineHeight || "";
  const h5TextTransform = configProps?.h5TextTransform || "";
  const h5PaddingTop = configProps?.h5PaddingTop || "";
  const h5PaddingBottom = configProps?.h5PaddingBottom || "";
  const h5PaddingLeft = configProps?.h5PaddingLeft || "";
  const h5PaddingRight = configProps?.h5PaddingRight || "";

  const h6FontSize = configProps?.h6FontSize || "";
  const h6FontFamily = configProps?.h6FontFamily || "";
  const h6Position = configProps?.h6Position || "";
  const h6Bold = configProps?.h6Bold || "";
  const h6Italic = configProps?.h6Italic || "";
  const h6LetterSpacing = configProps?.h6LetterSpacing || "";
  const h6Color = configProps?.h6Color || "";
  const h6LineHeight = configProps?.h6LineHeight || "";
  const h6TextTransform = configProps?.h6TextTransform || "";
  const h6PaddingTop = configProps?.h6PaddingTop || "";
  const h6PaddingBottom = configProps?.h6PaddingBottom || "";
  const h6PaddingLeft = configProps?.h6PaddingLeft || "";
  const h6PaddingRight = configProps?.h6PaddingRight || "";

  return (
    <GlobalStyles 
      h1FontSize={h1FontSize}
      h1FontFamily={h1FontFamily}
      h1Position={h1Position}
      h1Bold={h1Bold}
      h1Italic={h1Italic}
      h1LetterSpacing={h1LetterSpacing}
      h1Color={h1Color}
      h1LineHeight={h1LineHeight}
      h1TextTransform={h1TextTransform}
      h1PaddingTop={h1PaddingTop}
      h1PaddingBottom={h1PaddingBottom}
      h1PaddingLeft={h1PaddingLeft}
      h1PaddingRight={h1PaddingRight}

      h2FontSize={h2FontSize}
      h2FontFamily={h2FontFamily}
      h2Position={h2Position}
      h2Bold={h2Bold}
      h2Italic={h2Italic}
      h2LetterSpacing={h2LetterSpacing}
      h2Color={h2Color}
      h2LineHeight={h2LineHeight}
      h2TextTransform={h2TextTransform}
      h2PaddingTop={h2PaddingTop}
      h2PaddingBottom={h2PaddingBottom}
      h2PaddingLeft={h2PaddingLeft}
      h2PaddingRight={h2PaddingRight}

      h3FontSize={h3FontSize}
      h3FontFamily={h3FontFamily}
      h3Position={h3Position}
      h3Bold={h3Bold}
      h3Italic={h3Italic}
      h3LetterSpacing={h3LetterSpacing}
      h3Color={h3Color}
      h3LineHeight={h3LineHeight}
      h3TextTransform={h3TextTransform}
      h3PaddingTop={h3PaddingTop}
      h3PaddingBottom={h3PaddingBottom}
      h3PaddingLeft={h3PaddingLeft}
      h3PaddingRight={h3PaddingRight}

      h4FontSize={h4FontSize}
      h4FontFamily={h4FontFamily}
      h4Position={h4Position}
      h4Bold={h4Bold}
      h4Italic={h4Italic}
      h4LetterSpacing={h4LetterSpacing}
      h4Color={h4Color}
      h4LineHeight={h4LineHeight}
      h4TextTransform={h4TextTransform}
      h4PaddingTop={h4PaddingTop}
      h4PaddingBottom={h4PaddingBottom}
      h4PaddingLeft={h4PaddingLeft}
      h4PaddingRight={h4PaddingRight}

      h5FontSize={h5FontSize}
      h5FontFamily={h5FontFamily}
      h5Position={h5Position}
      h5Bold={h5Bold}
      h5Italic={h5Italic}
      h5LetterSpacing={h5LetterSpacing}
      h5Color={h5Color}
      h5LineHeight={h5LineHeight}
      h5TextTransform={h5TextTransform}
      h5PaddingTop={h5PaddingTop}
      h5PaddingBottom={h5PaddingBottom}
      h5PaddingLeft={h5PaddingLeft}
      h5PaddingRight={h5PaddingRight}

      h6FontSize={h6FontSize}
      h6FontFamily={h6FontFamily}
      h6Position={h6Position}
      h6Bold={h6Bold}
      h6Italic={h6Italic}
      h6LetterSpacing={h6LetterSpacing}
      h6Color={h6Color}
      h6LineHeight={h6LineHeight}
      h6TextTransform={h6TextTransform}
      h6PaddingTop={h6PaddingTop}
      h6PaddingBottom={h6PaddingBottom}
      h6PaddingLeft={h6PaddingLeft}
      h6PaddingRight={h6PaddingRight}
    />
  );
}

export default HeadlinesStyles;
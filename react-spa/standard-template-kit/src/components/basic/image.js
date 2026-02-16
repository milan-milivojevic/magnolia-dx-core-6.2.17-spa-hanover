import React, { useState, useEffect } from 'react';
import { getAPIBase } from "../../helpers/AppHelpers";
import styled from 'styled-components';

const Wrapper = styled.div`
  figure:hover {
    background-color: ${(props) => props.figureHovBgColor && props.figureHovBgColor + "!important"};
  }
  img:hover {
    background-color: ${(props) => props.imgHovBgColor && props.imgHovBgColor + "!important"};
  }
`;

function Image({ 
    image,
    imageCaption,
    imagePosition,
    imageFit,
    imageWidth,
    imageHeight,
    imageBorderColor,
    imageBorderWidth,
    imageBorderStyle,
    imageBorderRadius,
    imagePaddingTop,
    imagePaddingRight,
    imagePaddingBottom,
    imagePaddingLeft,
    imageDefaultBackColor,
    imageHoverBackColor,
    imageCaptionColor,
    imageCaptionLineHeight,
    imageCaptionFontSize,
    imageCaptionPosition,
    imageWrapperPosition,
    imageWrapperBorderColor,
    imageWrapperBorderWidth,
    imageWrapperBorderStyle,
    imageWrapperBorderRadius,
    imageWrapperPaddingTop,
    imageWrapperPaddingRight,
    imageWrapperPaddingBottom,
    imageWrapperPaddingLeft,
    imageWrapperDefaultBackColor,
    imageWrapperHoverBackColor,
    styleName,
    noStyles
}) {

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;  

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/imageComponents/@nodes`)
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
  
  const imgDefBgColor = imageDefaultBackColor || configProps?.imageDefaultBackColor || null;
  const imgHovBgColor = imageHoverBackColor || configProps?.imageHoverBackColor || imgDefBgColor;

  const figureDefBgColor = imageWrapperDefaultBackColor || configProps?.imageWrapperDefaultBackColor || null;
  const figureHovBgColor = imageWrapperHoverBackColor || configProps?.imageWrapperHoverBackColor || figureDefBgColor; 
  
  const figureStyles = {
    alignItems:  imageWrapperPosition || configProps?.imageWrapperPosition || null,
    borderColor: imageWrapperBorderColor || configProps?.imageWrapperBorderColor || null,
    borderWidth: imageWrapperBorderWidth || configProps?.imageWrapperBorderWidth || null,
    borderStyle: imageWrapperBorderStyle || configProps?.imageWrapperBorderStyle || null,
    borderRadius: imageWrapperBorderRadius || configProps?.imageWrapperBorderRadius || null,
    paddingTop: imageWrapperPaddingTop || configProps?.imageWrapperPaddingTop || null,
    paddingRight: imageWrapperPaddingRight || configProps?.imageWrapperPaddingRight || null,
    paddingBottom: imageWrapperPaddingBottom || configProps?.imageWrapperPaddingBottom || null,
    paddingLeft: imageWrapperPaddingLeft || configProps?.imageWrapperPaddingLeft || null,
    backgroundColor: figureDefBgColor
  }

  const imageStyles = {
    objectPosition:  imagePosition || configProps?.imagePosition || null,
    objectFit: imageFit || configProps?.imageFit || null,
    width: imageWidth || configProps?.imageWidth || null,
    height: imageHeight || configProps?.imageHeight || null,
    borderColor: imageBorderColor || configProps?.imageBorderColor || null,
    borderWidth: imageBorderWidth || configProps?.imageBorderWidth || null,
    borderStyle: imageBorderStyle || configProps?.imageBorderStyle || null,
    borderRadius: imageBorderRadius || configProps?.imageBorderRadius || null,
    paddingTop: imagePaddingTop || configProps?.imagePaddingTop || null,
    paddingRight: imagePaddingRight || configProps?.imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || configProps?.imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || configProps?.imagePaddingLeft || null,
    backgroundColor: imgDefBgColor
  }

  const figureCaptionStyles = {
    textAlign:  imageCaptionPosition || configProps?.imageCaptionPosition || null,
    color: imageCaptionColor || configProps?.imageCaptionColor || null,
    fontSize: imageCaptionFontSize || configProps?.imageCaptionFontSize || null,
    lineHeight: imageCaptionLineHeight || configProps?.imageCaptionLineHeight || null,
    width: "100%"
  }

  return (
    <Wrapper className='imageWrapper'
      imgHovBgColor={imgHovBgColor}
      figureHovBgColor={figureHovBgColor}  
    >
      <figure style={figureStyles} >
        <img className="image" src={image['@link']} alt="" style={imageStyles} />
        <figcaption style={figureCaptionStyles}>
          {imageCaption || null}
        </figcaption>
      </figure>
    </Wrapper>
  )
}

export default Image;
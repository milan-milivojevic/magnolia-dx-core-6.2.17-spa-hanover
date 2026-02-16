import React, { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  figure:hover {
    background-color: ${(props) => props.figureHovBgColor && props.figureHovBgColor + "!important"};
  }
  img:hover {
    background-color: ${(props) => props.imgHovBgColor && props.imgHovBgColor + "!important"};
  }
`;

function ImageConfig ({ 
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
    styleName
}) {
  
  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  const imgDefBgColor = imageDefaultBackColor || null;
  const imgHovBgColor = imageHoverBackColor || imgDefBgColor;

  const figureDefBgColor = imageWrapperDefaultBackColor || null;  
  const figureHovBgColor = imageWrapperHoverBackColor || figureDefBgColor;
  
  const figureStyles = {
    alignItems:  imageWrapperPosition || null,
    borderColor: imageWrapperBorderColor || null,
    borderWidth: imageWrapperBorderWidth || null,
    borderStyle: imageWrapperBorderStyle || null,
    borderRadius: imageWrapperBorderRadius || null,
    paddingTop: imageWrapperPaddingTop || null,
    paddingRight: imageWrapperPaddingRight || null,
    paddingBottom: imageWrapperPaddingBottom || null,
    paddingLeft: imageWrapperPaddingLeft || null,
    backgroundColor: figureDefBgColor
  }

  const imageStyles = {
    objectPosition:  imagePosition || null,
    objectFit: imageFit || null,
    width: imageWidth || null,
    height: imageHeight || null,
    borderColor: imageBorderColor || null,
    borderWidth: imageBorderWidth || null,
    borderStyle: imageBorderStyle || null,
    borderRadius: imageBorderRadius || null,
    paddingTop: imagePaddingTop || null,
    paddingRight: imagePaddingRight || null,
    paddingBottom: imagePaddingBottom || null,
    paddingLeft: imagePaddingLeft || null,
    backgroundColor: imgDefBgColor
  }

  const figureCaptionStyles = {
    textAlign:  imageCaptionPosition || null,
    color: imageCaptionColor || null,
    fontSize: imageCaptionFontSize || null,
    lineHeight: imageCaptionLineHeight || null,
    width: "100%"
  }

  return (
    <Wrapper className='imageWrapper configComponents' 
      imgHovBgColor={imgHovBgColor} 
      figureHovBgColor={figureHovBgColor}
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyAccText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <figure style={figureStyles} >
        <img className="image" src={image['@link']} alt="" style={imageStyles} />
        <figcaption style={figureCaptionStyles}>
          {imageCaption || null}
        </figcaption>
      </figure>
    </Wrapper>
  )
}

export default ImageConfig;
import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../../images/home/ArrowsIcon.svg';

const Wrapper = styled.div`
  .textComponent:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
`;

function TextConfig ({
  headline,   
  headlineLevel,
  headlineFontFamily,
  headlinePosition,
  headlineTextTransform,
  addArrows,
  arrowsHeight,
  headlineFontSize,
  headlineLineHeight,
  headlineItalic,
  headlineBold,
  headlineLetterSpacing,
  headlineColor,
  headlinePaddingTop,
  headlinePaddingRight,
  headlinePaddingBottom,
  headlinePaddingLeft,
  description,
  descriptionStyle,
  descriptionColor,
  descriptionAlign,
  descriptionPaddingTop,
  descriptionPaddingRight,
  descriptionPaddingBottom,
  descriptionPaddingLeft,
  descriptionBorderRadius,
  descriptionBorderColor,
  descriptionBorderStyle,
  descriptionBorderWidth,
  wrapperPaddingTop,
  wrapperPaddingRight,
  wrapperPaddingBottom,
  wrapperPaddingLeft,
  wrapperDefaultBackColor,
  wrapperHoverBackColor,
  wrapperBorderColor,
  wrapperBorderWidth,
  wrapperBorderStyle,
  wrapperBorderRadius,
  wrapperWidth,
  wrapperHeight,
  wrapperPosition,
  styleName
}) {
  
  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const HeadlineLevel = headlineLevel || "h1";
  
  const defBgColor = wrapperDefaultBackColor || null;
  const hovBgColor = wrapperHoverBackColor || defBgColor;

  const textComponentStyles = {
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,    
    backgroundColor: defBgColor,
    borderColor: wrapperBorderColor || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderRadius: wrapperBorderRadius || null,
    maxWidth: wrapperWidth || null,
    height: wrapperHeight || null,
    margin: wrapperPosition || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || null,
    textAlign:  headlinePosition || null,
    fontSize: headlineFontSize || null,
    lineHeight: headlineLineHeight || null,
    color: headlineColor || null,
    letterSpacing:  headlineLetterSpacing || null,
    fontWeight: headlineBold || null,
    fontStyle: headlineItalic || null,
    textTransform: headlineTextTransform || null,
    paddingTop: headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || null
  }

  const descriptionStyles = {
    paddingTop: descriptionPaddingTop || null,
    paddingRight: descriptionPaddingRight || null,
    paddingBottom: descriptionPaddingBottom || null,
    paddingLeft: descriptionPaddingLeft || null,
    borderColor: descriptionBorderColor || null,
    borderWidth: descriptionBorderWidth || null,
    borderStyle: descriptionBorderStyle || null,
    borderRadius: descriptionBorderRadius || null,
    textAlign: descriptionAlign || null,
    color: descriptionColor || null
  }

  const addArrowsVar = addArrows || "false";
  const arrowsHeightVar = { height: arrowsHeight || null };
  
  return (
    <Wrapper className='textWrapper configComponents'
      hovBgColor={hovBgColor} 
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>  
      <div className='textComponent'style={textComponentStyles} >
        {headline &&
          <HeadlineLevel className="headline" style={headlineStyles}>
            <span className='customHeadlineArrows' style={arrowsHeightVar}>
              {(addArrowsVar !== "false" || false) && <ArrowsIcon/>}
            </span>{headline || null}
          </HeadlineLevel>
        }  
        {description &&
          <div className={`description ${descriptionStyle}`} 
               dangerouslySetInnerHTML={{ __html:description || null }} 
               style={descriptionStyles}
          ></div>
        }
      </div>
    </Wrapper>
  )
}

export default TextConfig;

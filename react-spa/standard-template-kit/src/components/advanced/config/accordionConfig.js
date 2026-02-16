import React, { useRef, useState } from "react";
import { EditableArea } from "@magnolia/react-editor";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styled from 'styled-components';

const Wrapper = styled.div`
  .accordion .item > .title: hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
    color: ${(props) => props.hoverTitleColor && props.hoverTitleColor + "!important"};
  }
  .accordion .item > .title:hover svg { 
    color: ${(props) => props.hoverChevronColor && props.hoverChevronColor + "!important"};
  }
`

function Accordion ({
  accordionComponents,
  title,
  titleLevel,
  titleFontFamily,
  titleFontSize,
  titleLineHeight,
  titleColor,
  titleHoverColor,
  chevronColor,
  chevronHoverColor,
  chevronFontSize,    
  accordionInnerPaddingTop,
  accordionInnerPaddingRight,
  accordionInnerPaddingBottom,
  accordionInnerPaddingLeft,
  accordionOuterPaddingTop,
  accordionOuterPaddingRight,
  accordionOuterPaddingBottom,
  accordionOuterPaddingLeft,
  accordionDefaultBackColor,
  accordionHoverBackColor,
  width,
  position,
  accordionBorderWidth,
  accordionBorderStyle,
  accordionBorderColor,
  accordionBorderRadius,
  styleName
}) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  const HeadlineLevel = titleLevel || "h3";

  const defBgColor = accordionDefaultBackColor || null;    
  const hovBgColor = accordionHoverBackColor || defBgColor;

  const defTitleColor = titleColor || null; 
  const hoverTitleColor = titleHoverColor || defTitleColor;

  const defChevronColor = chevronColor || null;    
  const hoverChevronColor = chevronHoverColor || defChevronColor;
  
  const itemStyles = {
    paddingTop: accordionOuterPaddingTop || null,
    paddingRight: accordionOuterPaddingRight || null,
    paddingBottom: accordionOuterPaddingBottom || null,
    paddingLeft: accordionOuterPaddingLeft || null,
    width: width || "100%"
  }

  const titleStyles = {
    fontFamily: titleFontFamily || null,
    paddingTop: accordionInnerPaddingTop || null,
    paddingRight: accordionInnerPaddingRight || null,
    paddingBottom: accordionInnerPaddingBottom || null,
    paddingLeft: accordionInnerPaddingLeft || null,
    borderWidth: accordionBorderWidth || null,
    borderStyle: accordionBorderStyle || null,
    borderColor: accordionBorderColor || null,
    borderRadius: accordionBorderRadius || null,
    fontSize: titleFontSize || null,
    lineHeight: titleLineHeight || null,
    color: defTitleColor,
    backgroundColor: defBgColor
  }

  const chevronStyles = {
    fontSize: chevronFontSize || null,
    color: defChevronColor || null
  }

  return (
    <Wrapper className="accordionWrapper configComponents"
      hovBgColor={hovBgColor}
      hoverChevronColor={hoverChevronColor}
      hoverTitleColor={hoverTitleColor}
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className="accordion" style={{justifyContent: position || "center"}}>
        <div className="item" style={itemStyles}>
          <HeadlineLevel className="title" onClick={() => toggle()} style={titleStyles}>
            {title} 
            {open ?
              <BsChevronUp style={chevronStyles}/> :
              <BsChevronDown style={chevronStyles}/>
            }
          </HeadlineLevel>
          <div className={open ? 'content show' : 'content hide'}>
            {accordionComponents ? <EditableArea className='accordionArea' content={accordionComponents} /> : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Accordion;

import React, { useState } from "react";
import { EditableArea } from "@magnolia/react-editor";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styled from 'styled-components';

const Wrapper = styled.div`
  .title: hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
    color: ${(props) => props.hoverTitleColor && props.hoverTitleColor + "!important"};
  }
  .title:hover svg { 
    color: ${(props) => props.hoverChevronColor && props.hoverChevronColor + "!important"};
  }
`

function AccordionItem ({
  accordionComponents,
  title,
  accordionListProps
}) {

  const listProps = [...accordionListProps];

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  const HeadlineLevel = listProps[0].titleLevel || "h3";

  const defBgColor = listProps[0].accordionDefaultBackColor || null;
  const hovBgColor = listProps[0].accordionHoverBackColor || defBgColor;

  const defTitleColor = listProps[0].titleColor || null; 
  const hoverTitleColor = listProps[0].titleHoverColor || defTitleColor;

  const defChevronColor = listProps[0].chevronColor || null;    
  const hoverChevronColor = listProps[0].chevronHoverColor || defChevronColor;

  const accordionItemWrapperStyles = {
    paddingBottom: listProps[0].horizontalGap || null,
    width: listProps[0].groupWidth || "100%"
  }

  const titleStyles = {
    fontFamily: listProps[0].titleFontFamily || null,
    paddingTop: listProps[0].accordionInnerPaddingTop || null,
    paddingRight: listProps[0].accordionInnerPaddingRight || null,
    paddingBottom: listProps[0].accordionInnerPaddingBottom || null,
    paddingLeft: listProps[0].accordionInnerPaddingLeft || null,
    borderWidth: listProps[0].accordionBorderWidth || null,
    borderStyle: listProps[0].accordionBorderStyle || null,
    borderColor: listProps[0].accordionBorderColor || null,
    borderRadius: listProps[0].accordionBorderRadius || null,
    fontSize: listProps[0].titleFontSize || null,
    lineHeight: listProps[0].titleLineHeight || null,
    color: defTitleColor,
    backgroundColor: defBgColor
  }

  const chevronStyles = {
    fontSize: listProps[0].chevronFontSize || null,
    color: defChevronColor
  }  

  return (
    <Wrapper className="accordionItemWrapper" style={accordionItemWrapperStyles}
      hovBgColor={hovBgColor}
      hoverChevronColor={hoverChevronColor}
      hoverTitleColor={hoverTitleColor}
    >
      <div className="accordion">
        <div className="item">
          <HeadlineLevel className="title" onClick={() => toggle()} style={titleStyles}>
            {title} 
            {open ?
              <BsChevronUp style={chevronStyles}/> :
              <BsChevronDown style={chevronStyles}/>
            }
          </HeadlineLevel>
          <div style={{paddingTop: listProps[0].horizontalGap || null}} className={open ? 'content show' : 'content hide'}>
            {accordionComponents && <EditableArea className='accordionArea' content={accordionComponents} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AccordionItem;

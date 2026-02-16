import React, { useState, useEffect, useRef } from 'react';
import AccordionItem from '../../grouping/helper/accordionItem';
import { getAPIBase } from '../../../helpers/AppHelpers';

function AccordionListConfig ({  
  multi,
  accordionComponents1,
  accordionComponents2,
  accordionComponents3,
  accordionComponents4,
  accordionComponents5,
  accordionComponents6,
  accordionComponents7,
  accordionComponents8,
  accordionComponents9,
  accordionComponents10,
  accordionComponents11,
  accordionComponents12,
  accordionComponents13,
  accordionComponents14,
  accordionComponents15,
  accordionComponents16,
  accordionComponents17,
  accordionComponents18,
  accordionComponents19,
  accordionComponents20,
  groupPaddingTop,
  groupPaddingRight,
  groupPaddingBottom,
  groupPaddingLeft,
  horizontalGap,
  groupWidth,
  groupPosition,
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
  accordionDefaultBackColor,
  accordionHoverBackColor,
  accordionBorderWidth,
  accordionBorderStyle,
  accordionBorderColor,
  accordionBorderRadius,
  styleName,
  accordionStyleName,
  accordionNoStyles
}) {
  
  /* Copy Style Name Functionality */

  const copyRef = useRef(null);

  const copyStyleName = () => {
    const copyText = copyRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  /* Getting Properties from AccordionConfig component */

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [accordionConfigProps, setAccordionConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Advanced-Config/accordionComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === accordionStyleName);
        if (!result && accordionNoStyles === (false || "false")) {
          result = data[0];
        } else if (accordionNoStyles !== (false || "false")) {
          result = null;
        } 
        setAccordionConfigProps(result);
      });
  }, [accordionStyleName, accordionNoStyles, apiBase, restPath, nodeName]);

  /* Creating titles & accordionComponents list which will be sent to AccordionItem component */

  const titles = [];
  for (let i = 0; i <= 20; i++) {
    titles.push(multi[`multi${i}`]?.title);
  }
  const accordionComponents = [accordionComponents1, accordionComponents2, accordionComponents3, accordionComponents4, accordionComponents5, accordionComponents6, accordionComponents7, accordionComponents8, accordionComponents9, accordionComponents10, accordionComponents11, accordionComponents12, accordionComponents13, accordionComponents14, accordionComponents15, accordionComponents16, accordionComponents17, accordionComponents18, accordionComponents19, accordionComponents20];


  /* Properties to send to the AcordionItem component */

  const accordionListProps = [{
    accordionInnerPaddingTop: accordionInnerPaddingTop || accordionConfigProps?.accordionInnerPaddingTop || null,
    accordionInnerPaddingRight: accordionInnerPaddingRight || accordionConfigProps?.accordionInnerPaddingRight || null,
    accordionInnerPaddingBottom: accordionInnerPaddingBottom || accordionConfigProps?.accordionInnerPaddingBottom || null,
    accordionInnerPaddingLeft: accordionInnerPaddingLeft || accordionConfigProps?.accordionInnerPaddingLeft || null,
    titleLevel: titleLevel || accordionConfigProps?.titleLevel || null,
    titleFontFamily: titleFontFamily || titleFontFamily?.titleFontSize || null,
    titleFontSize: titleFontSize || accordionConfigProps?.titleFontSize || null,
    titleLineHeight: titleLineHeight || accordionConfigProps?.titleLineHeight || null,
    titleColor: titleColor || accordionConfigProps?.titleColor || null,
    titleHoverColor: titleHoverColor || accordionConfigProps?.titleHoverColor || null,
    chevronColor: chevronColor || accordionConfigProps?.chevronColor || null,
    chevronHoverColor: chevronHoverColor || accordionConfigProps?.chevronHoverColor || null,
    chevronFontSize: chevronFontSize || accordionConfigProps?.chevronFontSize || null,
    horizontalGap: horizontalGap || accordionConfigProps?.horizontalGap || null,
    accordionDefaultBackColor: accordionDefaultBackColor || accordionConfigProps?.accordionDefaultBackColor || null,
    accordionHoverBackColor: accordionHoverBackColor || accordionConfigProps?.accordionHoverBackColor || null,
    accordionBorderWidth: accordionBorderWidth || accordionConfigProps?.accordionBorderWidth || null,
    accordionBorderStyle: accordionBorderStyle || accordionConfigProps?.accordionBorderStyle || null,
    accordionBorderColor: accordionBorderColor || accordionConfigProps?.accordionBorderColor || null,
    accordionBorderRadius: accordionBorderRadius || accordionConfigProps?.accordionBorderRadius || null,
    groupWidth: groupWidth || null
  }] 

  const accordionListStyles = {
    paddingTop: groupPaddingTop || null,
    paddingRight: groupPaddingRight || null,
    paddingBottom: groupPaddingBottom || null,
    paddingLeft: groupPaddingLeft || null,
    alignItems: groupPosition || null
  }

  return (
    <div className='accordionListWrapper configComponents'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={copyRef}>{styleName || null}</span></h3>
        <button onClick={copyStyleName}>
          Copy Style Name
        </button>
      </div>
      <section className={`accordionList`}style={accordionListStyles}> 
        {titles.map((title, i) => title ?
          <AccordionItem key={i} title={title} accordionListProps={accordionListProps} accordionComponents={accordionComponents[i]}></AccordionItem> : null
        )}        
      </section>
    </div>
  );
}

export default AccordionListConfig;
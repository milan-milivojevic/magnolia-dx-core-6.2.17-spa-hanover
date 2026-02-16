import React, { useState, useEffect } from 'react';
import AccordionItem from '../grouping/helper/accordionItem';
import { getAPIBase } from '../../helpers/AppHelpers';

function AccordionList ({  
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
  noStyles,
  accordionStyleName,
  accordionNoStyles
}) {

  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Grouping-Config/accordionListComponents/@nodes`)
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
  

  const [accordionConfigProps, setAccordionConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Advanced-Config/accordionComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  accordionStyleName || configProps?.accordionStyleName || null;
        let result = data.find(item => item.styleName === styleName);
        if (!result && accordionNoStyles === (false || "false")) {
          result = data[0];
        } else if (accordionNoStyles !== (false || "false")) {
          result = null;
        } 
        setAccordionConfigProps(result);
      });
  }, [accordionStyleName, accordionNoStyles, configProps?.accordionStyleName, apiBase, restPath, nodeName]);

  const titles = [];
  for (let i = 0; i <= 20; i++) {
    titles.push(multi[`multi${i}`]?.title);
  }
  const accordionComponents = [accordionComponents1, accordionComponents2, accordionComponents3, accordionComponents4, accordionComponents5, accordionComponents6, accordionComponents7, accordionComponents8, accordionComponents9, accordionComponents10, accordionComponents11, accordionComponents12, accordionComponents13, accordionComponents14, accordionComponents15, accordionComponents16, accordionComponents17, accordionComponents18, accordionComponents19, accordionComponents20];
  

  const accordionListProps = [{
    accordionInnerPaddingTop: accordionInnerPaddingTop || configProps?.accordionInnerPaddingTop || accordionConfigProps?.accordionInnerPaddingTop || null,
    accordionInnerPaddingRight: accordionInnerPaddingRight || configProps?.accordionInnerPaddingRight || accordionConfigProps?.accordionInnerPaddingRight || null,
    accordionInnerPaddingBottom: accordionInnerPaddingBottom || configProps?.accordionInnerPaddingBottom || accordionConfigProps?.accordionInnerPaddingBottom || null,
    accordionInnerPaddingLeft: accordionInnerPaddingLeft || configProps?.accordionInnerPaddingLeft || accordionConfigProps?.accordionInnerPaddingLeft || null,
    titleLevel: titleLevel || configProps?.titleLevel || accordionConfigProps?.titleLevel || null,
    titleFontFamily: titleFontFamily || configProps?.titleFontFamily || accordionConfigProps?.titleFontFamily || null,
    titleFontSize: titleFontSize || configProps?.titleFontSize || accordionConfigProps?.titleFontSize || null,
    titleLineHeight: titleLineHeight || configProps?.titleLineHeight || accordionConfigProps?.titleLineHeight || null,
    titleColor: titleColor || configProps?.titleColor || accordionConfigProps?.titleColor || null,
    titleHoverColor: titleHoverColor || configProps?.titleHoverColor || accordionConfigProps?.titleHoverColor || null,
    chevronColor: chevronColor || configProps?.chevronColor || accordionConfigProps?.chevronColor || null,
    chevronHoverColor: chevronHoverColor || configProps?.chevronHoverColor || accordionConfigProps?.chevronHoverColor || null,
    chevronFontSize: chevronFontSize || configProps?.chevronFontSize || accordionConfigProps?.chevronFontSize || null,
    horizontalGap: horizontalGap || configProps?.horizontalGap || accordionConfigProps?.horizontalGap || null,
    accordionDefaultBackColor: accordionDefaultBackColor || configProps?.accordionDefaultBackColor || accordionConfigProps?.accordionDefaultBackColor || null,
    accordionHoverBackColor: accordionHoverBackColor || configProps?.accordionHoverBackColor || accordionConfigProps?.accordionHoverBackColor || null,
    accordionBorderWidth: accordionBorderWidth || configProps?.accordionBorderWidth || accordionConfigProps?.accordionBorderWidth || null,
    accordionBorderStyle: accordionBorderStyle || configProps?.accordionBorderStyle || accordionConfigProps?.accordionBorderStyle || null,
    accordionBorderColor: accordionBorderColor || configProps?.accordionBorderColor || accordionConfigProps?.accordionBorderColor || null,
    accordionBorderRadius: accordionBorderRadius || configProps?.accordionBorderRadius || accordionConfigProps?.accordionBorderRadius || null,
    groupWidth: groupWidth || configProps?.groupWidth || null
  }]
  
  const accordionListStyles = {
    paddingTop: groupPaddingTop || configProps?.groupPaddingTop || null,
    paddingRight: groupPaddingRight || configProps?.groupPaddingRight || null,
    paddingBottom: groupPaddingBottom || configProps?.groupPaddingBottom || null,
    paddingLeft: groupPaddingLeft || configProps?.groupPaddingLeft || null,
    alignItems: groupPosition || configProps?.groupPosition || null
  }
  
  return (
    <div className='accordionListWrapper'> 
      <section className={`accordionList`} style={accordionListStyles}> 
        {titles.map((title, i) => title ?
          <AccordionItem key={i} title={title} accordionListProps={accordionListProps} accordionComponents={accordionComponents[i]}></AccordionItem> : null
        )}        
      </section>
    </div>
  );
}

export default AccordionList;

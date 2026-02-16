import React, { useState, useEffect } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import { getAPIBase } from '../../helpers/AppHelpers';
import styled from 'styled-components';

const Wrapper = styled.div`
  .tab:hover {
    background-color: ${(props) => props.hovTabBgColor && props.hovTabBgColor + "!important"};
    color: ${(props) => props.hovTitleColor && props.hovTitleColor + "!important"};
  }
  .tab.activeTab { 
    background-color: ${(props) => props.activeTabBgColor && props.activeTabBgColor + "!important"};
	color: ${(props) => props.activeTitleColor && props.activeTitleColor + "!important"};
  }
`

function Tabs({
	multi,
	tabsComponents1,
	tabsComponents2,
	tabsComponents3,
	tabsComponents4,
	tabsComponents5,
	tabsComponents6,
	tabsComponents7,
	tabsComponents8,
	tabsComponents9,
	tabsComponents10,
	groupPaddingTop,
	groupPaddingRight,
	groupPaddingBottom,
	groupPaddingLeft,	
	groupPosition,
	groupWidth,
	tabsDefaultBackColor,
	tabsHoverBackColor,
	tabsActiveBackColor,
	titleFontSize,
	titleLineHeight,
	titleLetterSpacing,
	titleColor,
	titleHoverColor,
	titleActiveColor,
	titlePosition,
	titleFontFamily,
	titleLevel,
	titleBold,
	titleItalic,
	titlePaddingTop,
	titlePaddingRight,
	titlePaddingBottom,
	titlePaddingLeft,
	tabsBorderWidth,
	tabsBorderStyle,
	tabsBorderColor,
	tabsBorderRadius,
	tabsGap,
	tabsWidth,
	tabsLayout,
	styleName,
    noStyles
}) {

	const apiBase = getAPIBase();
	const restPath = process.env.REACT_APP_MGNL_API_PAGES;
	const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

	const [configProps, setConfigProps] = useState();

	useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Grouping-Config/tabsComponents/@nodes`)
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

	const [activeTab, setActiveTab] = useState(() => {
		if (window.sessionStorage.getItem('activeTab') !== null || 'undefined') {		
			return (JSON.parse(window.sessionStorage.getItem("activeTab")) || 1 );
		} else {
			return 1;
		}
	});

	const toggleTab = (index) => {
		setActiveTab(index);
	}

	useEffect(() => {
		window.sessionStorage.setItem("activeTab", activeTab);
	}, [activeTab]);
	
	useEffect(() => {
		setActiveTab(JSON.parse(window.sessionStorage.getItem("activeTab")));
	}, []);

	const titles = [];
	for (let i = 0; i <= 10; i++) {
		titles.push(multi[`multi${i}`]?.title);
	}
	const activeTitles = titles.filter((item) => {
		return item !== undefined;
	})

	const tabsComponents = [tabsComponents1, tabsComponents2, tabsComponents3, tabsComponents4, tabsComponents5, tabsComponents6, tabsComponents7, tabsComponents8, tabsComponents9, tabsComponents10];
	const activeTabsComponents = [];

	titles.forEach((item, i) => {
		if (item) {
			activeTabsComponents.push(tabsComponents[i]);
		}
	})

	const HeadlineLevel = titleLevel || configProps?.titleLevel || "h3";

	
	const defTabBgColor = tabsDefaultBackColor || configProps?.tabsDefaultBackColor || null;
	const hovTabBgColor = tabsHoverBackColor || configProps?.tabsHoverBackColor || defTabBgColor;
	const activeTabBgColor = tabsActiveBackColor || configProps?.tabsActiveBackColor || defTabBgColor;

	const defTitleColor = titleColor || configProps?.titleColor || null;
	const hovTitleColor = titleHoverColor || configProps?.titleHoverColor || defTitleColor;
	const activeTitleColor = titleActiveColor || configProps?.titleActiveColor || defTitleColor;	

	const tabsGroupStyles = {
		width: groupWidth || configProps?.groupWidth || null,
		margin: groupPosition || configProps?.groupPosition || null,
		paddingTop: groupPaddingTop || configProps?.groupPaddingTop || null,
		paddingRight: groupPaddingRight || configProps?.groupPaddingRight || null,
		paddingBottom: groupPaddingBottom || configProps?.groupPaddingBottom ||  null,
		paddingLeft: groupPaddingLeft || configProps?.groupPaddingLeft || null
	}

	const tabTitlesStyles = {		
		gap: tabsGap || configProps?.tabsGap || null,			
		borderBottomWidth: tabsBorderWidth || configProps?.tabsBorderWidth || null,
		borderBottomStyle: tabsBorderStyle || configProps?.tabsBorderStyle || null,
		borderBottomColor: tabsBorderColor || configProps?.tabsBorderColor || null
	}

	return (
		<Wrapper className='tabsWrapper configComponents'
			hovTabBgColor={hovTabBgColor}
			activeTabBgColor={activeTabBgColor}
			hovTitleColor={hovTitleColor}
			activeTitleColor={activeTitleColor}
		>
			<section className={`tabsGroup`} style={tabsGroupStyles}>
				<div className={`tabTitles`} style={tabTitlesStyles}>
					{activeTitles.map((title, i) =>
						<HeadlineLevel onClick={() => toggleTab(i + 1)} key={i} className={activeTab === i + 1 ? `tab activeTab` : `tab`} 
							style={{
											flex: tabsWidth || configProps?.tabsWidth || "auto",
											paddingTop: titlePaddingTop || configProps?.titlePaddingTop || null,
											paddingRight: titlePaddingRight || configProps?.titlePaddingRight || null,
											paddingBottom: titlePaddingBottom || configProps?.titlePaddingBottom || null,
											paddingLeft: titlePaddingLeft || configProps?.titlePaddingLeft || null,
											fontSize: titleFontSize || configProps?.titleFontSize || null,
											lineHeight: titleLineHeight || configProps?.titleLineHeight || null,
											letterSpacing: titleLetterSpacing || configProps?.titleLetterSpacing || null,
											fontFamily: titleFontFamily || configProps?.titleFontFamily || null,
											textAlign: titlePosition || configProps?.titlePosition || null,
											fontWeight: titleBold || configProps?.titleBold || null,
											fontStyle: titleItalic || configProps?.titleItalic || null,                 
											color: defTitleColor,
											backgroundColor: defTabBgColor,
											borderWidth: activeTab === i + 1 ? tabsBorderWidth || configProps?.tabsBorderWidth || null : null,
											borderStyle: activeTab === i + 1 ? tabsBorderStyle || configProps?.tabsBorderStyle || null : null,
											borderColor: activeTab === i + 1 ? tabsBorderColor || configProps?.tabsBorderColor || null : null,
											borderTopRightRadius: tabsBorderRadius || configProps?.tabsBorderRadius || null,
											borderTopLeftRadius: tabsBorderRadius || configProps?.tabsBorderRadius || null,
											borderBottom: activeTab === i + 1 ? "0" : null,
											marginBottom: activeTab === i + 1 ? '-' + (tabsBorderWidth || configProps?.tabsBorderWidth || null) : null
										}}
						>{title}</HeadlineLevel>
					)}
				</div>
				<div className={`tabsContent`}>
					{activeTabsComponents.map((tabComponents, i) =>
						<div key={i} className={activeTab === i + 1 ? `tabContent tabActiveContent` : `tabContent`}>
							{tabComponents !== undefined ? <EditableArea className={`tabsArea`} content={tabComponents} /> : null}
						</div>
					)}
				</div>
			</section>
		</Wrapper>
	);
}

export default Tabs;

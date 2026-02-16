import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../../images/home/DownloadIcon.svg';

function findNodeById(node, targetId) {
  if (!node || typeof node !== 'object') return null;

  if (node['@id'] === targetId) {
    return node;
  }

  if (node['@nodes'] && Array.isArray(node['@nodes'])) {
    // @nodes je polje stringova koji su imena children čvorova
    for (const childName of node['@nodes']) {
      // Svaki child je node[childName]
      const found = findNodeById(node[childName], targetId);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

const Wrapper = styled.div`
  .textLink:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
  }
  .link:hover {
    background-color: ${(props) => props.hovLinkBgColor && props.hovLinkBgColor + "!important"};
    color: ${(props) => props.hovLabelColor && props.hovLabelColor + "!important"};
    border-color: ${(props) => props.hovLinkBorderColor && props.hovLinkBorderColor + "!important"};
  }
  .link svg { 
    color: ${(props) => props.defChevronColor && props.defChevronColor + "!important"};
  }
  .link:hover svg { 
    color: ${(props) => props.hovChevronColor && props.hovChevronColor + "!important"};
  }
}`

function TextLinkConfig ({
    headline,   
    headlineLevel,
    headlineFontFamily,
    headlinePosition,
    addArrows,
    arrowsHeight,
    headlineTextTransform,
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
    descriptionAlign,
    descriptionStyle,
    descriptionColor,
    descriptionPaddingTop,
    descriptionPaddingRight,
    descriptionPaddingBottom,
    descriptionPaddingLeft,
    descriptionBorderRadius,
    descriptionBorderColor,
    descriptionBorderStyle,
    descriptionBorderWidth,
    linkType,
    page,
    external,
    download,
    linkLabel,
    linkLocation,
    linkPaddingTop,
    linkPaddingRight,
    linkPaddingBottom,
    linkPaddingLeft,
    labelDefaultColor,
    labelHoverColor,
    linkDefaultBackColor,
    linkHoverBackColor,
    linkBorderColor,
    linkBorderHoverColor,
    linkBorderWidth,
    linkBorderStyle,
    linkBorderRadius,
    linkWidth,
    linkHeight,
    linkIcon,
    linkLabelDecoration,
    linkLabelVerticalPosition,
    linkLabelHorizontalPosition,
    linkLabelFontSize,
    linkFontFamily,
    linkLabelLineHeight,
    labelPaddingTop,
    labelPaddingBottom,
    labelPaddingRight,
    labelPaddingLeft,
    linkBold,
    linkItalic,
    chevronDefaultColor,
    chevronHoverColor,
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
    descLinkLayout,
    descRowLayoutWidth,
    linkRowLayoutWidth,
    descLinkGap,
    descLinkPosition,
    linkHorizontalPosition,
    linkVerticalPosition,
    linkStyleName,
    linkNoStyles,
    styleName,
  }) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    
  
  const [linkConfigProps, setLinkConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/linkComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data.find(item => item.styleName === linkStyleName);
        if (!result && linkNoStyles === (false || "false")) {
          result = data[0];
        } else if (linkNoStyles !== (false || "false")) {
          result = null;
        } 
        setLinkConfigProps(result);
      });
  }, [linkStyleName, linkNoStyles, apiBase, restPath, nodeName]);

  // ---------------- LOGIKA ZA "page" MOŽE BITI UUID ILI PATH ----------------
  // Čuvat ćemo konačni path koji želimo koristiti, npr. /Home/... 
  const [resolvedPath, setResolvedPath] = useState(page);

  useEffect(() => {
    if (linkType !== 'page') return;

    // Ako page nije UUID, znači već je path => postavi ga takvog
    if (!isUuid(page)) {
      setResolvedPath(page);
      return;
    }

    // Ako je UUID, fetch-amo navigaciju i pronađemo ga
    async function resolveUuidToPath() {
      try {
        const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
        const response = await fetch(url);
        const data = await response.json();

        const foundNode = findNodeById(data, page);
        if (foundNode && foundNode['@path']) {
          setResolvedPath(foundNode['@path']);
        } else {
          // Ako nije pronađen, fallback
          setResolvedPath(page);
        }
      } catch (e) {
        console.error('Greška prilikom dohvata navigacije ili kod traženja čvora:', e);
        setResolvedPath(page);
      }
    }

    resolveUuidToPath();
  }, [page, linkType, apiBase]);

  const downloadLink = download ? download['@link'] : baseUrl;
  const href = linkType === "page"
    ? (getRouterBasename() + resolvedPath)
        .replace("//", "/")
        .replace("Home/Home", "Home")   // stara zamjena
    : linkType === "external"
      ? external
      : downloadLink;

  const HeadlineLevel = headlineLevel || "h1";  

  const defBgColor = wrapperDefaultBackColor || null;  
  const hovBgColor = wrapperHoverBackColor || defBgColor || null; 

  const defLabelColor = labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || linkConfigProps?.labelHoverColor || defLabelColor;

  const defLinkBgColor = linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || linkConfigProps?.linkHoverBackColor || defLinkBgColor;

  const defChevronColor = chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;

  const linkIcons = linkIcon || linkConfigProps?.linkIcon || "";

  const textLinkStyles = {
    paddingTop: wrapperPaddingTop ? wrapperPaddingTop : null,
    paddingRight: wrapperPaddingRight ? wrapperPaddingRight : null,
    paddingBottom: wrapperPaddingBottom ? wrapperPaddingBottom : null,
    paddingLeft: wrapperPaddingLeft ? wrapperPaddingLeft : null,    
    backgroundColor: defBgColor,
    borderColor: wrapperBorderColor ? wrapperBorderColor : null,
    borderWidth: wrapperBorderWidth ? wrapperBorderWidth : null,
    borderStyle: wrapperBorderStyle ? wrapperBorderStyle : null,
    borderRadius: wrapperBorderRadius ? wrapperBorderRadius : null
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

  const descriptionLinkWrapperStyles = { 
    flexDirection: descLinkLayout || "column",
    gap: descLinkGap || null,
    alignItems: descLinkPosition || null
  }

  const descriptionStyles = {
    width: descRowLayoutWidth || null,
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

  const linkComponentStyles = {
    width: linkRowLayoutWidth || null,
    paddingTop: linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null,
    justifyContent: linkHorizontalPosition || "flex-start",
    alignItems: linkHorizontalPosition || "flex-end"
  }

  const linkStyles = { 
    backgroundColor: defLinkBgColor,
    color: defLabelColor,
    paddingTop: labelPaddingTop || linkConfigProps?.labelPaddingTop || null,
    paddingRight: labelPaddingRight || linkConfigProps?.labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || linkConfigProps?.labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || linkConfigProps?.labelPaddingLeft || null, 
    borderColor: defLinkBorderColor,
    borderWidth: linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || linkConfigProps?.linkWidth || "max-content",
    height: linkHeight || linkConfigProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent:  linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems:  linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontFamily: linkFontFamily || linkConfigProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight:  linkBold || linkConfigProps?.linkBold || null,
    fontStyle:  linkItalic || linkConfigProps?.linkItalic || null
  }

  const addArrowsVar = addArrows || "false";
  const arrowsHeightVar = { height: arrowsHeight || null };

  return (
    <Wrapper className='textLinkWrapper configComponents'
      hovBgColor={hovBgColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className={`textLink flexColumn`} style={textLinkStyles}>
        {headline && 
          <HeadlineLevel className="headline" style={headlineStyles}>
            <span className='customHeadlineArrows' style={arrowsHeightVar}>
              {(addArrowsVar !== "false" || false) && <ArrowsIcon/>}
            </span>{headline || null}
          </HeadlineLevel>
        }   
        <div className='descriptionLinkWrapper flex' style={descriptionLinkWrapperStyles}>
          {description &&
            <div className={`description ${descriptionStyle || null}`} 
                 dangerouslySetInnerHTML={{ __html:description ? description : null }}
                 style={descriptionStyles}
            ></div>
          }
          {(linkIcons || linkLabel) &&
            <div className='linkComponent flex' style={linkComponentStyles}>
              <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer" style={linkStyles} >
                {linkLabel ? linkLabel : ""} 
                {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
              </a>
            </div>
          }
        </div>
      </div>
    </Wrapper>
  )
}

export default TextLinkConfig;

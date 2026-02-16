import { React, useState, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../images/home/DownloadIcon.svg';

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
  .cardTeaser:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
    border-color: ${(props) => props.hovBorderColor && props.hovBorderColor + "!important"};
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
`;

function CardTeaser ({
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
  image,
  imageHeight,
  imagePosition,
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
  componentPaddingTop,
  componentPaddingRight,
  componentPaddingBottom,
  componentPaddingLeft,
  componentDefaultBackColor,
  componentHoverBackColor,
  componentBorderColor,
  componentBorderHoverColor,
  componentBorderWidth,
  componentBorderStyle,
  componentBorderRadius,
  bordersToShow,
  componentWidth,
  componentHeight,
  componentPosition,   
  componentBoxShadow, 
  teaserLayout,
  descLinkLayout,
  descRowLayoutWidth,
  linkRowLayoutWidth,
  descLinkGap,
  descLinkPosition,
  linkHorizontalPosition,
  linkVerticalPosition,
  clickableImage,
  linkStyleName,
  linkNoStyles,
  styleName,
  noStyles,
}) {

    
  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Teasers-Config/cardTeaserComponents/@nodes`)
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
  
  const [linkConfigProps, setLinkConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/linkComponents/@nodes`)
      .then(response => response.json())
      .then(data => {
        let styleName =  linkStyleName || configProps?.linkStyleName || null;
        let result = data.find(item => item.styleName === styleName );
        if (!result && linkNoStyles === (false || "false")) {
          result = data[0];
        } else if (linkNoStyles !== (false || "false")) {
          result = null;
        } 
        setLinkConfigProps(result);
      });
  }, [linkStyleName, linkNoStyles, configProps?.linkStyleName, apiBase, restPath, nodeName]);

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

  const openLink = () => {
    window.open(href, linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank");
  };

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";  

  const cursorPointer = clickableImage === "true" ? "cursorPointer" : configProps?.clickableImage === "true" ? "cursorPointer" : null;
  const showBorders = bordersToShow || configProps?.bordersToShow || null;

  const defBgColor = componentDefaultBackColor || configProps?.componentDefaultBackColor || null;
  const hovBgColor = componentHoverBackColor || configProps?.componentHoverBackColor || defBgColor;

  const defBorderColor = componentBorderColor || configProps?.componentBorderColor || null;
  const hovBorderColor = componentBorderHoverColor || configProps?.componentBorderHoverColor || defBorderColor;

  const defLinkBgColor = linkDefaultBackColor || configProps?.linkDefaultBackColor || linkConfigProps?.linkDefaultBackColor || null;
  const hovLinkBgColor = linkHoverBackColor || configProps?.linkHoverBackColor ||  linkConfigProps?.linkHoverBackColor || defLinkBgColor;

  const defLabelColor = labelDefaultColor || configProps?.labelDefaultColor || linkConfigProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || configProps?.labelHoverColor || linkConfigProps?.labelHoverColor || defLabelColor; 

  const defChevronColor = chevronDefaultColor || configProps?.chevronDefaultColor || linkConfigProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || configProps?.chevronHoverColor || linkConfigProps?.chevronHoverColor || defChevronColor;

  const defLinkBorderColor = linkBorderColor || configProps?.linkBorderColor || linkConfigProps?.linkBorderColor || null;
  const hovLinkBorderColor = linkBorderHoverColor || configProps?.linkBorderHoverColor || linkConfigProps?.linkBorderHoverColor || defLinkBorderColor;

  const linkIcons = linkIcon || configProps?.linkIcon || linkConfigProps?.linkIcon || null;

  const cardTeaserComponentStyles = {
    margin: componentPosition || configProps?.componentPosition || null,
    maxWidth: componentWidth || configProps?.componentWidth || null,
    minHeight: componentHeight || configProps?.componentHeight || null,
    borderRadius: componentBorderRadius || configProps?.componentBorderRadius || null,
    boxShadow: componentBoxShadow || configProps?.componentBoxShadow || null
  }

  const imageStyles = {
    borderTopLeftRadius: componentBorderRadius || configProps?.componentBorderRadius || null,
    borderTopRightRadius: componentBorderRadius || configProps?.componentBorderRadius || null,
    objectPosition: imagePosition || configProps?.imagePosition || null,
    height: imageHeight || configProps?.imageHeight || null
  }

  const cardTeaserStyles = {
    minHeight: `calc(${componentHeight || configProps?.componentHeight} - ${imageHeight || configProps?.imageHeight})`,
    justifyContent: teaserLayout || configProps?.teaserLayout || null,
    paddingTop: componentPaddingTop || configProps?.componentPaddingTop || null,
    paddingRight: componentPaddingRight || configProps?.componentPaddingRight || null,
    paddingBottom: componentPaddingBottom || configProps?.componentPaddingBottom || null,
    paddingLeft: componentPaddingLeft || configProps?.componentPaddingLeft || null,
    backgroundColor: defBgColor,
    borderColor: componentBorderColor || configProps?.componentBorderColor || null,
    borderWidth: componentBorderWidth || configProps?.componentBorderWidth || null,
    borderStyle: componentBorderStyle || configProps?.componentBorderStyle || null,
    borderBottomRightRadius: componentBorderRadius || configProps?.componentBorderRadius || null,
    borderBottomLeftRadius: componentBorderRadius || configProps?.componentBorderRadius || null
  }

  const headlineStyles = {
    fontFamily: headlineFontFamily || configProps?.headlineFontFamily || null,
    textAlign: headlinePosition || configProps?.headlinePosition || null,
    fontSize: headlineFontSize || configProps?.headlineFontSize || null,
    lineHeight: headlineLineHeight || configProps?.headlineLineHeight || null,
    color: headlineColor || configProps?.headlineColor || null,
    letterSpacing: headlineLetterSpacing || configProps?.headlineLetterSpacing || null,
    fontWeight: headlineBold || configProps?.headlineBold || null,
    fontStyle: headlineItalic || configProps?.headlineItalic || null,
    textTransform: headlineTextTransform || null,
    paddingTop: headlinePaddingTop || configProps?.headlinePaddingTop || null,
    paddingRight: headlinePaddingRight || configProps?.headlinePaddingRight || null,
    paddingBottom: headlinePaddingBottom || configProps?.headlinePaddingBottom || null,
    paddingLeft: headlinePaddingLeft || configProps?.headlinePaddingLeft || null
  }

  const descriptionLinkWrapperStyles = {
    flexDirection: descLinkLayout || configProps?.descLinkLayout || "column",
    gap: descLinkGap || configProps?.descLinkGap || null,
    alignItems: descLinkPosition || configProps?.descLinkPosition || null
  }

  const descriptionStyles = {
    width: descRowLayoutWidth || configProps?.descRowLayoutWidth || null,
    paddingTop: descriptionPaddingTop || configProps?.descriptionPaddingTop || null,
    paddingRight: descriptionPaddingRight || configProps?.descriptionPaddingRight || null,
    paddingBottom: descriptionPaddingBottom || configProps?.descriptionPaddingBottom || null,
    paddingLeft: descriptionPaddingLeft || configProps?.descriptionPaddingLeft || null,
    borderColor: descriptionBorderColor || configProps?.descriptionBorderColor || null,
    borderWidth: descriptionBorderWidth || configProps?.descriptionBorderWidth || null,
    borderStyle: descriptionBorderStyle || configProps?.descriptionBorderStyle || null,
    borderRadius: descriptionBorderRadius || configProps?.descriptionBorderRadius || null,
    textAlign: descriptionAlign || configProps?.descriptionAlign || null,
    color: descriptionColor || configProps?.descriptionColor || null
  }

  const linkComponentStyles = {
    width: linkRowLayoutWidth || configProps?.linkRowLayoutWidth || null,
    paddingTop: linkPaddingTop || configProps?.linkPaddingTop || linkConfigProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || configProps?.linkPaddingRight || linkConfigProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || linkConfigProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || linkConfigProps?.linkPaddingLeft || null,  
    justifyContent: linkHorizontalPosition || configProps?.linkHorizontalPosition || "flex-start",
    alignItems: linkVerticalPosition || configProps?.linkVerticalPosition || "flex-start"                  
  }

  const linkStyles = {
    backgroundColor: defLinkBgColor,
    color: defLabelColor,
    paddingTop: labelPaddingTop || configProps?.labelPaddingTop || linkConfigProps?.labelPaddingTop || null,
    paddingRight: labelPaddingRight || configProps?.labelPaddingRight || linkConfigProps?.labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || configProps?.labelPaddingBottom || linkConfigProps?.labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || configProps?.labelPaddingLeft || linkConfigProps?.labelPaddingLeft || null, 
    borderColor: linkBorderColor || configProps?.linkBorderColor || linkConfigProps?.linkBorderColor || null,
    borderWidth: linkBorderWidth || configProps?.linkBorderWidth || linkConfigProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || configProps?.linkBorderStyle || linkConfigProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || configProps?.linkBorderRadius || linkConfigProps?.linkBorderRadius || null,
    width: linkWidth || configProps?.linkWidth || linkConfigProps?.linkWidth || "max-content",
    height: linkHeight || configProps?.linkHeight || linkConfigProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || configProps?.linkLabelDecoration || linkConfigProps?.linkLabelDecoration || "none",
    justifyContent: linkLabelHorizontalPosition || configProps?.linkLabelHorizontalPosition || linkConfigProps?.linkLabelHorizontalPosition || "center",
    alignItems: linkLabelVerticalPosition || configProps?.linkLabelVerticalPosition || linkConfigProps?.linkLabelVerticalPosition || "center",
    fontFamily: linkFontFamily || configProps?.linkFontFamily || linkConfigProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || configProps?.linkLabelFontSize || linkConfigProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || configProps?.linkLabelLineHeight || linkConfigProps?.linkLabelLineHeight || null,
    fontWeight: linkBold || configProps?.linkBold || linkConfigProps?.linkBold || null,
    fontStyle: linkItalic || configProps?.linkItalic || linkConfigProps?.linkItalic || null
  }

  const addArrowsVar = addArrows || configProps?.addArrows || "false";
  const arrowsHeightVar = {height: arrowsHeight || configProps?.arrowsHeight || null};

  return (    
    <Wrapper className='cardTeaserWrapper'
      hovBgColor={hovBgColor}
      hovBorderColor={hovBorderColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className={`cardTeaserComponent flexColumn `} style={cardTeaserComponentStyles}>
        <img className={`image ${cursorPointer}`} style={imageStyles} src={image['@link']} alt=""
             onClick={clickableImage === "true" ? openLink : configProps?.clickableImage === "true" ? openLink : null}
        />
        <div className={`cardTeaser flexColumn  ${showBorders}`} style={cardTeaserStyles}> 
          {headline &&
            <HeadlineLevel className="headline" style={headlineStyles}>
              <span className='customHeadlineArrows' style={arrowsHeightVar}>
                {(addArrowsVar !== "false" || false) && <ArrowsIcon/>}
              </span>{headline || null}
            </HeadlineLevel>  
          }             
          <div className='descriptionLinkWrapper flex' style={descriptionLinkWrapperStyles}>
            { description &&
              <div className={`description ${descriptionStyle || configProps?.descriptionStyle || null}`}
                   dangerouslySetInnerHTML={{ __html:description || null }}
                   style={descriptionStyles}
              ></div>
            }
            {(linkIcons || linkLabel) &&
              <div className='linkComponent flex' style={linkComponentStyles}>
                <a className='link' href={href} target={linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank"} rel="noreferrer" style={linkStyles}>
                  {linkLabel ? linkLabel : ""}
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default CardTeaser;

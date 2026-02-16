import { React, useState, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { getAPIBase, getRouterBasename } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../images/home/DownloadIcon.svg';
import LinkModal from '../../helpers/LinkModal';
import { aclCheck } from '../../helpers/ACL';

function findNodeById(node, targetId) {
  if (!node || typeof node !== 'object') return null;

  if (node['@id'] === targetId) {
    return node;
  }

  if (node['@nodes'] && Array.isArray(node['@nodes'])) {
    for (const childName of node['@nodes']) {
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
  .borderTeaser:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
    border-color: ${(props) => props.hovBorderColor && props.hovBorderColor + "!important"};
  }
  .link:hover {
    background-color: ${(props) => props.hovLinkBgColor && props.hovLinkBgColor + "!important"};
    color: ${(props) => props.hovLabelColor && props.hovLabelColor + "!important"};
    border-color: ${(props) => props.hovBorderColor && props.hovBorderColor + "!important"};
  }
  .link svg { 
    color: ${(props) => props.defChevronColor && props.defChevronColor + "!important"};
  }
  .link:hover svg { 
    color: ${(props) => props.hovChevronColor && props.hovChevronColor + "!important"};
  }
`;

function BorderTeaser ({
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
  componentWidth,
  componentHeight,
  componentPosition,    
  teaserLayout,
  descLinkLayout,
  descRowLayoutWidth,
  linkRowLayoutWidth,
  descLinkGap,
  descLinkPosition,
  linkHorizontalPosition,
  linkVerticalPosition,
  clickableComponent,
  linkStyleName,
  linkNoStyles,
  styleName,
  noStyles,

  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
}) {

    
  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const basicAclCheck = allowedGroups.length === 0 && deniedGroups.length === 0 && (hideComponent === false || hideComponent === "false");
  const [aclValue, setAclValue] = useState(false);  

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? true : false;

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Teasers-Config/borderTeaserComponents/@nodes`)
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

  useEffect(() => {
    if (editMode === false && basicAclCheck === false) {
      aclCheck(allowedGroups, deniedGroups, hideComponent)
        .then((response) => {
          setAclValue(response); 
        })
        .catch((error) => {
          console.error("Error executing aclCheck:", error);
          setAclValue(false);
        });
    } else setAclValue(true);
  });  

  const [resolvedPath, setResolvedPath] = useState(page);

  useEffect(() => {
    if (linkType !== 'page') return;

    if (!isUuid(page)) {
      setResolvedPath(page);
      return;
    }

    async function resolveUuidToPath() {
      try {
        const url = apiBase + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
        const response = await fetch(url);
        const data = await response.json();

        const foundNode = findNodeById(data, page);
        if (foundNode && foundNode['@path']) {
          setResolvedPath(foundNode['@path']);
        } else {
          setResolvedPath(page);
        }
      } catch (e) {
        console.error('Error fetching navigation or searching for node:', e);
        setResolvedPath(page);
      }
    }

    resolveUuidToPath();
  }, [page, linkType, apiBase]);

  const downloadLink = download ? download['@link'] : baseUrl;
  const href = linkType === "page"
    ? (getRouterBasename() + resolvedPath)
        .replace("//", "/")
        .replace("Home/Home", "Home")
    : linkType === "external"
      ? external
      : downloadLink;

  const toggleLinkModal = (e) => {
    setShowLinkModal(!showLinkModal);
    e.preventDefault();
  }

  const closeLinkModal = () => {
    setShowLinkModal(false);
  }

  const openLink = () => {
    if (linkDestination !== "iFrame") {
      window.open(href, linkDestination);
    }
    else if (linkDestination === "iFrame") {
      toggleLinkModal();
    }
  };

  const HeadlineLevel = headlineLevel || configProps?.headlineLevel || "h1";  

  const cursorPointer = clickableComponent === "true" ? "cursorPointer" : configProps?.clickableComponent === "true" ? "cursorPointer" : null;

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
  const linkDestination = linkLocation || configProps?.linkLocation || linkConfigProps?.linkLocation || "_blank";

  const borderTeaserStyles = {
    justifyContent: teaserLayout || configProps?.teaserLayout || null,
    width: componentWidth || configProps?.componentWidth || null,
    minHeight: componentHeight || configProps?.componentHeight || null,
    paddingTop: componentPaddingTop || configProps?.componentPaddingTop || null,
    paddingRight: componentPaddingRight || configProps?.componentPaddingRight || null,
    paddingBottom: componentPaddingBottom || configProps?.componentPaddingBottom || null,
    paddingLeft: componentPaddingLeft || configProps?.componentPaddingLeft || null,
    backgroundColor: defBgColor,
    borderColor: componentBorderColor || configProps?.componentBorderColor || null,
    borderWidth: componentBorderWidth || configProps?.componentBorderWidth || null,
    borderStyle: componentBorderStyle || configProps?.componentBorderStyle || null,
    borderRadius: componentBorderRadius || configProps?.componentBorderRadius || null
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
    alignItems: descLinkPosition || configProps?.descLinkGap || null
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

  
  if (editMode === false && aclValue === false && basicAclCheck === false) {
    return null;
  } 

  return (    
    <Wrapper className='borderTeaserWrapper'
      hovBgColor={hovBgColor}
      hovBorderColor={hovBorderColor}
      hovLinkBgColor={hovLinkBgColor}
      hovLabelColor={hovLabelColor}
      hovLinkBorderColor={hovLinkBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className={`borderTeaserComponent flex`} style={{ justifyContent: componentPosition || configProps?.componentPosition || null }}>
        <div className={`borderTeaser flexColumn ${cursorPointer}`} 
             onClick={clickableComponent === "true" ? openLink : configProps?.clickableComponent === "true" ? openLink : null}
             style={borderTeaserStyles}
        > 
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
            {(linkIcons || linkLabel) && (linkDestination !== "iFrame") &&
              <div className='linkComponent flex' style={linkComponentStyles}>
                <a className='link' href={href} target={linkDestination} rel="noreferrer" style={linkStyles}>
                  {linkLabel ? linkLabel : ""}
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
            {(linkIcons || linkLabel) && (linkDestination === "iFrame") &&
              <div className='linkComponent' style={linkComponentStyles} >
                <a onClick={toggleLinkModal} className={`link ${linkIcon}`} style= {linkStyles}> 
                  {linkLabel ? linkLabel : ""} 
                  {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
                </a>
              </div>
            }
            {showLinkModal && (linkIcons || linkLabel) && (linkLocation === "iFrame") && <LinkModal src={href} isOpen={showLinkModal} closeModal={closeLinkModal}></LinkModal>}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default BorderTeaser;

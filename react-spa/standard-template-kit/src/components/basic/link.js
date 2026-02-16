import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { IoAtSharp } from "react-icons/io5";
import { getAPIBase, getRouterBasename } from '../../helpers/AppHelpers';
import styled from 'styled-components';
import { ReactComponent as ArrowsIcon } from '../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../images/home/DownloadIcon.svg';
import { isPublicInstance } from "../../helpers/AppHelpers";

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
  .link:hover {
    background-color: ${(props) => props.hovBgColor && props.hovBgColor + "!important"};
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

function Link({
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
  linkHorizontalPosition,
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
  styleName,
  noStyles
}) {

  

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const isPublic = isPublicInstance();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Basics-Config/linkComponents/@nodes`)
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

  const defBgColor = linkDefaultBackColor || configProps?.linkDefaultBackColor || null;
  const hovBgColor = linkHoverBackColor || configProps?.linkHoverBackColor || defBgColor;
  const defLabelColor = labelDefaultColor || configProps?.labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || configProps?.labelHoverColor || defLabelColor;
  const defChevronColor = chevronDefaultColor || configProps?.chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || configProps?.chevronHoverColor || defChevronColor;  
  const defBorderColor = linkBorderColor || configProps?.linkBorderColor || null;
  const hovBorderColor = linkBorderHoverColor || configProps?.linkBorderHoverColor || defBorderColor;

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
  const externalLink = isPublic ? external.replace("cmsAuthor", "cmsPublic") : external.replace("cmsPublic", "cmsAuthor");
  const href = linkType === "page"
    ? (getRouterBasename() + resolvedPath)
        .replace("//", "/")
        .replace("Home/Home", "Home")
    : linkType === "external"
      ? externalLink
      : downloadLink;

  const linkIcons = linkIcon || configProps?.linkIcon || "";
  
  const linkComponentStyles = {
    paddingTop: linkPaddingTop || configProps?.linkPaddingTop || null,
    paddingRight: linkPaddingRight || configProps?.linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || configProps?.linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || configProps?.linkPaddingLeft || null, 
    justifyContent: linkHorizontalPosition || configProps?.linkHorizontalPosition || "left"
  }
  
  const linkStyles = {
    backgroundColor: defBgColor,
    color: defLabelColor,
    paddingTop: labelPaddingTop || configProps?.labelPaddingTop || null,
    paddingRight: labelPaddingRight || configProps?.labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || configProps?.labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || configProps?.labelPaddingLeft || null, 
    borderColor: defBorderColor,
    borderWidth: linkBorderWidth || configProps?.linkBorderWidth || null,
    borderStyle: linkBorderStyle || configProps?.linkBorderStyle || null,
    borderRadius: linkBorderRadius || configProps?.linkBorderRadius || null,
    width: linkWidth || configProps?.linkWidth || "max-content",
    height: linkHeight || configProps?.linkHeight || "max-content",
    textDecoration: linkLabelDecoration || configProps?.linkLabelDecoration || "none",
    justifyContent:  linkLabelHorizontalPosition || configProps?.linkLabelHorizontalPosition || "center",
    alignItems:  linkLabelVerticalPosition || configProps?.linkLabelVerticalPosition || "center",
    fontFamily: linkFontFamily || configProps?.linkFontFamily || null,
    fontSize: linkLabelFontSize || configProps?.linkLabelFontSize || null,
    lineHeight: linkLabelLineHeight || configProps?.linkLabelLineHeight || null,
    fontWeight:  linkBold || configProps?.linkBold || null,
    fontStyle:  linkItalic || configProps?.linkItalic || null
  }

  console.log("linkFontFamily");
  console.log(linkFontFamily);

  return (
    <Wrapper className='linkWrapper'
      hovBgColor={hovBgColor} 
      hovLabelColor={hovLabelColor}
      hovBorderColor={hovBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className='linkComponent flex' style={linkComponentStyles}>
        <a className={`link ${linkIcon}`} href={href} target={linkLocation || configProps?.linkLocation || "_blank"} rel="noreferrer" style= {linkStyles}> 
          {linkLabel || ""} 
          {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
        </a>
      </div>
    </Wrapper>
  )
}

export default Link;

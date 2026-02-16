import React, { useRef, useEffect, useState } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { TfiDownload } from "react-icons/tfi";
import { FaChevronRight } from "react-icons/fa";
import styled from 'styled-components';
import { getAPIBase, getRouterBasename } from '../../../helpers/AppHelpers';
import { ReactComponent as ArrowsIcon } from '../../../images/home/ArrowsIcon.svg';
import { ReactComponent as DownloadIcon } from '../../../images/home/DownloadIcon.svg';

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

function LinkConfig ({
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
  styleName
}) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();

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
        .replace("Home/Home", "Home")
    : linkType === "external"
      ? external
      : downloadLink;
  
  const linkIcons = linkIcon || "";

  const defBgColor = linkDefaultBackColor || null;
  const hovBgColor = linkHoverBackColor || defBgColor;
  const defLabelColor = labelDefaultColor || null;
  const hovLabelColor = labelHoverColor || defLabelColor; 
  const defChevronColor = chevronDefaultColor || null;
  const hovChevronColor = chevronHoverColor || defChevronColor;  
  const defBorderColor = linkBorderColor || null;
  const hovBorderColor = linkBorderHoverColor || defBorderColor;
  

  const linkComponentStyles = {
    paddingTop: linkPaddingTop || null,
    paddingRight: linkPaddingRight || null,
    paddingBottom: linkPaddingBottom || null,
    paddingLeft: linkPaddingLeft || null,
    justifyContent: linkHorizontalPosition || "left"
  }

  const linkStyles = {
    backgroundColor: defBgColor,
    color: defLabelColor,
    paddingTop: labelPaddingTop || null,
    paddingRight: labelPaddingRight || null,
    paddingBottom: labelPaddingBottom || null,
    paddingLeft: labelPaddingLeft || null,
    borderColor: defBorderColor,
    borderWidth: linkBorderWidth || null,
    borderStyle: linkBorderStyle || null,
    borderRadius: linkBorderRadius || null,
    width: linkWidth || "max-content",
    height: linkHeight || "max-content",
    textDecoration: linkLabelDecoration || "none",
    justifyContent: linkLabelHorizontalPosition || "center",
    alignItems: linkLabelVerticalPosition || "center",
    fontSize: linkLabelFontSize || null,
    fontFamily: linkFontFamily || null,
    lineHeight: linkLabelLineHeight || null,
    fontWeight:  linkBold || null,
    fontStyle:  linkItalic || null
  }

  console.log("linkFontFamily");
  console.log(linkFontFamily);

  return (
    <Wrapper className='linkWrapper configComponents'
      hovBgColor={hovBgColor} 
      hovLabelColor={hovLabelColor}
      hovBorderColor={hovBorderColor}
      defChevronColor={defChevronColor}
      hovChevronColor={hovChevronColor}
    >
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className='linkComponent flex' style={linkComponentStyles} >
        <a className='link' href={href} target={linkLocation || "_blank"} rel="noreferrer" style={linkStyles}>
          {linkLabel || ""} 
          {linkIcons === "BsChevronRight" ? <FaChevronRight /> : linkIcons === "BsArrowRight" ? <BsArrowRight /> : linkIcons === "TfiDownload" ? <TfiDownload /> : ""}
        </a>
      </div>
    </Wrapper>
  )
}

export default LinkConfig;

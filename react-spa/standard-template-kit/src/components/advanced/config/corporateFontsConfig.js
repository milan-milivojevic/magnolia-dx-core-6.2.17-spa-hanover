import React from 'react';
import { getRouterBasename } from '../../../helpers/AppHelpers';

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

function CorporateFontsConfig ({
    headline,   
    headlineLevel,
    headlineFontFamily,
    headlinePosition,
    headlineFontSize,
    headlineLineHeight,
    headlineColor,
    headlinePaddingTop,
    headlinePaddingRight,
    headlinePaddingBottom,
    headlinePaddingLeft,
    description,
    descriptionPaddingTop,
    descriptionPaddingRight,
    descriptionPaddingBottom,
    descriptionPaddingLeft,
    textWidth,
    textHeight,
    linkType,
    page,
    external,
    image,
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
    linkBorderWidth,
    linkBorderStyle,
    linkBorderRadius,
    linkWidth,
    linkHeight,
    linkVerticalPosition,
    linkHorizontalPosition,
    linkLabelDecoration,
    linkLabelVerticalPosition,
    linkLabelHorizontalPosition,
    linkLabelFontSize,
    linkLabelLineHeight,
    linkBold,
    linkItalic,    
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
    wrapperWidth,
    wrapperHeight,
    componentLayout,
    imageCaption,
    imagePosition,
    imageFit,
    imageWidth,
    imageHeight,
    imageBorderColor,
    imageBorderWidth,
    imageBorderStyle,
    imageBorderRadius,
    imagePaddingTop,
    imagePaddingRight,
    imagePaddingBottom,
    imagePaddingLeft,
    imageDefaultBackColor,
    imageHoverBackColor,
    imageCaptionColor,
    imageCaptionLineHeight,
    imageCaptionFontSize,
    imageCaptionPosition,
    imageWrapperPosition,
    imageWrapperBorderColor,
    imageWrapperBorderWidth,
    imageWrapperBorderStyle,
    imageWrapperBorderRadius,
    imageWrapperPaddingTop,
    imageWrapperPaddingRight,
    imageWrapperPaddingBottom,
    imageWrapperPaddingLeft,
    imageWrapperDefaultBackColor,
    imageWrapperHoverBackColor
  }) {

  const HeadlineLevel = headlineLevel !== undefined ? headlineLevel : "h1";
  const href = linkType === "page" ? (getRouterBasename() + page).replace("//", "/").replace("Home/Home", "Home") : external;

  return (
    <div className='text_editMode'>
      <div className={`globalStaticContent ${componentLayout}`}
        style={{"padding-top": wrapperPaddingTop !== undefined ? wrapperPaddingTop : null,
                "padding-right": wrapperPaddingRight !== undefined ? wrapperPaddingRight : null,
                "padding-bottom": wrapperPaddingBottom !== undefined ? wrapperPaddingBottom : null,
                "padding-left": wrapperPaddingLeft !== undefined ? wrapperPaddingLeft : null,    
                "background-color": wrapperDefaultBackColor !== undefined ? wrapperDefaultBackColor : null,
                "border-color": wrapperBorderColor !== undefined ? wrapperBorderColor: null,
                "border-width": wrapperBorderWidth !== undefined ? wrapperBorderWidth: null,
                "border-style": wrapperBorderStyle !== undefined ? wrapperBorderStyle: null,
                "border-radius": wrapperBorderRadius !== undefined ? wrapperBorderRadius: null,
                "width": wrapperWidth !== undefined ? wrapperWidth : null,
                "height": wrapperHeight !== undefined ? wrapperHeight : null
              }}
      >      
      <HeadlineLevel className="headline"
        style={{"font-family": headlineFontFamily !== undefined ? headlineFontFamily : null,
                "text-align":  headlinePosition !== undefined ? headlinePosition : null,
                "font-size": headlineFontSize !== undefined ? headlineFontSize : null,
                "line-height": headlineLineHeight !== undefined ? headlineLineHeight : null,
                "color": headlineColor !== undefined ? headlineColor : null,
                "padding-top": headlinePaddingTop !== undefined ? headlinePaddingTop : null,
                "padding-right": headlinePaddingRight !== undefined ? headlinePaddingRight : null,
                "padding-bottom": headlinePaddingBottom !== undefined ? headlinePaddingBottom : null,
                "padding-left": headlinePaddingLeft !== undefined ? headlinePaddingLeft : null,    
                "width": "100%"
              }}
      >{headline !==  undefined ? headline : null}</HeadlineLevel>
      <div className='descLinkImage'>
        <div className='descLink'>
          <div className="description" dangerouslySetInnerHTML={{ __html:description !== undefined ? description : null }}
            style={{"padding-top": descriptionPaddingTop !== undefined ? descriptionPaddingTop : null,
                    "padding-right": descriptionPaddingRight !== undefined ? descriptionPaddingRight : null,
                    "padding-bottom": descriptionPaddingBottom !== undefined ? descriptionPaddingBottom : null,
                    "padding-left": descriptionPaddingLeft !== undefined ? descriptionPaddingLeft : null,    
                    "width": textWidth !== undefined ? textWidth : "50%",
                    "height": textHeight !== undefined ? textHeight : null
                  }}
          ></div>
          <div className='link' 
              style= {{ "justify-content":  linkHorizontalPosition !== undefined ? linkHorizontalPosition : "start",
                        "align-items":  linkVerticalPosition !== undefined ? linkVerticalPosition : "start",
                        "width": textWidth !== undefined ?  `calc(100% - ${textWidth})` : "50%",
                        "padding-top": linkPaddingTop !== undefined ? linkPaddingTop : null,
                        "padding-right": linkPaddingRight !== undefined ? linkPaddingRight : null,
                        "padding-bottom": linkPaddingBottom !== undefined ? linkPaddingBottom : null,
                        "padding-left": linkPaddingLeft !== undefined ? linkPaddingLeft : null, 
                      }}
          >
            <a className='linkComponent' href={href} target={linkLocation !== undefined ? linkLocation : "_blank"} rel="noreferrer"
              style= {{ "background-color": linkDefaultBackColor !== undefined ? linkDefaultBackColor : null,
                        "color": labelDefaultColor !== undefined ? labelDefaultColor : null,
                        "border-color": linkBorderColor !== undefined ? linkBorderColor: null,
                        "border-width": linkBorderWidth !== undefined ? linkBorderWidth: null,
                        "border-style": linkBorderStyle !== undefined ? linkBorderStyle: null,
                        "border-radius": linkBorderRadius !== undefined ? linkBorderRadius: null,
                        "width": linkWidth !== undefined ? linkWidth : null,
                        "height": linkHeight !== undefined ? linkHeight : null,
                        "text-decoration": linkLabelDecoration !== undefined ? linkLabelDecoration : "none",
                        "justify-content":  linkLabelHorizontalPosition !== undefined ? linkLabelHorizontalPosition : "center",
                        "align-items":  linkLabelVerticalPosition !== undefined ? linkLabelVerticalPosition : "center",
                        "font-size": linkLabelFontSize !== undefined ? linkLabelFontSize : null,
                        "line-height": linkLabelLineHeight !== undefined ? linkLabelLineHeight : null,
                        "font-weight":  linkBold !== true ? "normal" : "bold",
                        "font-style":  linkItalic !== true ? "normal" : "italic"
                      }}
            > {linkLabel !== undefined ? linkLabel : ""} </a>
          </div>
        </div>
        <figure style={{"align-items":  imageWrapperPosition !== undefined ? imageWrapperPosition : null,
                        "border-color": imageWrapperBorderColor !== undefined ? imageWrapperBorderColor: null,
                        "border-width": imageWrapperBorderWidth !== undefined ? imageWrapperBorderWidth: null,
                        "border-style": imageWrapperBorderStyle !== undefined ? imageWrapperBorderStyle: null,
                        "border-radius": imageWrapperBorderRadius !== undefined ? imageWrapperBorderRadius: null,
                        "padding-top": imageWrapperPaddingTop !== undefined ? imageWrapperPaddingTop : null,
                        "padding-right": imageWrapperPaddingRight !== undefined ? imageWrapperPaddingRight : null,
                        "padding-bottom": imageWrapperPaddingBottom !== undefined ? imageWrapperPaddingBottom : null,
                        "padding-left": imageWrapperPaddingLeft !== undefined ? imageWrapperPaddingLeft : null,
                        "background-color": imageWrapperDefaultBackColor !== undefined ? imageWrapperDefaultBackColor : null
                      }}
      
        >
          <img className="image" src={"http://localhost:8080" + image['@link']} alt="" 
            style={{"object-position":  imagePosition !== undefined ? imagePosition : null,
                    "object-fit": imageFit !== undefined ? imageFit : null,
                    "width": imageWidth !== undefined ? imageWidth : null,
                    "height": imageHeight !== undefined ? imageHeight : null,
                    "border-color": imageBorderColor !== undefined ? imageBorderColor: null,
                    "border-width": imageBorderWidth !== undefined ? imageBorderWidth: null,
                    "border-style": imageBorderStyle !== undefined ? imageBorderStyle: null,
                    "border-radius": imageBorderRadius !== undefined ? imageBorderRadius: null,
                    "padding-top": imagePaddingTop !== undefined ? imagePaddingTop : null,
                    "padding-right": imagePaddingRight !== undefined ? imagePaddingRight : null,
                    "padding-bottom": imagePaddingBottom !== undefined ? imagePaddingBottom : null,
                    "padding-left": imagePaddingLeft !== undefined ? imagePaddingLeft : null,
                    "background-color": imageDefaultBackColor !== undefined ? imageDefaultBackColor : null
                  }}
          />
          <figcaption style={{"text-align":  imageCaptionPosition !== undefined ? imageCaptionPosition : null,
                              "color": imageCaptionColor !== undefined ? imageCaptionColor: null,
                              "font-size": imageCaptionFontSize !== undefined ? imageCaptionFontSize: null,
                              "line-height": imageCaptionLineHeight !== undefined ? imageCaptionLineHeight: null,
                              "width": imageWidth !== undefined ? imageWidth : null,
                            }}
          >{imageCaption !==  undefined ? imageCaption : null}</figcaption>
        </figure>
        </div>
      </div>
    </div>
  )
}



export default CorporateFontsConfig;

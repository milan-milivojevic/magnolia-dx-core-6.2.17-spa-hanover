import React, {useState, useEffect} from 'react';
import { getAPIBase } from '../../helpers/AppHelpers';

function ImageGallery ({     
    multi,
    layout,
    col1width,
    col2width,
    col3width,
    col4width,
    col5width,
    col6width,
    columnGap,
    rowGap,
    rowsHeight,
    width,
    position,
    wrapperPaddingLeft,
    wrapperPaddingBottom,
    wrapperPaddingRight,
    wrapperPaddingTop,
    wrapperBorderWidth,
    wrapperBorderStyle,
    wrapperBorderColor,
    wrapperBorderRadius,
    imageHeight,
    imageFit,
    imagePosition,
    imagesAlignment,
    imageBorderWidth,
    imageBorderStyle,
    imageBorderColor,
    imageBorderRadius,  
    styleName,
    noStyles
}) {
  
  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;    

  const [configProps, setConfigProps] = useState();

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Grouping-Config/imageGalleryComponents/@nodes`)
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

  const images = [];
	for (let i = 0; i <= 20; i++) {
		images.push(multi[`multi${i}`]?.image);
	}
  const activeImages = images.filter((image) => {
		return image !== undefined;
	})

  let gridTemplateColumns;

  if (layout === "Custom") {   
    gridTemplateColumns = `${col1width || ''} ${col2width || ''} ${col3width || ''} ${col4width || ''} ${col5width || ''} ${col6width || ''}`
    console.log(gridTemplateColumns);
  }

  const imageGalleryComponentStyles = {
    width: width || configProps?.width || null,
    margin: position || configProps?.position || null,
    gridColumnGap: columnGap || configProps?.columnGap || null,
    gridRowGap: rowGap || configProps?.rowGap || null,
    borderColor: wrapperBorderColor || configProps?.wrapperBorderColor|| null,
    borderWidth: wrapperBorderWidth || configProps?.wrapperBorderWidth|| null,
    borderStyle: wrapperBorderStyle || configProps?.wrapperBorderStyle|| null,
    borderRadius: wrapperBorderRadius || configProps?.wrapperBorderRadius|| null,
    paddingTop: wrapperPaddingTop || configProps?.wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || configProps?.wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || configProps?.wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || configProps?.wrapperPaddingLeft || null,
    gridAutoRows: rowsHeight || configProps?.rowsHeight || null,
    gridTemplateColumns: gridTemplateColumns || null,
    alignItems: imagesAlignment || configProps?.imagesAlignment  || null
  }

  const galleryImageStyles = {
    objectPosition:  imagePosition || configProps?.imagePosition || null,
    objectFit: imageFit || configProps?.imageFit || null,
    height: imageHeight || configProps?.imageHeight || null,
    borderColor: imageBorderColor || configProps?.imageBorderColor|| null,
    borderWidth: imageBorderWidth || configProps?.imageBorderWidth|| null,
    borderStyle: imageBorderStyle || configProps?.imageBorderStyle|| null,
    borderRadius: imageBorderRadius || configProps?.imageBorderRadius|| null,
  }

  return (
    <div className='imageGalleryWrapper'>
      <div className={`imageGalleryComponent layout${layout || configProps?.layout}`} style={imageGalleryComponentStyles}>
        {activeImages.map((image, i) =>      
          <img key={i} className="galleryImage" src={image['@link']} alt="" style={galleryImageStyles}/>
        )}
      </div>
    </div>
  )
}

export default ImageGallery;
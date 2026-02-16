import React, { useRef } from 'react';

function ImageGalleryConfig ({     
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
    styleName
}) {

  const myRef = useRef(null);

  const handleClick = () => {
    const copyText = myRef.current.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  /* Filtering images from multi field to get active images array */

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
    width: width || null,
    margin: position || null,
    gridColumnGap: columnGap || null,
    gridRowGap: rowGap || null,
    paddingTop: wrapperPaddingTop || null,
    paddingRight: wrapperPaddingRight || null,
    paddingBottom: wrapperPaddingBottom || null,
    paddingLeft: wrapperPaddingLeft || null,
    borderColor: wrapperBorderColor || null,
    borderWidth: wrapperBorderWidth || null,
    borderStyle: wrapperBorderStyle || null,
    borderRadius: wrapperBorderRadius || null,
    gridAutoRows: rowsHeight || null,
    gridTemplateColumns: gridTemplateColumns || null           
  }

  const galleryImageStyles = {
    objectPosition:  imagePosition || null,
    objectFit: imageFit || null,
    height: imageHeight || null,
    borderColor: imageBorderColor || null,
    borderWidth: imageBorderWidth || null,
    borderStyle: imageBorderStyle || null,
    borderRadius: imageBorderRadius || null,
    alignItems: imagesAlignment || null
  }

  return (
    <div className='imageGalleryWrapper configComponents'>
      <div className="copyStyleName">
        <h3>Style Name: <span className="copyText" ref={myRef}>{styleName || null}</span></h3>
        <button onClick={handleClick}>
          Copy Style Name
        </button>
      </div>
      <div className={`imageGalleryComponent layout${layout}`} style={imageGalleryComponentStyles}>
        {activeImages.map((image, i) =>      
          <img key={i} className="galleryImage" src={image['@link']} alt="" style={galleryImageStyles}/>
        )}
      </div>
    </div>
  )
}

export default ImageGalleryConfig;
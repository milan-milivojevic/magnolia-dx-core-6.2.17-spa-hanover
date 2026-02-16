import React from 'react';

function GalleryImage({ 
    image,
    imageBorderColor,
    imageBorderWidth,
    imageBorderStyle,
    imageBorderRadius
}) {
  console.log(image);
  return (
      <img className="galleryImage" src={"http://localhost:8080" + image['@link']} alt="" 
        style={{width: "100%",
                borderColor: imageBorderColor !== undefined ? imageBorderColor: null,
                borderWidth: imageBorderWidth !== undefined ? imageBorderWidth: null,
                borderStyle: imageBorderStyle !== undefined ? imageBorderStyle: null,
                borderRadius: imageBorderRadius !== undefined ? imageBorderRadius: null,
              }}
      />
  )
}

export default GalleryImage;
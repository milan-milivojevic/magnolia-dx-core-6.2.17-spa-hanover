import React from 'react';

function ImageTest ({ 
    image,
}) {

  return (
    <div>
      <h1>Image Test</h1>
      {image &&
        <img className="image" src={process.env.REACT_APP_MGNL_DAM_RAW + image['@link']} alt="" />
      }
    </div>
  )
}

export default ImageTest;
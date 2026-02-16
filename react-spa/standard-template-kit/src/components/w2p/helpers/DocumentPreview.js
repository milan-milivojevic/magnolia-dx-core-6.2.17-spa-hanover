import React from 'react';
import noImage from './no_image.jpg';

const DocumentPreview = ({ documentId, logicalPage, documentStatus }) => {
  const handleError = (e) => {
    e.target.src = noImage;
  };

  const srcPath = documentStatus === 1 
    ? `/wp/rest/instances/${documentId}/preview?logicalPage=${logicalPage}&previewType=custom&width=225&height=225&background=true&border=true&onlinePreviewType=fit&watermarkType=5`
    : `/wp/rest/instances/${documentId}/preview?logicalPage=${logicalPage}&previewType=custom&width=225&height=225&background=true&border=true&onlinePreviewType=fit`;

  return (
    <div className='assetImageWrapper'>
      <img
        className="assetImage"
        src={srcPath}
        alt="Preview"
        onError={handleError}
      />
    </div>
  )
};

export default DocumentPreview;

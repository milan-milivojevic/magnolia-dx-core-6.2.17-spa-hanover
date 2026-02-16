import React from 'react';
import noImage from './no_image.jpg';

const TemplatePreview = ({ templateId, isOnline }) => {
  const handleError = (e) => {
    e.target.src = noImage;
  };

  const srcPath = isOnline
    ? `/wp/rest/online-templates/${templateId}/preview?logicalPage=1&previewType=middle&assetPreviewType=middle&width=225&height=225&background=true&border=true&onlinePreviewType=fit`
    : `/wp/rest/templates/${templateId}/preview?logicalPage=1&previewType=middle&assetPreviewType=middle&width=225&height=225&background=true&border=true&onlinePreviewType=fit`;

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

export default TemplatePreview;

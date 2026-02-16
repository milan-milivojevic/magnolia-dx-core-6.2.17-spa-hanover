import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import noImage from './no_image.jpg';

const AssetPreview = ({ assetId, assetVersion, assetPageCount, assetResourceType, isModal }) => {

  /* Defining state variables */
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImageStatus, setPreviewImageStatus] = useState("large");
  const [imageStatus, setImageStatus] = useState("large");

  /* Handling change of image preview based on number of asset pages */
  const handlePageChange = (nextPage) => {
    if (nextPage >= 1 && nextPage <= assetPageCount) {
      setCurrentPage(nextPage);
    }
  };

  /* Handling error when there is no image for defined size or when there is no image at all */
  const handleImageError = (e) => {
    if (imageStatus === "large") {
      e.target.src = `/rest/mp/v1.0/previews/middle/asset/${assetId}/version/${assetVersion}`;
      setImageStatus("middle");
    } else if (imageStatus === "middle") {
      e.target.src = noImage;
      setImageStatus("failed");
    }
  };

  /* Handling error when there is no image for defined size or when there is no image at all, for assets with multiple pages */
  const handlePageImageError = (e) => {
    if (previewImageStatus === "large") {
      e.target.src = `/rest/mp/v1.0/previews/middle/asset/${assetId}/version/${assetVersion}/watermark/false/page/${currentPage}`;
      setPreviewImageStatus("middle");
    } else if (previewImageStatus === "middle") {
      e.target.src = noImage;
      setPreviewImageStatus("failed");
    }
  };    

  const renderContent = () => {
    if (assetResourceType === 'Video' && isModal) {
      return (
        <div className="assetVideoWrapper">
          <video className="assetVideo" controls autoPlay muted>
            <source
              src={`/rest/mp/v1.0/previews/video/asset/${assetId}`}
              type="video/mp4"
            />
          </video>
        </div>
      );
    } else {
      return (
        <div className='assetImageWrapper' style={!isModal ? { cursor: 'default', filter: 'unset' } : {}}>
          {assetPageCount > 1 && isModal ? (
            <div className="assetImageWithNavigation">
              <img
                onError={handlePageImageError}
                src={`/rest/mp/v1.0/previews/large/asset/${assetId}/version/${assetVersion}/watermark/false/page/${currentPage}`}
                alt={`Page ${currentPage}`}
              />
              <div className="assetImagePages">
                <button className="prev" onClick={() => handlePageChange(currentPage - 1)}>
                  <BsChevronLeft />
                </button>
                <span className="pagingStatus">
                  <span className="currentPage">{currentPage}</span> of {assetPageCount}
                </span>
                <button className="next" onClick={() => handlePageChange(currentPage + 1)}>
                  <BsChevronRight />
                </button>
              </div>
            </div>
          ) : (
            <img
              onError={handleImageError}
              className="assetImage"
              src={`/rest/mp/v1.0/previews/large/asset/${assetId}/version/${assetVersion}`}
              alt="Preview"              
            />
          )}
        </div>
      );
    } 
  };

  return <div className='assetPreview'>{renderContent()}</div>;
};

export default AssetPreview;

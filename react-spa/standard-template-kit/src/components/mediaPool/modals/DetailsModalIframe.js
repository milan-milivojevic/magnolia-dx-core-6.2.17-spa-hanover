import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';


const DetailsModal = ( props ) => {

  const {
    assetId,
    assetVersion,
    assetPageCount,
    assetResourceType,
    vdb,
    title,
    description,
    lastUpdatedTime,
    uploadDate,
    owner,
    fileFormat,
    fileSize,
    keywords,
    download_version,
    language,
    selectedOption,
    fields,
    isOpen, 
    onClose
     } = props;

  const iframeRef = useRef(null);

  console.log("Details Modal")

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Details Modal"
      className="detailsReactModal"
    > 
      <div className='detailsModalWrapper iframe'>
        <div class="closeButtonWrapper">
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>
        </div>
        <div className='detailsModal w2p'>          
          <iframe className="detailsIframe"
                  ref={iframeRef}
                  title={"Asset Details"}
                  src={'/web/mp/asset-details?assetId=' + assetId + '&skipHeader=true'}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default DetailsModal
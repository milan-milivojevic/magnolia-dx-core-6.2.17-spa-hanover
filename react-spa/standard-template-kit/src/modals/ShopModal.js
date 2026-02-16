import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const ShopModal = ({href, isOpen, closeModal}) => {

  const [loading, setLoading] = useState(true);
  
  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Shop Modal"
      className="detailsReactModal"
    > 
      <div className='detailsModalWrapper iframe'>
        <div className="closeButtonWrapper">
          <button className="closeButton" onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </div>
        <div className='detailsModal w2p' style={{ position: 'relative' }}>
          {loading && (
            <div className="loadingSpinner">
              <div className="loader"></div>
            </div>      
          )}
          <iframe 
            className="detailsIframe"
            title={"Shop"}
            src={href}
            onLoad={handleIframeLoad}
            style={{ display: loading ? 'none' : 'block', width: '100%', height: '100%' }}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default ShopModal
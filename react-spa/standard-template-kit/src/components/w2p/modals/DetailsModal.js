import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const DetailsModal = ({ templateId, isOpen, onClose }) => {

  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;

      const styleElement = iframeDocument.createElement('style');

      const cssStyles = `
        div#popupHeader {
          display: none;
        }
        
        div#popupFooter {
          display: none;
        }
      `;

      styleElement.innerHTML = cssStyles;

      iframeDocument.head.appendChild(styleElement);
    }
  };

  console.log("Details Modal")

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Details Modal"
      className="detailsReactModal w2p"
    > 
      <div className='detailsModalWrapper w2p'>
        <div class="closeButtonWrapper w2p">
          <h1 className='titleId'>Details (Template ID: <span>{templateId}</span>)</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='detailsModal w2p'>          
          <iframe className="detailsIframe"
                  ref={iframeRef}
                  title={"Template Details"}
                  src={'/ViewAdvertTemplateDetails.do?action=view&selectedAdvertTemplateId=' + templateId + '&skin=magnolia'}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default DetailsModal

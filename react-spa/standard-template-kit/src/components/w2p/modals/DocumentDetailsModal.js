import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const DocumentDetailsModal = ({ documentId, isOpen, onClose }) => {

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

        a#buttonUse {
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
          <h1 className='titleId'>Document Details</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='detailsModal w2p'>          
          <iframe className="detailsIframe"
                  ref={iframeRef}
                  title={"Document Details"}
                  src={'/ViewAdvertInstanceDetails.do?advertInstanceId=' + documentId + '&hideCopyInstanceButton=true'}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default DocumentDetailsModal

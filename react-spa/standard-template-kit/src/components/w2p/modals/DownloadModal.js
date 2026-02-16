import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const DownloadModal = ({ documentId, isOpen, onClose }) => {

  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;

      const styleElement = iframeDocument.createElement('style');

      const cssStyles = `
        #popupHeader,
        #popupFooter {
          display: none;
        }        
        #popupContent {
          position: relative;
          top: unset;
          bottom: unset;
          overflow-y: scroll;
          height: 100%;
        }
        #popupWorkAreaWider {
          padding-left: 20px;
          padding-bottom: 20px;
        }
        #sendAsMailButton {
          display: none !important;
        }    
        .mainActionButtons {
          position: absolute;
          top: 0;
        }
      `;

      styleElement.innerHTML = cssStyles;

      iframeDocument.head.appendChild(styleElement);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Download Modal"
      className="createReactModal"
    > 
      <div className='detailsModalWrapper w2p'>
        <div class="closeButtonWrapper w2p">
          <h1 className='titleId'>Download Document</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='createModal downloadModal w2p'>          
          <iframe className="createTemplateIframe"
                  ref={iframeRef}
                  title={"Download Document"}
                  src={'/btb/InitAdvertInstancePreview.do?advertInstanceId=' + documentId}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default DownloadModal

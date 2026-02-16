import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';


const DownloadModal = ({ documentId, isOpen, onClose }) => {

  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      // Access the iframe's document
      const iframeDocument = iframeRef.current.contentDocument;

      // Create a new style element
      const styleElement = iframeDocument.createElement('style');

      // Define your CSS styles here
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

      // Set the style element's content to your CSS styles
      styleElement.innerHTML = cssStyles;

      // Append the style element to the iframe's document head
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
                  // src={'/DownloadDocument.do?action=view&advertInstanceId=' + documentId}
                  src={'/btb/InitAdvertInstancePreview.do?advertInstanceId=' + documentId}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default DownloadModal
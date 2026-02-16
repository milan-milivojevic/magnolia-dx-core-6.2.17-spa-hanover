import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const EmailModal = ({ documentId, isOpen, onClose }) => {
  
  console.log("Create Modal")

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
        #downloadButton {
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
      contentLabel="Email Modal"
      className="createReactModal"
    > 
      <div className='detailsModalWrapper w2p'>
        <div class="closeButtonWrapper w2p">
          <h1 className='titleId'>Send by E-Mail</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='createModal emailModal w2p'>          
          <iframe className="createTemplateIframe"
                  ref={iframeRef}
                  title={"Send Document via Email"}
                  // src={'/DownloadDocumentByMail.do?action=view&openerID=common&advertInstanceId=' + documentId}
                  src={'/btb/InitAdvertInstancePreview.do?advertInstanceId=' + documentId}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default EmailModal